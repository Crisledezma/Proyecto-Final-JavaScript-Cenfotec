import { ViewController } from "../viewController.js";

export class GameViewController extends ViewController{
  
  constructor(appManager, parent){

    super(appManager, parent, 'Game');

    this.mainContainer.className = 'gameViewController';
    this.mainContainer.classList.add('mainContainer');

  }

  show(){

  }

  hide(){
    
  }

}