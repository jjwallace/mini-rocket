import animate;
import ui.View as View;
import ui.ImageView;
import ui.resource.Image as Image;

var spriteUrl = "resources/images/img_rocket_med.png";
var sprite = new Image({url: spriteUrl});

var width = sprite.getWidth();
var height = sprite.getHeight();

exports = Class(View, function (supr) {

	this.init = function (opts) {
		supr(this, 'init', [opts]);
		this.alive = true;
		this.activeGame = true;
		this.activeInput = false;
		this.anchorX = 50;
		this.anchorY = 50;
		console.log(width, height);
		this.build();
		console.log("BUILD: ", spriteUrl);
	};

	this.build = function () {
		var rocket = new ui.ImageView({
			superview: this,
			image: sprite,
			anchorX: 50,
			anchorY: 50,
			x: -width / 2,
			y: -height / 2,
			url: spriteUrl,
			width: width,
			height: height			
		});
	};
});