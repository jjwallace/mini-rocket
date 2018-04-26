import animate;
import ui.View as View
import ui.ImageView;
import ui.TextView;

//Config
import src.config as config;

//Modules
import modules.entities.Entity as Entity;
import modules.entities.EntityPool as EntityPool;

//Components
import src.component.Rocket as Rocket;
import src.component.Island as Island;
import src.component.SkyBackground as SkyBackground;
import src.component.CloudPatch as CloudPatch;
import src.component.Meteor as Meteor;
import src.utilities.soundcontroller as soundcontroller;

//Component Utilities
import src.component.Player.PlayerUtilities as PlayerUtilities;

//Main Variables
var score = 0;
var highScore = 19;
var lang = 'en';
var gameActive = false;
var gamePaused = false;
var playerAlive = true;
var SHOW_HIT_BOUNDS = false;

//Varibles import
import src.config as config;

//Game Vars
var rocketX = config.player.rocketX;
var turnSpeed = config.player.turnSpeed;
const turnSpeedMax = config.player.turnSpeedMax;
var climbAcc = config.player.climbAcc;
var climbSpeed = config.player.climbSpeed;
const climbSpeedMax = config.player.climbSpeedMax;
var altitude = config.player.altitude;
var meteorCount = 6;
var meteorSpeed = 2;

//Game Objects
var app;
var rocket;
var island;
var skyBackground;
var cloudPatch;
var meteors = [];
var cloudPatchLocation = 2000;

var music = soundcontroller.getSound();
			
exports = Class(View, function (supr) {
	this.init = function (opts) {
		app = this;
		opts = merge(opts, {
			x: 0,
			y: 0,
			width: 320,
			height: 480,
		});
		app = this;
		this.model = {
			score: 0,
			timeMult: 1,
			gameOver: false
		};

		supr(this, 'init', [opts]);
		this.buildGame();
	};

	this.buildGame = function () {
		this.style.width = 60;
        this.style.height = 60;

		this.elementLayer = new View({
			parent: this.bgLayer,
			zIndex: 10
		});

//		cloudPatch = new CloudPatch();
//		cloudPatch.style.x = config.gameWidth / 2;
//		cloudPatch.style.y = altitude - 2000;
//		this.addSubview(cloudPatch);
		
		this.bgLayer = new View({
			parent: this.view,
			y: 0,
			width: config.gameWidth,
			height: config.gameHeight,
			blockEvents: true
		});
		
		skyBackground = new SkyBackground({ parent: this.bgLayer });
		skyBackground.style.x = 0; skyBackground.style.y = 0;
		skyBackground.style.width = config.gameWidth;
		skyBackground.style.height = config.gameHeight;
		this.addSubview(skyBackground);
			
		rocket = new Rocket();
		rocket.style.x = config.gameWidth / 2;
		rocket.style.y = config.gameHeight - 95;
		this.addSubview(rocket);
		
		this.elementLayer = new View({
			parent: this.bgLayer
		});
			
		for (var i = 0; i < meteorCount; i++) {
			var meteor = new Meteor();
			meteor.style.x = 40 + i * 40;
			meteor.style.y = 80 * i;
			this.addSubview(meteor);
			meteors.push(meteor)
		}
		
		island = new Island({ parent: this.bgLayer });
		island.style.x = config.gameWidth / 2;
		island.style.y = config.island.yStart;
		this.addSubview(island);
		
		this.player = new Player({ parent: this.elementLayer});

		music.play('loopy');
	};

	this.tick = function (dt) {
		this.player.update(dt);
		
		dt = Math.min(this.model.timeMult * dt, config.maxTick);
		if (gameActive == true && playerAlive == true) {
			altitude += climbSpeed;
			//cloudPatch.style.y = -cloudPatchLocation + altitude
			island.style.y += climbSpeed;
			skyBackground.move(climbSpeed);
			
			//Meteor Storm Calculations
			for (var i = 0; i < meteorCount; i++) {
				meteors[i].style.y += climbSpeed + meteorSpeed;
				if(altitude > 500){
					meteors[i].style.visible = true;
				}
				if(meteors[i].style.y > config.gameHeight){
					meteors[i].style.y = -100;
					meteors[i].style.x = Math.floor(Math.random() * config.gameWidth); 
				}
				if(meteors[i].checkCollision( rocket.style.x, rocket.style.y) == true){
					this.gameOver();
				}
			}
		}
	};

	this.gameOver = function (i){
		if(playerAlive == true){
			playerAlive = false;
		}
	};
	
	var Player = Class(Entity, function () {
		var sup = Entity.prototype;

		this.init = function (opts) {
			sup.init.call(this, opts);
			this.inputStartX = 0;
			this.animating = false;
			console.log('Player Created');
		};

		this.reset = function () {
			rocket.style.x = config.gameWidth/2;
		};

		this.startInput = function (){
			console.log("START GAME", gameActive);
			island.animate();
			rocket.animate();
			rocket.animating = true;
			gameActive = true;
			var sound = soundcontroller.getSound();
			
			music.play('launchmusic');
			sound.play('launch');
		};

		this.updateInput = function (dx, dy) {
			rocketX = dx;
			
		};

		this.update = function (dt) {
			if (gameActive == true && playerAlive == true) {
				//Launch Calcs 
				if(climbSpeed < climbSpeedMax){
					climbSpeed += climbAcc
				};
				if(turnSpeedMax < turnSpeed){turnSpeed -= 0.5};

				//Launch Object Movement
				var movement = ((rocket.style.x - rocketX) / turnSpeed);
				rocket.style.x -= movement;
				rocket.style.r = -(movement / 10);
			}
		};

		this.onDeath = function () {
			this.view.style.visible = false;
		};
	});
	
	this.reset = function () {
		console.log('RESET');
		
		//reset Game Vars
		gameActive = false;
		playerAlive = true;
		this.player.reset();
		island.style.y = config.island.yStart;
		skyBackground.reset();
		music.play('loopy');
		
		//Reset Player Vars
		rocketX = config.player.rocketX;
		turnSpeed = config.player.turnSpeed;
		climbSpeed = config.player.climbSpeed;
		altitude = 0;
	};
	
	var InputView = Class(View, function () {
		var sup = View.prototype;

		this.init = function (opts) {
			opts.infinite = true;
			sup.init.call(this, opts);
			console.log("Init Input");
		};

		sup.onInputStart = function (event, cartesian) {
			if(gameActive == false){
				app.player.startInput();
			}else if(altitude > 1000){
				app.reset();
			}
		};

		sup.onInputMove = function (event, cartesian) {
			var dx = cartesian.x;
			var dy = cartesian.y;
			app.player.updateInput(dx, dy);
		};
	});
});