import animate;
import ui.View as View;
import ui.resource.Image as Image;
import ui.SpriteView as SpriteView;
import modules.entities.Entity as Entity;

var spriteUrl = "resources/images/explosion/explode-boom-001.png";
var sprite = new Image({url: spriteUrl});

var width = sprite.getWidth();
var height = sprite.getHeight();

var meteor;

exports = Class(View, function (supr) {

	this.init = function (opts) {
		supr(this, 'init', [opts]);
		this.alive = true;
		this.anchorX = 50;
		this.anchorY = 50;
		this.build();
	};

	this.build = function () {
		meteor = new SpriteView({
			superview: this,
			anchorX: 50,
			anchorY: 50,
			x: -(width / 2),
			y: -(height / 2)+7,
			url: "resources/images/explosion/explode",
			width: width,
			height: height,
			defaultAnimation: "stop",
		});
	};
	
	this.explode = function(locX, locY){
		this.style.x = locX;
		this.style.y = locY;
		meteor.startAnimation("boom");
	}
});