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
    this.timeLimit = 30;

    if (this.username === null) {
      this.menuViewController = new MenuViewController(this, this.appContainer);
    } else {
      this.showGame();
    };
  }
  
  showScores(){
    
    this.scoresViewController = new ScoresViewController(this, this.appContainer);
  }
  
  showGame(){
    
    this.gameViewController = new GameViewController(this, this.appContainer);
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

  updateClicks() {
    this.clicks += 1;
    this.gameViewController.updateClicks();
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