import animate;
import ui.View as View
import ui.ImageView;
import ui.TextView;

//Config
import src.config as config;

//Modules
import modules.entities.Entity as Entity;
//import modules.entities.EntityPool as EntityPool;
//import modules.Parallax as Parallax;

//Components
//import src.component.InputView as InputView;
//import src.component.Balloon as Balloon;
import src.component.Rocket as Rocket;
import src.component.LaunchPad as LaunchPad;
import src.component.Island as Island;
import src.component.SkyBackground as SkyBackground;
import src.component.CloudPatch as CloudPatch;

//Component Utilities
import src.component.Player.PlayerUtilities as PlayerUtilities;


//Main Variables
var score = 0;
var highScore = 19;
var lang = 'en';
var gameActive = false;
var gamePaused = false;
var playerAlive = true;

//Varibles import
import src.config as config;

//Game Vars
var rocketX = 0;
var turnSpeed = 100;
const turnSpeedMax = 30;
var climbAcc = 0.1;
var climbSpeed = 0;
const climbSpeedMax = 10;
var altitude = 0;

//Game Objects
var app;
var rocket;
var launchPad;
var island;
var skyBackground;
var cloudPatch;
var cloudPatchLocation = 2000;

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

		//var balloon = new Balloon(10,10);

		this.elementLayer = new View({
			parent: this.bgLayer,
			zIndex: 10
		});

//		cloudPatch = new CloudPatch();
//		cloudPatch.style.x = config.gameWidth / 2;
//		cloudPatch.style.y = altitude - 2000;
//		this.addSubview(cloudPatch);
			
		rocket = new Rocket();
		rocket.style.x = config.gameWidth / 2;
		rocket.style.y = config.gameHeight - 95;
		this.addSubview(rocket);
		
		island = new Island();
		island.style.x = config.gameWidth / 2;
		island.style.y = config.gameHeight - 60;
		this.addSubview(island);
		
//		skyBackground = new SkyBackground();
//		skyBackground.style.x = 0; SkyBackground.style.y = 0;
//		skyBackground.style.width = config.gameWidth;
//		skyBackground.style.height = config.gameHeight;
//		this.addSubview(skyBackground);
		
		//this.parallax = new Parallax({ parent: this.bgLayer });

		this.player = new Player({
			parent: this.elementLayer
		});

		//Game Play Controls
		this.inputLayer = new InputView({
			parent: this
		});

	};

	this.tick = function (dt) {
		dt = Math.min(this.model.timeMult * dt, config.maxTick);
		if (gameActive == true && playerAlive == true) {
			this.player.update(dt);
			altitude += climbSpeed;
			//cloudPatch.style.y = -cloudPatchLocation + altitude
			island.style.y += climbSpeed;
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

		};

		this.startInput = function (){
			console.log("START GAME", gameActive);
			island.animate();
			gameActive = true;
		};

		this.updateInput = function (dx, dy) {
			rocketX = dx;
			
		};

		this.update = function (dt) {
				//Launch Calcs 
				if(climbSpeed < climbSpeedMax){climbSpeed += climbAcc};
				if(turnSpeedMax < turnSpeed){turnSpeed -= 0.5};
				//Launch Object Movement
				var movement = ((rocket.style.x - rocketX) / turnSpeed);
				rocket.style.x -= movement;
				rocket.style.r = -(movement / 10);
		};

		this.onDeath = function () {
			this.view.style.visible = false;
		};
	});

	this.reset = function (data) {
		//		this.player.reset();
	};
	
	var InputView = Class(View, function () {
		var sup = View.prototype;

		this.init = function (opts) {
			opts.infinite = true;
			sup.init.call(this, opts);
			console.log("Init Input");
			//launchPad.sprite.startAnimation("walk");
		};

		sup.onInputStart = function (event, cartesian) {
			app.player.startInput();
		};

		sup.onInputMove = function (event, cartesian) {
//			if (gameActive === false || playerAlive === false) {
//				return;
//			}
			var dx = cartesian.x;
			var dy = cartesian.y;
			app.player.updateInput(dx, dy);
		};
	});
});