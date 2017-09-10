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

var cardsInPlay = [];
var suitsInPlay = []



var flipCard = function(){
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);

	cardsInPlay.push(cards[cardId].rank);
	suitsInPlay.push(cards[cardId].suit);

	this.setAttribute('src', cards[cardId].cardImage);

	var finalImage = cards[cardId].cardImage;

	var resetCard = function() {
		finalImage = 'images/back.png';
		cardsInPlay.pop();
		suitsInPlay.pop();
	};

	
	var checkForMatch = function() {

		if(cardsInPlay.length === 2) {
			if(suitsInPlay[0] === suitsInPlay[1] && cardsInPlay[0] === cardsInPlay[1]){
				cardsInPlay.pop();
				suitsInPlay.pop();
				resetCard();
				return;
			}

			if(cardsInPlay[0] === cardsInPlay[1]){
				alert("You found a match!");
				
			}else{
				alert("Sorry, try again!");
				resetCard();
			}
		
		};

		if(cardsInPlay.length === 4){
			if(cardsInPlay[2] === cardsInPlay[3]){
				alert("You found a match!");
				
			}else{
				alert("Sorry, try again!");
				resetCard();
			}
		};

	};

	checkForMatch();

	console.log(cardsInPlay);
	console.log(suitsInPlay);
	
	this.setAttribute('src', finalImage);

};

var createBoard = function() {
	var queensAvailable = 2;
	var kingsAvailable = 2;

	for(var i = 0; i < cards.length; i++){

		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
};


createBoard();

