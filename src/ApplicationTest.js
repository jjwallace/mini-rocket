
import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.ViewPool as ViewPool;

exports = Class(GC.Application, function() {

	var IMG_WIDTH = 30;
	var IMG_HEIGHT = 30;

	this.initUI = function() {

		this.backgroundView = new View({
			superview: this.view,
			x: 0,
			y: 0,
			width: this.view.style.width,
			height: this.view.style.height,
			backgroundColor: "rgb(20, 20, 40)"
		});

		this.backgroundView.tick = bind(this, function(dt) {

			if (Math.random() < 0.05) {

				var image = Math.random() < 0.5 ? "resources/images/img_balloon0003.png" : "resources/images/img_balloon0002.png";

				var view = this.imageViewPool.obtainView();
				view.updateOpts({
					superview: this.backgroundView,
					x: Math.random() * (this.view.style.width - IMG_WIDTH),
					y: -IMG_HEIGHT,
					width: IMG_WIDTH,
					height: IMG_HEIGHT,
					visible: true
				});

				view.setImage(image);

				animate(view)
					.now({ y: this.view.style.height }, 1500, animate.easeIn)

					.then(bind(this, function() {
						this.imageViewPool.releaseView(view);
					}));
			}
		});

		this.imageViewPool = new ViewPool({
			ctor: ImageView,
			initCount: 20,
			initOpts: {
				superview: this.backgroundView,
				width: IMG_WIDTH,
				height: IMG_HEIGHT,
				image: "resources/images/img_balloon0003.png"
			}
		});
	};

	this.launchUI = function () {};
});