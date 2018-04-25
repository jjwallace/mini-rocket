import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import ui.SpriteView as SpriteView;

var launchTower;

exports = Class(View, function (supr) {
	this.init = function (opts) {
		
		supr(this, 'init', [opts]);
		this.alive = true;
		this.activeGame = true;
		this.activeInput = false;
		this.build();
	};

	this.build = function () {
		
		var spriteUrl = "resources/images/img_cloud1.png";
		var sprite = new Image({url: spriteUrl});
		var width = sprite.getWidth();
		var height = sprite.getHeight();
		
		new ImageView({
			superview: this,
			image: sprite,
			x: -114,
			y: -52,
			url: spriteUrl,
			width: width,
			height: height
		});
	};
});
