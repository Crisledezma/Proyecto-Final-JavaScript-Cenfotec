import { GameViewController } from "./viewControllers/game/gameViewController.js";
import { MenuViewController } from "./viewControllers/menu/menuViewController.js";
import { ScoresViewController } from "./viewControllers/scores/scoresViewController.js";

export class AppManager{

  constructor(){

    this.appContainer = document.getElementById('appContainer');
    this.menuViewController = null;
    this.scoresViewController = null;
    this.gameViewController = null;

    this.username = window.localStorage.getItem('username');

    this.clicks = 0;
    this.time = 0;
    this.timer = null;
    this.timeLimit = 60;
    this.showingTimer = null;

    if (this.username === null) {
      this.menuViewController = new MenuViewController(this, this.appContainer);
    } else {
      this.showGame();
    };

    this.cardView1 = null;
    this.cardView2 = null;
  }
  
  showScores(){
    
    this.scoresViewController = new ScoresViewController(this, this.appContainer);
  }
  
  showGame(){
    
    this.gameViewController = new GameViewController(this, this.appContainer);
    //this.menuViewController = null;
    this.timer = window.setInterval(this.updateTime.bind(this),1000)
  }

  removeViewController(viewController){
    this.appContainer.removeChild(viewController.mainContainer);
  }

  setUsername(username) {
    
    this.username = username;

    window.localStorage.setItem('username', username);
  }

  getUsername() {

    return window.localStorage.getItem('username');
  }

  onCardViewSelected(cardView) {

    if (this.cardView1 != null && this.cardView2 != null) return;

    this.clicks += 1;
    this.gameViewController.updateClicks();
    if (this.cardView1 === null) {
      this.cardView1 = cardView;
      this.cardView1.show();
    } else if (this.cardView2 === null) {
      this.cardView2 = cardView;
      this.cardView2.show();
      this.showingTimer = window.setTimeout(this.resetSelectedCardViews.bind(this), 1000);
    }
  }

  resetSelectedCardViews() {
    window.clearTimeout(this.showingTimer);
    this.showingTimer = null;

    if (this.cardView1.card.id === this.cardView2.card.id) {
      this.cardView1.discover();
      this.cardView2.discover();
      this.cardView1 = null;
      this.cardView2 = null;
    } else {
      this.cardView1.hide();
      this.cardView2.hide();
      this.cardView1 = null;
      this.cardView2 = null;
    }
  }

  updateTime() {
    if(this.time < this.timeLimit){
      this.time += 1;
      this.gameViewController.updateTime();
    } else {
      window.clearInterval(this.timer);
      this.gameViewController.end();
    }
  }

  reset() {
    this.clicks = 0;
    this.time = 0;
    window.clearInterval(this.timer);
    this.timer = window.setInterval(this.updateTime.bind(this), 1000);
    this.gameViewController.updateTime();
    this.gameViewController.updateClicks();
  }
}