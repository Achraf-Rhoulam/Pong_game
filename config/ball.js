var pCfg = require('./playerConfig.js');
var canvasCfg = require('./canvasConfig.js');

ball = {
	//X and Y position
	xPos: 400,
	yPos: 400,
	//X and Y speed
	xSpeed: 10,
	ySpeed: 7,
	//Ball radius
	radius: 10,
	//Current combo count
	combo: 0,
	//Speed increment for each combo unit
	comboBonus: 1,
	//Ball color
	color: "black",
	//Move the ball in the direction its speed dictates
	move: function() {
		ball.xPos += ball.xSpeed;
		ball.yPos += ball.ySpeed;
	},
	//Checks for collisions
	checkHit: function(players) {
		//Wall collision
		if(ball.xPos > canvasCfg.width-ball.radius || ball.xPos < 0+ball.radius) ball.xSpeed *= -1;
		if(ball.yPos > canvasCfg.height-ball.radius || ball.yPos < 0+ball.radius) ball.ySpeed *= -1;
		//Player Collision
		for(var i in players) {
			//Calculates the distance between the current player and the ball
			let p = players[i];
			let dx = p.xPos - ball.xPos;
			let dy = p.yPos - ball.yPos;
			let dist = Math.sqrt((dx * dx) + (dy * dy));
			//If said distance is less than the sum of their radiuses, collision is detected
			if(dist < pCfg.radius + ball.radius) {
				//Increments the combo count
				if(ball.combo < 20) {
					ball.combo++;
					//Increments ball speed based on combo count
					ball.xSpeed += (ball.xSpeed > 0) ? ball.comboBonus:-ball.comboBonus;
					ball.ySpeed += (ball.ySpeed > 0) ? ball.comboBonus:-ball.comboBonus;;
				}
				//Calculates the angle between the ball and the current player
				var angle = Math.atan2(dy,dx)*180/Math.PI;
				//Applies changes in the ball speed based on this angle
				if(angle <= 0 && angle >= -90) {
					//1 quad x negative and y positive
					ball.xSpeed *= (ball.xSpeed > 0)? -1:1;
					ball.ySpeed *= (ball.ySpeed > 0)? 1:-1;
				} else if(angle < -90 && angle >= -180) {
					//2 quad both positive
					ball.xSpeed *= (ball.xSpeed > 0)? 1:-1;
					ball.ySpeed *= (ball.ySpeed > 0)? 1:-1;
				} else if(angle > 0 && angle <= 90) {
					//4 quad both negative
					ball.xSpeed *= (ball.xSpeed > 0)? -1:1;
					ball.ySpeed *= (ball.ySpeed > 0)? -1:1;
				} else if(angle > 90 && angle <= 180) {
					//3 quad y negative and x positive
					ball.xSpeed *= (ball.xSpeed > 0)? 1:-1;
					ball.ySpeed *= (ball.ySpeed > 0)? -1:1;
				}
			}
		}
	},
	//Checks if the ball is scoring
	checkScore: function() {
		if(ball.xPos + ball.radius >= canvasCfg.width) 
			return "left";
		else if(ball.xPos - ball.radius <= 0)
			return "right";
		return "";
	},
	//Resets the ball in teh center of the canvas and its speed to 2 (both x and y)
	resetBall: function() {
		ball.xPos = canvasCfg.width/2;
		ball.yPos = canvasCfg.height/2;
		ball.xSpeed = 2
		ball.ySpeed = 2
		ball.xSpeed *= (Math.random() >= 0.5) ? -1:1;
		ball.ySpeed *= (Math.random() >= 0.5) ? -1:1;
		ball.combo = 0;
	},
	//Same from above but this one is for when a "goal" happened, in this case the ball goes to the side that scored
	resetBallScore(side) {
		ball.xPos = canvasCfg.width/2;
		ball.yPos = canvasCfg.height/2;
		ball.ySpeed = 0;
		ball.xSpeed = (side == "left") ? -2 : 2;
		ball.combo = 0;
	},
	//In case ball leaves the canvas, reset it to the center (just to make sure)
	strandedBall: function() {
		if(ball.yPos+ball.radius < 0 || ball.yPos-ball.radius > canvasCfg.height) {
			ball.resetBall();
		}
	}
}

module.exports = ball;