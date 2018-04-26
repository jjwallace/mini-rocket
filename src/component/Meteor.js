import animate;
import ui.View as View;
import ui.resource.Image as Image;
import ui.SpriteView as SpriteView;
import modules.entities.Entity as Entity;

var spriteUrl = "resources/images/meteor/meteor-fall-001.png";
var sprite = new Image({url: spriteUrl});

var width = sprite.getWidth();
var height = sprite.getHeight();

var meteor;

exports = Class(View, function (supr) {

	this.init = function (opts) {
		supr(this, 'init', [opts]);
		this.alive = true;
		this.activeGame = true;
		this.activeInput = false;
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
			url: "resources/images/meteor/meteor",
			width: width,
			height: height,
			defaultAnimation: "fall",
			visible: false
		});
		meteor.startAnimation("fall");
	};
	
	this.checkCollision = function(playerX, playerY){
		var collisionDistance = 20;
		var meteorX = this.style.x;
		var meteorY = this.style.y;
		var mOffsetX = meteorX + 15;
		var mOffsetY = meteorY + 40;
		
		var a = playerX - mOffsetX;
		var b = playerY - mOffsetY;
		var c = Math.sqrt( a*a + b*b );
		if(c < collisionDistance && this.style.visible == true){
			return true;
		}
		return false;
	}
	
	this.animate = function(){
		//meteor.startAnimation("go");
		//meteor.defaultAnimation = "go";
	}
});
		