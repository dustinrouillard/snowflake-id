# Snowflake ID

A tiny module to generate time based 64-bit unique id, inspired by Twitter id (snowflake).

Snowflake ID takes a 42 bit timestamp, 10 bit machine id (or any random number you provide), 12 bit sequence number.  Since javascript is limited to 53 bit integer precision, Snowflake ID generates id in string format like "285124269753503744", which can be easily type casted into 64 bit bigint in database.

## Installation

```js
npm install snowflake-id
```

## Usage

### initialization

```js
var SnowflakeId = require('snowflake-id');

// Initialize snowflake
var snowflake = new SnowflakeId({
    mid : 42,
    offset : (2019-1970)*31536000*1000
});
```

Create a instance of snowflake as shown above which will be used to generate snowflake ids afterward.

### Snowflake ID generation

```js
var id1 = snowflake.generate(); // returns something along the lines of "285124269753503744"
var id2 = snowflake.generate(); // returns something along the lines of "285124417543999488"
```

## Options

mid : (Default to 1) A machine id or any random number. If you are generating the id in a distributed system, its highly advised to provide a proper mid which is unique to the different machines.

offset : (Defaults to 0) This is a time offset which will be subtracted from current time to get the first 42 bits of the id. This will help in generating smaller ids.

## Method

generate : Method to generate id from Snowflake instance.

------
As javascript has 53bit integer precision, Snowflake ID uses a solution by Dan Vanderkam [danvk.org/hex2dec.html](http://www.danvk.org/hex2dec.html) to convert hex to decimal without loosing precision.
*Source code for converting hex to decimal is taken from [danvk.org/hex2dec.html](http://www.danvk.org/hex2dec.html) which have APACHE LICENCE*