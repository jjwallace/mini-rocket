import ui.View as View;
import ui.ImageView as ImageView;

//Modules
import modules.entities.Entity as Entity;
    
    var Player = exports = Class(Entity, function(supr) {
        var sup = Entity.prototype;

        this.init = function(opts) {
            sup.init.call(this, opts);
            this.inputStartX = 0;
            this.animating = false;
            console.log('Player Created');
        };

        this.reset = function() {
            
        };

        this.startInput = function(isOn) {
            supr.gameActive = isOn;
            console.log("START GAME local",isOn);
            console.log("START GAME global",app.gameActive);
        };

        this.updateInput = function(dx, dy) {
            //console.log("X location", dx);
            supr.rocketX = dx;
        };
      
        this.tick = function(dt) {
          if (supr.gameActive == true && supr.playerAlive == true) {
            //dt = Math.min(this.model.timeMult * dt, MAX_TICK);
            var movement = ((supr.rocket.style.x - supr.rocketX) / 30);
            supr.rocket.style.x -= movement;
            supr.rocket.style.r = -(movement/10);
          }
        };

        this.onDeath = function() {
            this.view.style.visible = false;
        };
    });