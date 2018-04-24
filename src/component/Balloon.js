import animate;
import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;

var spriteUrl = "resources/images/img_balloon0002.png";
var sprite = new Image({url: spriteUrl});

exports = Class(View, function (supr) {

	this.init = function (opts) {
		supr(this, 'init', [opts]);
		this.alive = true;
		this.activeGame = true;
		this.activeInput = false;
		this.build();

	};

	this.build = function () {
		var width = sprite.getWidth();
		var height = sprite.getHeight();
		var rocket = new ui.ImageView({
			superview: this,
			image: sprite,
			x: -width / 2,
			y: -height / 2,
			url: spriteUrl,
			width: width,
			height: height,
			anchorX: width / 2,
			/*ANCHOR NOT WORKING*/
			anchorY: height / 2
		});
	};
});