/**
 * A function for converting hex <-> dec w/o loss of precision.
 * By Dan Vanderkam http://www.danvk.org/hex2dec.html
 */

// Adds two arrays for the given base (10 or 16), returning the result.
// This turns out to be the only "primitive" operation we need.
function add(x, y, base) {
  var z = [];
  var n = Math.max(x.length, y.length);
  var carry = 0;
  var i = 0;
  while (i < n || carry) {
    var xi = i < x.length ? x[i] : 0;
    var yi = i < y.length ? y[i] : 0;
    var zi = carry + xi + yi;
    z.push(zi % base);
    carry = Math.floor(zi / base);
    i++;
  }
  return z;
}

// Returns a*x, where x is an array of decimal digits and a is an ordinary
// JavaScript number. base is the number base of the array x.
function multiplyByNumber(num, x, base) {
  if (num < 0) return null;
  if (num == 0) return [];

  var result = [];
  var power = x;
  while (true) {
    if (num & 1) {
      result = add(result, power, base);
    }
    num = num >> 1;
    if (num === 0) break;
    power = add(power, power, base);
  }

  return result;
}

function parseToDigitsArray(str, base) {
  var digits = str.split("");
  var ary = [];
  for (var i = digits.length - 1; i >= 0; i--) {
    var n = parseInt(digits[i], base);
    if (isNaN(n)) return null;
    ary.push(n);
  }
  return ary;
}

function convertBase(str, fromBase, toBase) {
  var digits = parseToDigitsArray(str, fromBase);
  if (digits === null) return null;

  var outArray = [];
  var power = [1];
  for (var i = 0; i < digits.length; i++) {
    // invariant: at this point, fromBase^i = power
    if (digits[i]) {
      outArray = add(
        outArray,
        multiplyByNumber(digits[i], power, toBase),
        toBase
      );
    }
    power = multiplyByNumber(fromBase, power, toBase);
  }

  var out = "";
  for (var i = outArray.length - 1; i >= 0; i--) {
    out += outArray[i].toString(toBase);
  }
  return out;
}

export function hexToDec(hexStr) {
  if (hexStr.substring(0, 2) === "0x") hexStr = hexStr.substring(2);
  hexStr = hexStr.toLowerCase();
  return convertBase(hexStr, 16, 10);
}
