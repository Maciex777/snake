var parameters = document.getElementById("parameters");
var info = document.getElementById("info-panel");
var playAgain = document.getElementById("playAgain")
var highscores = document.getElementById("highscores")
var highscore = 0;
var setSpeed = false;
//default speed setting
var speed = 150;
var speedAmount = document.getElementById("speed");
var powerTimeAmount = document.getElementById("powerTimeAmount");
var actualPowerTime = document.getElementById("actualPowerTime");
var actualPowerUnit = document.getElementById("actualPowerUnit");
var actualSpeedAmount = document.getElementById("actualSnakeSpeed");
var actualSnakeLength = document.getElementById("actualSnakeLength");
var actualPointValue = document.getElementById("actualPointValue");
var actualPowerType = document.getElementById("actualPowerType");
//default power-up time
var powerTimeValues = 5000;
//default power-up unit
var powerUnitValues = 1;

//setting power-up time by input onchange
function setPowerTime(powerTimeValue){
powerTimeValues = parseInt(powerTimeValue);
powerTimeAmount.innerHTML = powerTimeValues;
}

//setting power-up unit by input onchange
function setPowerUnits(powerUnitValue){
powerUnitValues = parseInt(powerUnitValue);
}

//setting snake speed by input onchange
function setSnakeSpeed(snakeSpeed){
snakeSpeeds = parseInt(snakeSpeed);
setSpeed = true;
speed = snakeSpeeds;
speedAmount.innerHTML = speed;
}

