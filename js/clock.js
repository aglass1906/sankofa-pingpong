// Clock
//
"use strict";

class  Clock{
  constructor(clock_html_id, offset, label) {
    console.log("Hello from Clock");

    offset = offset || 0;
    label = label || "UTC";

    var d = new Date();
    this.offset = (offset + d.getTimezoneOffset()) * 60 * 1000;

    this.clock_html_id = clock_html_id;
    this.label = label;

    var that = this;
    setInterval(function() {
      that.updateClock();},1000);
    this.updateClock();

  }
  updateClock() {

    var date = new Date();
        date = new Date(this.offset + date.getTime());


    var msg = this.formatDigits(date.getHours())
    + ":" + this.formatDigits(date.getMinutes())
    + ":" + this.formatDigits(date.getSeconds())
    + " " + this.label;

    var clock = document.getElementById(this.clock_html_id);
    clock.innerHTML = msg;

  }
  formatDigits(val) {
    if(val<10) val = "0" + val;
    return val;
  }

}
