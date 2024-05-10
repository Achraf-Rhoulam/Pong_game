var canvasCfg = require('./canvasConfig.js');
var ball = require('./ball.js');
var plCfg = require('./playerConfig.js');

var gameConfig = {
	//Left and right player count
	leftQnt: 0,
	rightQnt: 0,
	//Left and right score count
	leftScore: 0,
	rightScore: 0,
	//Each side's colors
	leftColor: "#01bcd1",
	rightColor: "#08d102",
	//Resets both sides' scores
	resetScore: function() {
		gameConfig.leftScore = 0;
		gameConfig.rightScore = 0;
	},
	//Checks if the match is over
	checkEndMatch: function() {
		return (gameConfig.leftScore >= 30 || gameConfig.rightScore >= 30);
	},
	//If the player input in within the canvas limits, make the changes in position
	moveInbound: function(data, players, player) {
		for(var i = 0; i < players.length; i++) {
			if(players[i].id == player.id) {
				let halfCanvas = canvasCfg.width/2;
				if(players[i].team == "left") {
					players[i].xPos = (data.xPos > halfCanvas-15)?halfCanvas-15:data.xPos;
					players[i].yPos = data.yPos;
				} else {
					players[i].xPos = (data.xPos < halfCanvas+15)?halfCanvas+15:data.xPos;
					players[i].yPos = data.yPos;
				}
			}
		}
	},
	//Used in the server interval
	gameLogicUpdate: function(players) {
		//Checks if the ball is, for some reason, out of the canvas (just to make sure, this shouldn't happen)
		ball.strandedBall();
		//Applies logic based on the score (if any side actually scored)
		switch(ball.checkScore()) {
			case "left": 
				gameConfig.leftScore++; 
				ball.resetBallScore("left");
				break;
			case "right": 
				gameConfig.rightScore++; 
				ball.resetBallScore("right");
				break;
			default: break;
		}
		//Checks if the game is over
		if(gameConfig.checkEndMatch()) {
			//Reset ball
			ball.resetBall();
			//Reset score
			gameConfig.resetScore();
		}
		//Move the ball
		ball.move();
		//Check collisions
		ball.checkHit(players);
	}
};

module.exports = gameConfig;