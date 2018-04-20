//sdk imports
import device;
import ui.StackView as StackView;
//user imports
import src.TitleScreen as TitleScreen;
import src.GameScreen as GameScreen;
import src.soundcontroller as soundcontroller;

//Calculate stackview dimensions
const constGameWidth = 320;
const deviceScale = device.width / 320;
const constGameHeight= 480;

exports = Class(GC.Application, function () {

  this.initUI = function () {
    var titlescreen = new TitleScreen();
    var gamescreen = new GameScreen();
    
    this.view.style.backgroundColor = '#6FC6FF';
    
    var sound = soundcontroller.getSound();

    //Initialize root view on Canvas
    var rootView = new StackView({
      superview: this,
      x: 0,
      y: 0,
      width: 320,
      height: 480,
      clip: true,
      scale: device.width / 320
    });

    rootView.push(titlescreen);
    
    //Game States
    titlescreen.on('titlescreen:start', function () {
      sound.play('levelmusic');
      rootView.push(gamescreen);
      gamescreen.emit('app:start');
    });

    gamescreen.on('gamescreen:end', function () {
      sound.stop('levelmusic');
      rootView.pop();
    });
  };

  this.launchUI = function () {};
});
