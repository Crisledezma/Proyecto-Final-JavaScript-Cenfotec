import { Card } from "../../models/card.js";

export class GameService {
  constructor(viewController) {
    
    this.viewController = viewController;
  }

  getCards() {
    
    var request = new XMLHttpRequest();
    request.open('GET', 'https://us-central1-beehivebackend-23257.cloudfunctions.net/app/cards/8');
    request.onload = this.getCardsCompleted.bind(this);
    request.send();

  }

  getCardsCompleted(e) {
    var cards = [];
    var request = e.target;
    if (request.readyState === 4) {
      if (request.status === 200) {
        var cardsData = JSON.parse(request.response);
        cardsData.cards.forEach(cardData => {
          var card = new Card(cardData.id, cardData.icon, cardData.isDiscovered);
          if (cardData.icon == '🫐') {
            return;
          }
          cards.push(card);
        })
      }
    }
    this.viewController.start(cards);
  }

  sendScore(score) {

    var request = new XMLHttpRequest();
    request.open('POST', 'https://us-central1-beehivebackend-23257.cloudfunctions.net/app/scores');
    request.onload = this.sendScoreCompleted.bind(this);
    request.send(JSON.stringify(score));
    
  }

  sendScoreCompleted(e) {
    var request = e.target;
    if (request.readyState === 4) {
      if (request.status === 200) {
        
      }
    }
  }


}


//https://us-central1-beehivebackend-23257.cloudfunctions.net/app/cards/9
//https://us-central1-beehivebackend-23257.cloudfunctions.net/app/scores