function init(){

	var canvas = document.querySelector("#canvas");
	var ctx = canvas.getContext("2d");
	//start looping
	var looping = true;
	canvas.focus();

	var level = document.getElementById("level").value;
	var scoreValue = 1;

	//setting score points value and snake speed depending on level
	if(level == 2){
		canvas.setAttribute("width", "450");
		canvas.setAttribute("height", "450");
		scoreValue = 2;
		if(!(setSpeed)){
			speed = 120;
			speedAmount.innerHTML = speed;
		}
	} else if(level == 3) {
		scoreValue = 4;
		if(!(setSpeed)){
			speed = 100;
			speedAmount.innerHTML = speed;
	  }
		canvas.setAttribute("width", "400");
		canvas.setAttribute("height", "400");
	} else if(level == 4) {
		scoreValue = 8;
		if(!(setSpeed)){
			speed = 70;
			speedAmount.innerHTML = speed;
		}
		canvas.setAttribute("width", "350");
		canvas.setAttribute("height", "350");
	} else if(level == 5) {
		scoreValue = 12;
		if(!(setSpeed)){
			speed = 50;
			speedAmount.innerHTML = speed;
		}
		canvas.setAttribute("width", "300");
		canvas.setAttribute("height", "300");
	} else {
		scoreValue = 1;
		if(!(setSpeed)){
			speed = 150;
			speedAmount.innerHTML = speed;
		}
		canvas.setAttribute("width", "500");
		canvas.setAttribute("height", "500");
	}

	// ---  OBSTACLE CONSTRUCTOR --- //

	//The constructor accepts two arguments: pointers to the canvas element and its two-dimensional context
	function Obstacle(ctx, canvas) {
		//canvas – takes the parameter value, refers to the canvas element in the html document
		this.canvas = canvas;
		//ctx – takes the parameter value, refers to the context of the two-dimensional canvas element
		this.ctx = ctx;
		//size – the length of the side of the square representing the obstacle on the board
		this.size = 25;
		//onBoard – boolean value, determines if the obstacle is already on the board
		this.onBoard = false;
		//x – horizontal position of the obstacle, in the constructor set to zero
		this.x = 0;
		//y – vartical position of the obstacle, in the constructor set to zero
		this.y = 0;


		//randomize method sets the x and y fields of the obstacle. Values are generated randomly. They can contain integers ranging from zero to the size of a canvas element divided by the size of the obstacle
		this.randomize = function() {
			this.x = Math.floor(Math.random() * (this.canvas.width/this.size));
			this.y = Math.floor(Math.random() * (this.canvas.height/this.size));
		};


		//drawApple method draws an obstacle on the game board
		this.drawObstacle = function() {
			this.ctx.fillStyle = "grey";
			this.ctx.beginPath();
			this.ctx.rect(this.x*this.size,this.y*this.size,this.size,this.size);
			this.ctx.fill();
			this.ctx.closePath();
		};
	}


	// ---  POWER-UP CONSTRUCTOR --- //

	//The constructor accepts two arguments: pointers to the canvas element and its two-dimensional context
	function Power(ctx, canvas) {
		//canvas –  takes the parameter value, refers to the canvas element in the html document
		this.canvas = canvas;
		//ctx – takes the parameter value, refers to the context of the two-dimensional canvas element
		this.ctx = ctx;
		//size – the length of the side of the square representing the power-up on the board
		this.size = 25;
		//onBoard – boolean value, determines if the power-up is already on the board
		this.onBoard = false;
		this.eatenPower = true;
		//x – horizontal position of the power-up, in the constructor set to zero
		this.x = 0;
		//y – vertical position of the power-up, in the constructor set to zero
		this.y = 0;
		//type of power-up, numbers from 1 to 6 determine the type of action
		this.powerType = 1;
		//power-up time
		this.powerTimeValue = powerTimeValues;
		actualPowerTime.innerHTML = this.powerTimeValue;
		//power-up unit
		this.powerUnitValue = powerUnitValues;
		actualPowerUnit.innerHTML = this.powerUnitValue;

		//randomize method sets the x and y fields of the power-up. Values are generated randomly. They can contain integers ranging from zero to the size of a canvas element divided by the size of the power-up
		this.randomize = function() {
			this.x = Math.floor(Math.random() * (this.canvas.width/this.size));
			this.y = Math.floor(Math.random() * (this.canvas.height/this.size));
		};

		//drawApple method draws the power-up on the game board
		this.drawPower = function() {
			this.ctx.fillStyle = "violet";
			this.ctx.beginPath();
			this.ctx.rect(this.x*this.size,this.y*this.size,this.size,this.size);
			this.ctx.fill();
			this.ctx.closePath();
			this.ctx.fillStyle = "black";
		};
	}


	// ---  APPLE CONSTRUCTOR --- //

	//The constructor accepts two arguments: pointers to the canvas element and its two-dimensional context
	function Apple(ctx, canvas) {
		//canvas –  takes the parameter value, refers to the canvas element in the html document
		this.canvas = canvas;
		//ctx – takes the parameter value, refers to the context of the two-dimensional canvas element
		this.ctx = ctx;
		//size – the length of the side of the square representing the apple on the board
		this.size = 25;
		//onBoard – boolean value, determines if the apple is already on the board
		this.onBoard = false;
		//x – horizontal position of the apple, in the constructor set to zero
		this.x = 0;
		//y – vertical position of the apple, in the constructor set to zero
		this.y = 0;
		//scoreValue – the number of score points a player will receive for eating the apple
		this.scoreValue = scoreValue;
		actualPointValue.innerHTML = this.scoreValue;


		//randomize method sets the x and y fields of the power-up. Values are generated randomly. They can contain integers ranging from zero to the size of a canvas element divided by the size of the power-up
		this.randomize = function() {
			this.x = Math.floor(Math.random() * (this.canvas.width/this.size));
			this.y = Math.floor(Math.random() * (this.canvas.height/this.size));
		};

		//drawApple method draws the apple on the game board
		this.drawApple = function() {
			this.ctx.fillStyle = "green";
			this.ctx.beginPath();
			this.ctx.rect(this.x*this.size,this.y*this.size,this.size,this.size);
			this.ctx.fill();
			this.ctx.closePath();
			this.ctx.fillStyle = "black";
		};
	}

	// ---  SNAKE CONSTRUCTOR --- //

	function Snake(ctx, canvas) {
		var that = this;
		this.canvas = canvas;
		this.ctx = ctx;
		//speed – speed of the snake. This value will be used in the setInterval function
		this.speed = speed;

		actualSpeedAmount.innerHTML = this.speed;
		//size – size of the side of one segment, from which the snake will be built.
		this.size = 25;
		//bodyParts – the number of segments the snake is made of at the moment.
		this.bodyParts= 8;

		actualSnakeLength.innerHTML = this.bodyParts;
		//bodyPartsHolder – an array that stores all snake segments in the form of mini objects. These objects have two fields: x and y (the coordinates of a given segment on the board).
		this.bodyPartsHolder = [];
		//direction – a string according to which the direction of the snake movement is set. Default set to "right". Changed using the arrows
		this.direction = "right";
		//paused – true means that the game is paused
		this.paused = false;
		//alive – true means that the snake is alive and the game goes on. If this field changes to false, the loop stops
		this.alive = true;
		//eaten – set to true when the snake eats an apple
		this.eaten = false;
		//charged –  set to true when the snake eats power-up
		this.charged = false;
		//set to true when the snake get power-up with maze penetration
		this.mazePenetrate = false;


		//initSnake method initializes the snake. Fills the bodyPartsHolder array with objects with appropriate values of half x and y.
		//Also invokes the makeSnakeListen method.
		this.initSnake = function(){
			for (var i=0; i < this.bodyParts; i++) {
			  this.bodyPartsHolder.push({x:i,y:0});
			};
			this.makeSnakeListen(window);

		};


		//updatePosition method updates the position of all snake segments.
		//First, it raises or lowers the x or y value (depending on the current direction value) of the last element of the array ('snake head') by 1.
		//It then updates the positions of all subsequent elements with those that have the element previously located.
		this.updatePosition = function(){
			var tempx = this.bodyPartsHolder[this.bodyParts-1].x;
			var tempy = this.bodyPartsHolder[this.bodyParts-1].y;
			var prevX = tempx;
			var prevY = tempy;
			switch(this.direction){
				case "right":
					this.bodyPartsHolder[this.bodyParts-1].x++;
					break;
				case "down":
					this.bodyPartsHolder[this.bodyParts-1].y++;
					break;
				case "left":
					this.bodyPartsHolder[this.bodyParts-1].x--;
					break;
				case "up":
					this.bodyPartsHolder[this.bodyParts-1].y--;
					break;
			}

			for(var i = this.bodyParts-2; i>=0;i--) {
				tempx = this.bodyPartsHolder[i].x;
				tempy = this.bodyPartsHolder[i].y;
				this.bodyPartsHolder[i].x = prevX;
				this.bodyPartsHolder[i].y = prevY;
				prevX = tempx;
				prevY = tempy;
			}
		};


		//makeSnakeListen method assigns to the object window eventListener onkeydown.
		//Pressing any of the arrows changes the value of the direction field.
		//Pressing the spacebar will change the value of the paused field to true, and will write the word "PAUSE" on the board in red letters.
		this.makeSnakeListen = function (window){
			window.onkeydown = function(e){
				switch(e.keyCode){
					case 37:
						if(that.direction != "right"){
							that.direction = "left";
						}
						break;
					case 38:
						if(that.direction != "down"){
							that.direction = "up";
						}
						break;
					case 39:
						if(that.direction != "left"){
							that.direction = "right";
						}
						break;
					case 40:
						if(that.direction != "up"){
							that.direction = "down";
						}
						break;
					case 32 /*spacja*/:
						if(that.paused){
							that.paused = false;
						} else {
							that.paused = true;
							that.ctx.font = "50px serif red";
							that.ctx.fillStyle = "red";
							that.ctx.fillText("PAUSE", 150, 250);
							that.ctx.fillStyle = "black";
						}
						break;
				}
			};
		};


		//moveSnake method calls the drawSnake and updatePosition methods.
		this.moveSnake = function(){
			this.drawSnake();
			this.updatePosition();
		};


		//drawSnake method iterates through the bodyPartsHolder array and draws all snake segments on the board, based on the x and y values of each element.
		this.drawSnake = function(){
			for(var i=0; i < this.bodyParts; i++) {
				this.ctx.beginPath();
				this.ctx.rect(this.bodyPartsHolder[i].x*this.size,this.bodyPartsHolder[i].y*this.size,this.size,this.size);
				this.ctx.fill();
				this.ctx.closePath();
			};
		};


		//checkColissions method is called in the game object and takes two values: the current x and y of the apple.
		this.checkColissions = function(appleX,appleY,obstacleX,obstacleY,powerX,powerY){
			var sneakHead = this.bodyPartsHolder[this.bodyParts-1];
			if(sneakHead.x*this.size >= canvas.width){
				sneakHead.x = 0
			}
			if(sneakHead.x < 0){
				sneakHead.x = canvas.width/this.size;
			}
			if(sneakHead.y*this.size >= canvas.height){
				sneakHead.y = 0
			}
			if(sneakHead.y < 0){
				sneakHead.y = canvas.height/this.size;
			}
			//condition checks whether the snake's head does not have the same x and y as the apple (whose coordinates were passed as arguments). If so, the eaten field changes to true.
			if(sneakHead.x == appleX && sneakHead.y == appleY){
				this.eaten = true;
			}
			//if the snake falls on the power-up, the the charged field changes to true.
			if(sneakHead.x == powerX && sneakHead.y == powerY){
				this.charged = true;
			}
			//if the snake falls on the obstacle, the alive field will be false.
			if(sneakHead.x == obstacleX && sneakHead.y == obstacleY && this.mazePenetrate == false){
				this.alive = false;
			}
			//condition checks whether the snake's head does not have the same x and y as any other segment.
			for(var i = 0; i < this.bodyPartsHolder.length-1; i++){
				if(sneakHead.x == this.bodyPartsHolder[i].x && sneakHead.y == this.bodyPartsHolder[i].y){
					this.alive = false;
				}
			}
		};


		//grow method is called by the Game object when the snake eats an apple. it raises the value of the bodyParts field by 1.
		//It also adds a new element to the beginning of the bodyPartsHolder array.
		//x and y of the new element are set to -1 so that it does not appear on the board before the updatePosition method, does not place it at the end of the snake
		this.grow = function(){
			this.bodyParts++;
			this.bodyPartsHolder.unshift({x:-1,y:-1});
		};
	}






	// ---  GAME CONSTRUCTOR --- //

	function Game(canvas, ctx){

		var levelHeading = document.getElementById("level-heading");
		//check level and set heading
		if(level == 2){
			levelHeading.innerHTML = " 2";
		} else if(level == 3) {
			levelHeading.innerHTML = " 3";
		} else if(level == 4) {
			levelHeading.innerHTML = " 4";
		} else if(level == 5) {
			levelHeading.innerHTML = " 5";
		} else {
				levelHeading.innerHTML = " 1";
		}

		var that = this;
		this.canvas = canvas;
		this.ctx = ctx;
		//width of the selected canvas element
		this.width = canvas.width;
		//height of the selected canvas element.
		this.height = canvas.height;
		//state –a string that determines the current state of the game, used by the init method. The initial value is New
		this.state = "New";
		//Constructors called with the canvas and ctx arguments of the Game object
		this.snake = new Snake(this.ctx, this.canvas);
		this.apple = new Apple(this.ctx, this.canvas);
		this.power = new Power(this.ctx, this.canvas);
		this.obstacle = new Obstacle(this.ctx, this.canvas);
		//appleCorrect determines whether the apple has been placed correctly on the board (not on the field currently occupied by the snake).
		this.appleCorrect = true;
		this.powerCorrect = true;
		this.obstacleCorrect = true;
		//score – a field that stores the number of points that the player managed to get, initially set to zero.
		this.score = 0;


		//welcome method called by the init method when the state field is New.
		//This method changes state to "playGame" and the init method is restarted.
		this.welcome = function() {
			that.state = "PlayGame";
			that.init();
		};

		//activateGame method first initializes the snake by calling the Snake object method - initSnake and then sets setInterval.
		this.activateGame = function() {
			this.snake.initSnake();
			var t = 0;
			function loop() {
			//this.intervalID = setInterval(function(){
				//First, the method checks if the snake has eaten the apple (through the field of the Snake object).
				//If so the player is added points, the snake grows and the apple is removed from the board.
				if(that.snake.eaten){
					that.score += that.apple.scoreValue;
					document.getElementById("score").innerHTML = that.score;
					that.apple.onBoard = false;
					that.snake.grow();
					that.snake.eaten = false;
					that.power.eatenPower = false;
				}

				//the method checks if the snake has eaten a power-up
				if(that.snake.charged){
					that.power.onBoard = false;
					var yes = true;
					that.snake.charged = false;
					//the selected type of power-up is performed
					if(!(that.power.eatenPower)){
						if(that.snake.powerType == 1){
							actualPowerType.innerHTML = "Shortening the snake by " + that.power.powerUnitValue;
							that.snake.bodyParts -= that.power.powerUnitValue;
							that.snake.bodyPartsHolder.length -= that.power.powerUnitValue;
						} else if(that.snake.powerType == 2){
							actualPowerType.innerHTML = "Extension of the snake by " + that.power.powerUnitValue;
							var h = 0;
							while(h < that.power.powerUnitValue){
								that.snake.bodyParts++;
								that.snake.bodyPartsHolder.unshift({x:-1,y:-1});
								h++;
							}
						} else if(that.snake.powerType == 3){
							actualPowerType.innerHTML = "Acceleration of the snake on " + that.power.powerTimeValue + " seconds";
							that.snake.speed /= 2;
							setTimeout(function(){
								that.snake.speed *= 2;
							}, that.power.powerTimeValue);
						} else if(that.snake.powerType == 4){
							actualPowerType.innerHTML = "Slow down the snake on " + that.power.powerTimeValue + " seconds";
							that.snake.speed *= 2;
							setTimeout(function(){
								that.snake.speed /= 2;
							}, that.power.powerTimeValue);
						} else if(that.snake.powerType == 5){
							actualPowerType.innerHTML = "More points (standard number multiplied by " + that.power.powerUnitValue + ")";
							that.apple.scoreValue *= that.power.powerUnitValue;
						} else {
							actualPowerType.innerHTML = "Make the snake go through the elements of the maze for " + that.power.powerTimeValue + " seconds";
							that.snake.mazePenetrate = true;
							setTimeout(function(){
								that.snake.mazePenetrate = false;
							}, that.power.powerTimeValue);
					}
					}

					that.power.eatenPower = true;
				}
				//clearing the canvas element, provided that the game is not currently paused
				if(that.snake.paused != true){
					that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
				};

				//if there is an obstacle on the board, the method of the Obstacle object - drawObstacle is called.
				//If the obstacle is not there, a new position is drawn (until it coincides with the position of the snake), after which the obstacle is placed on the board and drawn
				if(that.obstacle.onBoard) {
					that.obstacle.drawObstacle();
				} else {
					do {
						that.obstacleCorrect = true;
						that.obstacle.randomize();
				for(var k = 0; k < that.snake.bodyPartsHolder.length; k++){
					if(that.obstacle.x == that.snake.bodyPartsHolder[k].x && that.obstacle.y == that.snake.bodyPartsHolder[k].y ){
						that.obstacleCorrect = false;
						break;
					}
				}
			} while(!(that.obstacleCorrect));

			that.obstacle.onBoard = true;
			that.obstacle.drawObstacle();
			}

				//if there is an apple on the board, the method of the Apple object - drawApple is called.
				//If the apple is not there, a new position is drawn (until it coincides with the position of the snake and the obstacle), after which the apple is placed on the board and drawn
				if(that.apple.onBoard) {
					that.apple.drawApple();
				} else {
					do {
						that.appleCorrect = true;
						that.apple.randomize();
						for(var i = 0; i < that.snake.bodyPartsHolder.length; i++){
							if(that.apple.x == that.snake.bodyPartsHolder[i].x && that.apple.y == that.snake.bodyPartsHolder[i].y ){
								for(var j = 0; j < that.obstacle.size.length; j++){
									if(that.apple.x == that.obstacle.size[j].x && that.apple.y == that.obstacle.size[j].y ){
										that.appleCorrect = false;
										break;
									}
								}
							}
						}
					} while(!(that.appleCorrect));

					that.apple.onBoard = true;
					that.apple.drawApple();
				}


				//if there is an power-up on the board, the method of the Power object - drawPower is called.
				//If the power-up is not there and number of score is divisible by score points values multiple by 4, a new position is drawn (until it coincides with the position of the snake and the obstacle), after which the power-up is placed on the board and drawn
				if(that.power.onBoard && that.power.eatenPower == false) {
					that.power.drawPower();
				} else if(that.score != 0 && that.score%(that.apple.scoreValue*4) == 0 && that.power.onBoard == false && that.snake.charged == false) {
					do {
						that.powerCorrect = true;
						that.power.randomize();
						for(var l = 0; l < that.snake.bodyPartsHolder.length; l++){
							if(that.power.x == that.snake.bodyPartsHolder[l].x && that.power.y == that.snake.bodyPartsHolder[l].y ){
								for(var m = 0; m < that.obstacle.size.length; m++){
									if(that.power.x == that.obstacle.size[m].x && that.power.y == that.obstacle.size[m].y ){
										that.powerCorrect = false;
										break;
									}
								}
							}
						}
					} while(!(that.powerCorrect));


					//random selection of a power-up type
					that.snake.powerType = Math.floor(Math.random() * 7);
					that.power.onBoard = true;
					that.power.drawPower();
				}

				//checking if the field of the Snake - alive object is true.
				//If yes and the game is not paused, then it is drawn and updated as usual.
				//If the alive field is false, the program changes the value of the state field to "gameLost", puts a sad message on the screen and starts the init method again.
				if(that.snake.alive){
					if(that.snake.paused != true){
						that.snake.moveSnake();
						that.snake.checkColissions(that.apple.x,that.apple.y,that.obstacle.x,that.obstacle.y,that.power.x,that.power.y);
						playAgain.style.display = "none";
					}
				} else {
					that.ctx.font = "50px serif";
					that.ctx.fillStyle = "red";
					that.ctx.fillText("Snake is dead", 120, 200);
					that.ctx.font = "30px serif";
					that.ctx.fillText("Your score: "+that.score, 150, 285);
					that.ctx.fillStyle = "black";
					t = 0;
					that.state = "GameLost";
					that.init();
					playAgain.style.display = "block";
				}
				actualSnakeLength.innerHTML = that.snake.bodyParts;
				actualSpeedAmount.innerHTML = that.snake.speed;
				actualPointValue.innerHTML = that.apple.scoreValue;

				//console.log(this.bodyPartsHolder[i]);
				t++;
				if(looping){
				this.setTimeout(loop, that.snake.speed);
				}
			}
			if(looping){
				loop();
			}
		};
		//init method supports the appropriate game states and, depending on the value of the state field, calls the appropriate methods.
		//If the state is equal to "gameLost", this function resets all settings to prepare the game for a new batch.
		this.init = function() {

			 info.style.display = "block";
			 parameters.style.display = "none";
			switch(this.state){
				case "New":
					this.welcome();
					break;
				case "PlayGame":
					this.activateGame();
					break;
				case "GameLost":
					//stop looping
					looping = false;
					playAgain.onclick = function(){
								that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
								that.snake = null;
								that.snake = new Snake(that.ctx, that.canvas);
								that.apple = new Apple(that.ctx, that.canvas);
								that.power = new Power(that.ctx, that.canvas);
								that.obstacle = new Obstacle(that.ctx, that.canvas);
								that.state = "New";

								//save highscores
								if(highscore !== null){
								    if (that.score > highscore) {
												highscore = that.score;
												var newItem = document.createElement("LI");
												var textnode = document.createTextNode(that.score);
												newItem.appendChild(textnode);
												highscores.insertBefore(newItem, highscores.childNodes[0]);

												var h=0, itemCount = 0;
												while(highscores.getElementsByTagName('li') [h++]) itemCount++;
												//save only 5 best scores
												if(itemCount > 5){
														highscores.removeChild(highscores.lastChild);
												}

												that.score = 0;
												document.getElementById("score").innerHTML = that.score;
								    }
								}
								else{

										that.score = 0;
										document.getElementById("score").innerHTML = that.score;
								}
								info.style.display = "none";
								parameters.style.display = "block";
					}

					break;
			}
		};
	};

	var gra = new Game(canvas, ctx);
	gra.init();

}
