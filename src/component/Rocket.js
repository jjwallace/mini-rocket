import animate;
import ui.View as View;
import ui.resource.Image as Image;
import ui.SpriteView as SpriteView;

var spriteUrl = "resources/images/rocket/rocket-stop-001.png";
var sprite = new Image({url: spriteUrl});

var width = sprite.getWidth();
var height = sprite.getHeight();

var rocket;

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
		rocket = new SpriteView({
			superview: this,
			anchorX: 50,
			anchorY: 50,
			x: -(width / 2),
			y: -(height / 2)+7,
			url: "resources/images/rocket/rocket",
			width: width,
			height: height,
			defaultAnimation: "stop",
			animation: "go"
		});
		rocket.startAnimation("stop");
	};
	
	this.animate = function(){
		rocket.startAnimation("go");
		rocket.defaultAnimation = "go";
	}
});
		