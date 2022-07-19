import { CardView } from "../../views/cardView/cardView.js";
import { ViewController } from "../viewController.js";
import { GameService } from "./gameService.js";

export class GameViewController extends ViewController{
  
  constructor(appManager, parent){

    super(appManager, parent, 'Game');

    this.mainContainer.className = 'gameViewController_mainContainer';
    //this.mainContainer.classList.add('mainContainer');

    this.service = new GameService(this);

    this.cardViews = [];

    var hudContainer = document.createElement('div');
    hudContainer.className = 'gameViewController_hudContainer';
    this.contentContainer.appendChild(hudContainer);

    this.clicksLbl = document.createElement('p');
    this.updateClicks();
    this.clicksLbl.className = 'cardsContainer_clicksLbl';
    hudContainer.appendChild(this.clicksLbl);

    this.timerLbl = document.createElement('p');
    this.updateTime();
    this.timerLbl.className = 'cardsContainer_timerLbl';
    hudContainer.appendChild(this.timerLbl);
    
    this.resetBtn = document.createElement('button');
    this.resetBtn.innerHTML = 'Reset';
    this.resetBtn.className = 'cardsContainer_resetBtn';
    hudContainer.appendChild(this.resetBtn);
    this.resetBtn.onclick = this.reset.bind(this);
    
    this.cardsContainer = document.createElement('div');
    this.cardsContainer.className = 'gameViewController_cardsContainer';
    this.contentContainer.appendChild(this.cardsContainer);
    
    
    this.contentContainer.classList.add('gameViewController_contentContainer');
    
    this.service.getCards();
    
    
  }
  
  start(cards) {
    this.cardsContainer.innerHTML = '';
    this.cardViews = [];
    cards.forEach(card => {
      var cardView = new CardView(this.cardsContainer, card, this.appManager);
      this.cardViews.push(cardView);
    })
    
  }
  
  end() {
    this.cardViews.forEach(cardView => {
      cardView.end();
    })
  }
  
  updateClicks() {
    this.clicksLbl.innerHTML = `Clicks: ${this.appManager.clicks}`;
  }
  
  updateTime() {
    
    this.timerLbl.innerHTML = `Time: ${this.appManager.time}`;
  }
  
  reset() {
    this.service.getCards();
    this.appManager.reset();
  }

  show(){

  }

  hide(){
    
  }

}

//https://us-central1-beehivebackend-23257.cloudfunctions.net/app/cards/9
//https://us-central1-beehivebackend-23257.cloudfunctions.net/app/scores