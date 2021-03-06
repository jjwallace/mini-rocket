import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import ui.SpriteView as SpriteView;

import src.config as config;

var currentTile = 1;
var countBackground = 0;

var backgroundA;
var backgroundB;

var bgRoot = "resources/images/backgrounds/";
var bg = ["background1.png", 
			"background2.png",
			"background3.png",
			"background4.png",
			"background5.png",
			"background5.png",
			"background6.png",
			"background5.png",
			"background5.png",
			"background5.png",
			"background5.png"];

//Max backgrounds, repeats after this point.
var bgMax = ( 10 ) - 1;

exports = Class(View, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', [opts]);
		this.build();
	};

	this.build = function () {
		
		var spriteUrl = bgRoot + bg[0];
		var sprite = new Image({url: spriteUrl});
		var width = sprite.getWidth();
		var height = sprite.getHeight();
		
		backgroundA = new ImageView({
			superview: this,
			image: sprite,
			x: 0,
			y: 0,
			url: spriteUrl,
			width: width,
			height: height
		});
		
		var spriteUrl = bgRoot + bg[1];
		var sprite = new Image({url: spriteUrl});
		var width = sprite.getWidth();
		var height = sprite.getHeight();
		
		backgroundB = new ImageView({
			superview: this,
			image: sprite,
			x: 0,
			y: -height,
			url: spriteUrl,
			width: width,
			height: height
		});
	};
	
	this.move = function(moveUnit){	
		if(currentTile == 1){
			backgroundA.style.y += moveUnit;
			backgroundB.style.y = backgroundA.style.y - backgroundA.style.height;
			if(backgroundA.style.y > config.gameHeight + 10){
				
				//Count Background Tiles
				if(bgMax > countBackground){countBackground ++;}
				
				//Swap Background Tile
				currentTile = 2;
				var spriteUrl = bgRoot + bg[countBackground];
				backgroundA.setImage(spriteUrl);
			}
		}else{
			backgroundB.style.y += moveUnit;
			backgroundA.style.y = backgroundB.style.y - backgroundB.style.height;
			if(backgroundB.style.y > config.gameHeight + 10){
				
				//Count Background Tiles
				if(bgMax > countBackground){countBackground ++;}
				
				//Swap Background Tile
				currentTile = 1;
				var spriteUrl = bgRoot + bg[countBackground];
				backgroundB.setImage(spriteUrl);
			}
		}
	}
	
	this.reset = function(){
		backgroundA.style.y = 0;
		backgroundB.style.y = backgroundA.style.y - backgroundA.style.height;
		
		var spriteUrl = bgRoot + bg[0];
		backgroundA.setImage(spriteUrl);
		
		var spriteUrl = bgRoot + bg[1];
		backgroundB.setImage(spriteUrl);
		
		currentTile = 1;
		countBackground = 0;
	}
});
