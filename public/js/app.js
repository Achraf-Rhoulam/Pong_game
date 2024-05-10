//Cette ligne établit une connexion WebSocket avec le serveur.
//Le client utilise Socket.IO pour communiquer avec le serveur.
var socket = io.connect('/');


//Gets the canvas and the canvas context
var canvas = document.getElementById('board');
var ctx    = canvas.getContext('2d');




//Cette fonction écoute les événements de mouvement de la souris sur le canvas. 
//Lorsque l'utilisateur déplace la souris sur le canvas, les coordonnées x et y de la souris par rapport au canvas sont envoyées au serveur via des sockets.
$("#board").mousemove((ev) => {
	socket.emit('action', {
		xPos: ev.pageX - $('#board').offset().left,
		yPos: ev.pageY - $('#board').offset().top
	});
});



//Cette fonction écoute les événements 'update' envoyés par le serveur. 
//Lorsque le serveur envoie une mise à jour de l'état du jeu, cette fonction est déclenchée pour mettre à jour le canvas avec les nouvelles données reçues.
socket.on('update', (data) => {
	updateCanvas(data);
});



//Cette fonction est appelée lorsqu'une mise à jour de l'état du jeu est reçue.
//Elle efface le canvas et dessine tous les éléments du jeu (balle, palettes des joueurs, lignes de séparation, scores, etc.) avec les nouvelles données reçues du serveur.

function updateCanvas(data) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall(data);
	drawText(data);
	drawLines(data)
	drawPlayers(data);
}



//Cette fonction dessine les éléments textuels sur le canvas, tels que les scores et le nombre de joueurs en ligne.
function drawText(data) {
	//Draws left score
	ctx.textAlign = "center"; 
	ctx.fillStyle = "blue";
	ctx.font = "bold 60px Monospace";
	ctx.fillText(data.status.leftScore, ((canvas.width)*0.25), 70);
	//Draws right score
	ctx.fillStyle = "red";
	ctx.font = "bold 60px Monospace";
	ctx.fillText(data.status.rightScore, ((canvas.width)*0.75), 70);
	//Draws "players online"
	var onlineStr = data.players.length + " joueur";
	onlineStr += (data.players.length == 1) ? " connecté!" : "s connectés!";
	ctx.textAlign = "start";
	ctx.fillStyle = (data.sets.theme == "dark") ? "white" : "black";
	ctx.font = "bold 20px Monospace";
	ctx.fillText(onlineStr, 20, canvas.height-20);
}

//Cette fonction dessine les lignes de séparation du terrain de jeu, y compris les lignes centrales, supérieure, inférieure, gauche et droite.
function drawLines(data) {
	//Choose line color based on the player settings
	ctx.fillStyle = (data.sets.theme == "dark") ? "white" : "black";
	//Draws the central lines
	for(var i = 0; i < canvas.height; i+= 120) {
		ctx.rect(canvas.width/2 - 5, i, 10, 60);
		ctx.fill();
	}
	//Top line
	ctx.rect(0, 0, canvas.width, 10);
	ctx.fill();
	//Bottom line
	ctx.rect(0, canvas.height-10, canvas.width, 10);
	ctx.fill();
	//Left line
	ctx.rect(0, 0, 10, canvas.height);
	ctx.fill();
	//Right line
	ctx.rect(canvas.width-10, 0, 10, canvas.height);
	ctx.fill();
}


//Cette fonction dessine les palettes des joueurs connectés sur le canvas en fonction de leurs positions et de leurs paramètres, comme l'affichage ou non de leur nom.
function drawPlayers(data) {
    for(var i = 0; i < data.players.length; i++) {
        ctx.fillStyle = "red";
        // Dessiner les rectangles de palette à partir des coins supérieurs gauche et droit
        ctx.fillRect(data.players[i].xPos - 10, data.players[i].yPos - 40, 20, 80); // Rectangle centré sur la position du joueur
        // Dessiner le nom du joueur s'il y en a
        if(data.sets.displayNames == "true") {
            ctx.fillStyle = (data.sets.theme == "dark") ? "white" : "black";
            ctx.textAlign = "center";  
            ctx.font = "bold 15px Monospace";
            ctx.fillText(data.players[i].name, data.players[i].xPos, data.players[i].yPos-50);
            ctx.textAlign = "start";
        }
    }
}

//Cette fonction dessine la balle sur le canvas en fonction de sa position et de ses paramètres.
function drawBall(data) {
	ctx.fillStyle = data.ball.color;
	ctx.beginPath();
	ctx.arc(data.ball.xPos,data.ball.yPos,data.ball.radius,0,2*Math.PI);
	ctx.fill();
}