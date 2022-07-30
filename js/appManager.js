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
    this.score = 0;

    if (this.username === null) {
      this.menuViewController = new MenuViewController(this, this.appContainer);
    } else {
      this.showGame();
    };

    this.cardView1 = null;
    this.cardView2 = null;

    this.tadaSound = new Audio('./assets/sound/tada.mp3');
    this.loseSound = new Audio('./assets/sound/lose.mp3');
    this.winSound = new Audio('./assets/sound/win.mp3');
  }
  
  showScores(){
    this.scoresViewController = new ScoresViewController(this, this.appContainer);
  }
  
  showGame() {
    
    this.gameViewController = new GameViewController(this, this.appContainer);
    this.gameViewController.reset();
    this.reset();
  }

  removeViewController(viewController) {
    this.clicks = 0;
    this.time = 0;
    this.cleanGameTimer();
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
      this.tadaSound.play();
      this.cardView1 = null;
      this.cardView2 = null;
      if (this.gameViewController.isGameCompleted()) {
        this.winSound.play();
        this.cleanGameTimer();
        this.gameViewController.sendScore({
          "username": this.username,
          "clicks": this.clicks,
          "time": this.time,
          "score": ((70 - this.time) - (this.clicks))
        });
      }
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
      this.loseSound.play();
    }
  }

  cleanGameTimer() {
    window.clearInterval(this.timer);
    this.timer = null;
  }

  reset() {
    this.clicks = 0;
    this.time = 0;
    this.cleanGameTimer();
    this.timer = window.setInterval(this.updateTime.bind(this), 1000);
    this.gameViewController.updateTime();
    this.gameViewController.updateClicks();
  }

  newMenu() {
    window.clearInterval(this.timer);
    this.menuViewController = new MenuViewController(this, this.appContainer);
  }
}