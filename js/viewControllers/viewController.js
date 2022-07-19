import { View } from "../views/view.js";

export class ViewController extends View {
  constructor(appManager, parent, titleLbl = '') {
    
    super(parent);
    
    this.appManager = appManager;
    this.service = null;
    this.navigationBar = document.createElement('div');
    this.contentContainer = document.createElement('div');

    this.parent.appendChild(this.mainContainer);
    this.mainContainer.appendChild(this.navigationBar);
    this.mainContainer.appendChild(this.contentContainer);

    this.navigationBar.className = 'navigationBar';
    this.contentContainer.className = 'contentContainer';
    
    this.backBtn = document.createElement('button');
    this.backBtn.innerHTML = 'Back';
    this.navigationBar.appendChild(this.backBtn);

    this.title = document.createElement('p');
    this.title.innerHTML = titleLbl;
    this.title.className = 'viewController_titleLbl';
    this.navigationBar.appendChild(this.title);

    this.backBtn.onclick = this.remove.bind(this);
  }

  remove(){

    this.appManager.removeViewController(this);
  
  }
}