import { Card } from "../../models/card.js";

export class ScoresService {
  constructor(viewController) {
    
    this.viewController = viewController;
  }


  getScores() {

    var request = new XMLHttpRequest();
    request.open('GET', 'https://us-central1-beehivebackend-23257.cloudfunctions.net/app/scores');
    request.onload = this.getScoresCompleted.bind(this);
    request.send();
    
  }

  getScoresCompleted(e) {
    var request = e.target;
    if (request.readyState === 4) {
      if (request.status === 200) {
        //console.log('ScoresService', request.responseText);
        this.viewController.start(JSON.parse(request.response));
    //     var cardsData = JSON.parse(request.response);
    //     cardsData.cards.forEach(cardData => {
    //       var card = new Card(cardData.id, cardData.icon, cardData.isDiscovered);
    //       if (cardData.icon == '🫐') {
    //         return;
    //       }
    //       cards.push(card);
    //     })
    //   }
    // }
    // this.viewController.start(cards);
      }
    }
  }


}


//https://us-central1-beehivebackend-23257.cloudfunctions.net/app/cards/9
//https://us-central1-beehivebackend-23257.cloudfunctions.net/app/scores