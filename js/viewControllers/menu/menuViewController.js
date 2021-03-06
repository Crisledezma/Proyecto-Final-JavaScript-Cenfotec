import { ViewController } from "../viewController.js";

export class MenuViewController extends ViewController{

  constructor(appManager, parent){

    super(appManager, parent, 'Menu');

    this.mainContainer.className = 'menuViewController';
    this.mainContainer.classList.add('mainContainer');
    this.backBtn.hidden = true;
    this.title.style.margin = 'auto';

    this.contentContainer.classList.add('menuViewController_contentContainer');

    var textH1 = document.createElement('h1');
    textH1.innerHTML = 'Card Memory Game'
    this.contentContainer.appendChild(textH1);
    textH1.className = 'menuViewController_textH1';

    var textH2 = document.createElement('h2');
    textH2.innerHTML = 'Enter User Name to play'
    this.contentContainer.appendChild(textH2);
    textH2.className = 'menuViewController_textH2';

    this.userNameIn = document.createElement('input');
    this.contentContainer.appendChild(this.userNameIn);
    this.userNameIn.placeholder = 'User Name'
    this.userNameIn.className = 'menuViewController_userNameIn';

    var playBtn = document.createElement('button');
    this.contentContainer.appendChild(playBtn);
    playBtn.innerHTML = 'PLAY';
    playBtn.className = 'menuViewController_playBtn';
    
    var scoresBtn = document.createElement('button');
    this.contentContainer.appendChild(scoresBtn);
    scoresBtn.innerHTML = 'SCORES';
    scoresBtn.className = 'menuViewController_scoresBtn';

    playBtn.onclick = this.onPlayBtn.bind(this);

    scoresBtn.onclick = this.onScoresBtn.bind(this);

    this.contentContainer.style.transform = `translateX(-${window.innerWidth}px)`;

    this.menuIn();
  }

  menuIn() {
    const options = { x: '0px', duration: 0.5 };
    gsap.to(this.contentContainer, options);
  }

  menuOut() {
    const options = { x: `-${window.innerWidth}px`, duration: 0.5 };
    gsap.to(this.contentContainer, options);
  }

  onPlayBtn(){

    var username = this.userNameIn.value;

    if (username !== '') {
      
      this.menuOut();
      this.appManager.setUsername(username);
      window.setTimeout(() => {
        this.appManager.removeViewController(this);
        this.appManager.showGame();
      }, 500);

    }

  }

  onScoresBtn() {
    this.menuOut();
    this.appManager.showScores();
    window.setTimeout(() => {
      this.appManager.removeViewController(this);
    }, 500);
  }

  
}