
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
        this.viewController.start(JSON.parse(request.responseText));
      }
    }
  }


}


//https://us-central1-beehivebackend-23257.cloudfunctions.net/app/cards/9
//https://us-central1-beehivebackend-23257.cloudfunctions.net/app/scores