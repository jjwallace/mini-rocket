import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import ui.SpriteView as SpriteView;

var imgLaunchPad = new Image({
	url: "resources/images/launchpad/launchpad-launch-001.png"
});

var sprite;
exports = Class(View, function (supr) {

	this.init = function (opts) {
		supr(this, 'init', [opts]);

		this.alive = true;
		this.activeGame = true;
		this.activeInput = false;

		this.build();
	};

	this.build = function () {
		var width = imgLaunchPad.getWidth();
		var height = imgLaunchPad.getHeight();
		sprite = new SpriteView({
			superview: this,
			x: -width / 2,
			y: -height / 2, /* anchor doesnt work */
			url: "resources/images/launchpad/launchpad",
			width: width,
			height: height,
			defaultAnimation: "stop"
		});
		sprite.startAnimation("none");
		
	};
	this.animate = function () {
		sprite.startAnimation("launch");
		console.log("Launch!");
	}
});
