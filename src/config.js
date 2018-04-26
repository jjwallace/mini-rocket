import device;

const ds = device.screen;
const meteorH = 50;
const meteorW = 50;

const gameWidth = 320;
const gameHeight = 580

exports = {
	maxTick: 100,
	gameWidth: gameWidth,
	gameHeight: gameHeight,
	screenWidth: ds.width,
	screenHeight: ds.height,
	player: {
		rocketX: 0,
		turnSpeed: 200,
		turnSpeedMax: 30,
		climbAcc: 0.04,
		climbSpeed: 0,
		climbSpeedMax: 6,
		altitude: 0,
	},
	backgrounds: {
		1: "background1.png",
	},
	island: {
		yStart: gameHeight - 60
	},
	enemies: {
		types: [
			{
				id: "enemyDrone",
				zIndex: 41,
				isCircle: true,
				vx: 0,
				vy: 0.4,
				hitBounds: {
					x: 0,
					y: 0,
					r: 0
				},
				viewBounds: {
					x: -meteorH / 2,
					y: -meteorH / 2,
					w: meteorH,
					h: meteorH
				},
				image: "resources/images/meteor/meteor"
			}
		],
		spawnCooldownMin: 50,
		spawnCooldownMax: 500
	}
};