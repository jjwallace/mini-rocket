



exports.moveShipX = function(app, rocketLocationX) {
	//Launch Calcs 
	if(app.climbSpeed < app.climbSpeedMax){app.climbSpeed += app.climbAcc};
	if(app.turnSpeedMax < app.turnSpeed){app.turnSpeed -= 0.5};
	//Launch Object Movement
	var movement = ((rocketLocationX - app.rocketX) / app.turnSpeed);
	return movement;
};

exports.moveShipR = function(app, rocketLocationX) {
	
	//Launch Calcs 
	if(app.climbSpeed < app.climbSpeedMax){app.climbSpeed += app.climbAcc};
	if(app.turnSpeedMax < app.turnSpeed){app.turnSpeed -= 0.5};
	//Launch Object Movement
	var movement = ((rocketLocationX - app.rocketX) / app.turnSpeed);
	return -(movement / 10);
};

//exports.moveShipLegacy = function(scope) {
//	//Launch Calcs 
//	if(climbSpeed < climbSpeedMax){climbSpeed += climbAcc};
//	if(turnSpeedMax < turnSpeed){turnSpeed -= 0.5};
//	//Launch Object Movement
//	var movement = ((rocket.style.x - rocketX) / turnSpeed);
//	rocket.style.x -= movement;
//	rocket.style.r = -(movement / 10);
//};