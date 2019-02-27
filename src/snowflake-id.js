import {hexToDec} from './hex2dec';

export default class Snowflake {
  constructor(options) {
    options = options || {};
    this.seq = 0;
    this.mid = (options.mid || 1) % 1023;
    this.offset = options.offset || 0;
    this.lastTime = 0;
  }
  
  generate() {
    const time = Date.now(),
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

    let bSeq = this.seq.toString(2),
      bMid = this.mid.toString(2);

    // create sequence binary bit
    while (bSeq.length < 12) bSeq = "0" + bSeq;

    while (bMid.length < 10) bMid = "0" + bMid;

    const bid = bTime + bMid + bSeq;
    let id = "";

    for (let i = bid.length; i > 0; i -= 4) {
      id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
    }

    return hexToDec(id);
  }
}
