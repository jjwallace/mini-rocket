import animate;
import ui.View as View;
import ui.ImageView;
import ui.resource.Image as Image;

var img_rocket = new Image({url:     "resources/images/img_rocket_med.png"});

exports = Class(View, function (supr) {

  this.init = function (opts) {
    supr(this, 'init', [opts]);

    this.alive = true;
    this.activeGame = true;
    this.activeInput = false;
    
    this.anchorX = 90;
    this.anchorY = 90;

    this.build();
    
   
  };

  this.build = function () {
    var width = img_rocket.getWidth();
    var height = img_rocket.getHeight();
    var rocket = new ui.ImageView({
        superview: this,
        image: img_rocket,
        x: 0,
        y: 0,
        url: "resources/images/img_rocket.png",
        width: width,
        height: height,
        anchorX: width / 2,
		anchorY: height / 2
    });
  };

});

