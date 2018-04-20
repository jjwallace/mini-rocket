import ui.View as View;

exports = Class(GC.Application, function () {

  this.initUI = function () {
    this.style.backgroundColor = "#FFFFFF";

    this._trail = [];
    this._index = 0;

    this.view.on("InputMove", function (evt, pt) {
      var opts = {superview: GC.app.view, x: pt.x - 3, y: pt.y - 3};

      if (GC.app._trail.length < 64) {
 
        GC.app._trail.push(new TrailBox(opts));
      } else {
        GC.app._trail[GC.app._index].reset(opts);
      
        GC.app._index = (GC.app._index + 1) & 63;
      }
    });
  };

  this.launchUI = function () {};
});

var TrailBox = Class(View, function (supr) {
  this.init = function (opts) {
    supr(this, "init", [merge(opts, {width: 6, height: 6, backgroundColor: "#008800"})]);
    this._dt = 0;
  };
  

  this.reset = function (opts) {
    this._dt = 0;
    this.updateOpts(opts);
  };
  
  this.tick = function (dt) {
    this._dt += dt;
    if (this._dt > 500) {
      this.removeFromSuperview();
    } else {
      this.updateOpts({opacity: 1 - this._dt / 500});
    }
  };
});