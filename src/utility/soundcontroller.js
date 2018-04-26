import AudioManager;

exports.sound = null;

/* Initialize the audio files if they haven't been already.
 */
exports.getSound = function () {
  if (!exports.sound) {
    exports.sound = new AudioManager({
      path: 'resources/sounds',
      files: {
        loopy: {
          path: 'music',
          volume: 0.5,
          background: true,
          loop: true
        },
		launchmusic: {
          path: 'music',
          volume: 0.5,
          background: true,
          loop: true
        },
		explode: {
          path: 'effect',
        },
        whack: {
          path: 'effect',
          background: false
        },
		launch: {
          path: 'effect',
          background: false
        }
      }
    });
  }
  return exports.sound;
};
