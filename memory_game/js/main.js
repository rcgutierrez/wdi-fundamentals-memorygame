var cards = [

	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}

];

//Variables containing what is on the board
var cardsInPlay = [];
var suitsInPlay = [];

//Variable containing win counter, initializes counter
var wins = 0;
document.getElementById('counter').textContent = wins;

//Sets listener to thank donators
var thanks = function() {
	alert("Aww, you shouldn't have!");
	alert("But I do take cash :)");
	alert("Only half joking...");
}
document.getElementById('donate').addEventListener('click', thanks);

//Function to flip card
var flipCard = function(){
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);

	//Adds card attributes to arrays
	cardsInPlay.push(cards[cardId].rank);
	suitsInPlay.push(cards[cardId].suit);


	this.setAttribute('src', cards[cardId].cardImage);

	//Variable that will determine image at end of function
	var finalImage = cards[cardId].cardImage;

	//Reverts image to back face, removes card from arrays
	var resetCard = function() {
		finalImage = 'images/back.png';
		cardsInPlay.pop();
		suitsInPlay.pop();
	};

	
	var checkForMatch = function() {

		if(cardsInPlay.length === 2) {

			//Checks to see if card is clicked twice via suit, resets card
			if(suitsInPlay[0] === suitsInPlay[1] && cardsInPlay[0] === cardsInPlay[1]){
				cardsInPlay.pop();
				suitsInPlay.pop();
				resetCard();
				return;
			}

			//For first pair found
			if(cardsInPlay[0] === cardsInPlay[1]){
				alert("You found a match!");
				
			}else{
				alert("Sorry, try again!");
				resetCard();
			}
		
		};

		//Prevents function from executing for first pair after match
		if(cardsInPlay.length === 3){
			if(cardsInPlay[2] === cardsInPlay[0] || cardsInPlay[2] === cardsInPlay[1] && suitsInPlay[2] === suitsInPlay[0] || suitsInPlay[2] === suitsInPlay[1]){
				cardsInPlay.pop();
				suitsInPlay.pop();
				return;
				
			}

		};  

		//For second pair found 
		if(cardsInPlay.length === 4){

			//Checks to see if card is clicked twice via suit, resets card
			if(suitsInPlay[2] === suitsInPlay[3] && cardsInPlay[2] === cardsInPlay[3]){
				cardsInPlay.pop();
				suitsInPlay.pop();
				resetCard();
				return;
			}

			if(cardsInPlay[2] === cardsInPlay[3]){
				alert("You found a match!");

				//Updates win counter
				wins = wins + 1;
				document.getElementById('counter').textContent = wins;
				
			}else{
				alert("Sorry, try again!");
				resetCard();
			}
		};

	};

	checkForMatch();

	//Verifies arrays contain cards on the board
	console.log(cardsInPlay);
	console.log(suitsInPlay);
	console.log(wins);

	//Revers image to back if card pressed twice, otherwise keeps face
	this.setAttribute('src', finalImage);

};

var createBoard = function() {

	//Counters for the cards left to choose from in 'for' loop
	var queensAvailable = 2;
	var kingsAvailable = 2;
	var cardsAvailable = (queensAvailable + kingsAvailable) - 1;

	for(var i = 0; i < cards.length; i++){

		//Generates random number to choose card from 'cards' object
		var cardChosen = Math.floor(Math.random()*(cardsAvailable));
		if (cardChosen === 0 || cardChosen === 1) {
			queensAvailable - 1;
		}else{
			kingsAvailable - 1;
		};

		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
};


createBoard();

var resetAllCards = function() {
	//Deletes div content, clears arrays, creates another board
	document.getElementById('game-board').innerHTML = '';
	cardsInPlay = [];
	suitsInPlay = [];
	createBoard();
}

document.getElementById('reset').addEventListener('click', resetAllCards);

