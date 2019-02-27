"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _hex2dec = require("./hex2dec");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Snowflake = function () {
  function Snowflake(options) {
    (0, _classCallCheck3.default)(this, Snowflake);

    options = options || {};
    this.seq = 0;
    this.mid = (options.mid || 1) % 1023;
    this.offset = options.offset || 0;
    this.lastTime = 0;
  }

  (0, _createClass3.default)(Snowflake, [{
    key: "generate",
    value: function generate() {
      var time = Date.now(),
          bTime = (time - this.offset).toString(2);

      // get the sequence number
      if (this.lastTime == time) {
        this.seq++;

        if (this.seq > 4095) {
          this.seq = 0;

          // make system wait till time is been shifted by one millisecond
          while (Date.now() <= time) {}
        }
      } else {
        this.seq = 0;
      }

      this.lastTime = time;

      var bSeq = this.seq.toString(2),
          bMid = this.mid.toString(2);

      // create sequence binary bit
      while (bSeq.length < 12) {
        bSeq = "0" + bSeq;
      }while (bMid.length < 10) {
        bMid = "0" + bMid;
      }var bid = bTime + bMid + bSeq;
      var id = "";

      for (var i = bid.length; i > 0; i -= 4) {
        id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
      }

      return (0, _hex2dec.hexToDec)(id);
    }
  }]);
  return Snowflake;
}();

exports.default = Snowflake;