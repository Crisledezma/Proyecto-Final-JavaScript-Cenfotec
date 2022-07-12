import { ViewController } from "../viewController.js";

export class ScoresViewController extends ViewController{

  constructor(appManager, parent){

    super(appManager, parent, 'Scores');

    this.mainContainer.className = 'scoresViewController';
    this.mainContainer.classList.add('mainContainer');

  }

  show(){

  }

  hide(){
    
  }

}