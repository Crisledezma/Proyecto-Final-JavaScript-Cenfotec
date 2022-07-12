import { GameViewController } from "./viewControllers/game/gameViewController.js";
import { MenuViewController } from "./viewControllers/menu/menuViewController.js";
import { ScoresViewController } from "./viewControllers/scores/scoresViewController.js";

export class AppManager{

  constructor(){

    this.appContainer = document.getElementById('appContainer');
    this.menuViewController = new MenuViewController(this, this.appContainer);
    this.scoresViewController = null;
    this.gameViewController = null;
  }
  
  showScores(){
    
    this.scoresViewController = new ScoresViewController(this, this.appContainer);
  }
  
  showGame(){
    
    this.gameViewController = new GameViewController(this, this.appContainer);
  }

  removeViewController(viewController){
    this.appContainer.removeChild(viewController.mainContainer);
  }

  
}