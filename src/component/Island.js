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
		var spriteUrl = "resources/images/img_island.png"; 
		var sprite = new Image({url: spriteUrl});
		var width = sprite.getWidth();
		var height = sprite.getHeight();
		new ImageView({
			superview: this,
			image: sprite,
			x: -width / 2,
			y: 0,
			url: spriteUrl,
			width: width,
			height: height
		});
		
		var spriteUrl = "resources/images/img_palm_tree.png";
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
		
		var spriteUrl = "resources/images/launchpad/launchpad-launch-001.png";
		var sprite = new Image({url: spriteUrl});
		var width = sprite.getWidth();
		var height = sprite.getHeight();
		launchPad = new SpriteView({
			superview: this,
			x: -width / 2,
			y: -94, /* anchor doesnt work */
			url: "resources/images/launchpad/launchpad",
			width: width,
			height: height,
			defaultAnimation: "stop"
		});
		launchPad.startAnimation("none");
		
		var spriteUrl = "resources/images/launchtower/launchtower-launch-001.png";
		var sprite = new Image({url: spriteUrl});
		var width = sprite.getWidth();
		var height = sprite.getHeight();
		
		launchTower = new SpriteView({
			superview: this,
			image: sprite,
			x: 10,
			y: -67,
			url: "resources/images/launchtower/launchtower",
			width: width,
			height: height,
			defaultAnimation: "stop"
		});
		launchTower.startAnimation("launch");
		
		var spriteUrl = "resources/images/windturbine/wind-spin-001.png";
		var sprite = new Image({url: spriteUrl});
		var width = sprite.getWidth();
		var height = sprite.getHeight();
		
		turbine = new SpriteView({
			superview: this,
			image: sprite,
			x: 45,
			y: -105,
			url: "resources/images/windturbine/wind",
			width: width,
			height: height,
			defaultAnimation: "spin"
		});
		turbine.startAnimation("spin");
	};
	
	this.animate = function () {
		//launchTower.startAnimation("launch");
		launchPad.startAnimation("launch");
		console.log("Tower Launch!");
	}
});
