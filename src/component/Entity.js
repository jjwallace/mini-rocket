//This Class is for a basic static world item.

import animate;
import ui.View as View;
import ui.ImageView;
import ui.resource.Image as Image;

exports = Class(View, function (supr) {

	this.init = function (opts, spriteUrl) {
		supr(this, 'init', [opts]);
		this.alive = true;
		this.activeGame = true;
		this.activeInput = false;
		this.anchorX = width / 2;
		this.anchorY = height / 2;
		console.log(width, height);
		this.build(spriteUrl);
		console.log("BUILD: ", spriteUrl);
	};

	this.build = function (spriteUrl) {
		var sprite = new Image({url: spriteUrl});

		var width = sprite.getWidth();
		var height = sprite.getHeight();
		var spriteObeject = new ui.ImageView({
			superview: this,
			image: sprite,
			anchorX: this.width / 2,
			anchorY: this.height / 2,
			x: -width / 2,
			y: -height / 2,
			url: spriteUrl,
			width: width,
			height: height			
		});
	};
});