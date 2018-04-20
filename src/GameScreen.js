import animate;
import ui.View as View
import ui.ImageView;
import ui.TextView;

//Modules
import modules.entities.Entity as Entity;
//import modules.entities.EntityPool as EntityPool;
//import modules.Parallax as Parallax;

//Components
import src.component.Rocket as Rocket;
//import src.component.InputView as InputView;
//import src.component.Balloon as Balloon;

//Main Variables
var score       = 0; 
var highScore   = 19; 
var lang        = 'en';
var gameActive  = false;
var gamePaused  = false;
var playerAlive = true;

//Varibles import
import src.config as config;

//Game Constants
var MAX_TICK        = config.maxTick;
var BG_WIDTH        = config.bgWidth;
var BG_HEIGHT       = config.bgHeight;
var GAME_OVER_DELAY = config.gameOverDelay;
var SHOW_HIT_BOUNDS = false;

//Game Vars
var rocketX = 0;

//Game Objects
var app;
var rocket;

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
        
        rocket = new Rocket();
        rocket.style.x = 60;
        rocket.style.y = 60;
        this.addSubview(rocket);
        
        //this.parallax = new Parallax({ parent: this.bgLayer });
        
        this.player = new Player({ parent: this.elementLayer });
        
        //Game Play Controls
        this.inputLayer = new InputView({ parent: this});

	};
    
    this.tick = function(dt) {
		dt = Math.min(this.model.timeMult * dt, MAX_TICK);
		//this.player.update(dt);
	};
    
    var Player = Class(Entity, function() {
        var sup = Entity.prototype;

        this.init = function(opts) {
            sup.init.call(this, opts);
            this.inputStartX = 0;
            this.animating = false;

            console.log('Player Created');
        };

        this.reset = function() {

        };

        this.startInput = function() {

        };

        this.updateInput = function(dx, dy) {
            //console.log("X location", dx);
            rocketX = dx;
        };
      
        this.tick = function(dt) {
          if (this.gameActive == true && this.playerAlive == true) {
            //dt = Math.min(this.model.timeMult * dt, MAX_TICK);
            var movement = ((rocket.style.x - rocketX) / 30);
            rocket.style.x -= movement;
            rocket.style.r = -(movement/10);
          }
        };

        this.onDeath = function() {
            this.view.style.visible = false;
        };
    });

    this.reset = function(data) {
//		this.player.reset();
	};

    var InputView = Class(View, function() {
        var sup = View.prototype;

        this.init = function(opts) {
            opts.infinite = true;
            sup.init.call(this, opts);
            console.log("Init Input");
        };
        
        sup.onInputStart = function(event, cartesian) {
          sup.gameActive = true;
          console.log("START GAME",sup.gameActive);
        };

        sup.onInputMove = function(event, cartesian) {
    		if (this.gameActive === false || this.playerAlive === false) {
    			return;
    		}

            var dx = cartesian.x;
            var dy = cartesian.y;
            app.player.updateInput(dx, dy);
        };
    });
});