import { ViewController } from "../viewController.js";
import { ScoresService } from "./scoresService.js";

export class ScoresViewController extends ViewController{

  constructor(appManager, parent){

    super(appManager, parent, 'Scores');

    this.service = new ScoresService(this);
    this.mainContainer.classList.add('scoresViewController');
    this.mainContainer.classList.add('mainContainer');

    this.service.getScores();

    this.backBtn.onclick = this.onback.bind(this);

    this.contentContainer.className = 'scoresViewController_contentContainer';

    this.scoreTbl = document.createElement('table');
    this.contentContainer.appendChild(this.scoreTbl);
    this.scoreTbl.className = 'scoresViewController_scoresTable';

    this.tr = document.createElement('tr');
    this.scoreTbl.appendChild(this.tr);

    this.th = document.createElement('th');
    this.th.innerHTML = 'Username';
    this.tr.appendChild(this.th);

    this.th = document.createElement('th');
    this.th.innerHTML = 'Clicks';
    this.tr.appendChild(this.th);

    this.th = document.createElement('th');
    this.th.innerHTML = 'Time';
    this.tr.appendChild(this.th);

    this.th = document.createElement('th');
    this.th.innerHTML = 'Score';
    this.tr.appendChild(this.th);

    
  }
  
  start(scores) {
    scores.forEach(score => {
      var dataRow = document.createElement('tr');
      this.scoreTbl.appendChild(dataRow);

      var tdUser = document.createElement('td');
      tdUser.innerHTML = score.username;
      dataRow.appendChild(tdUser);

      var tdClicks = document.createElement('td');
      tdClicks.innerHTML = score.clicks;
      dataRow.appendChild(tdClicks);

      var tdTime = document.createElement('td');
      tdTime.innerHTML = score.time;
      dataRow.appendChild(tdTime);

      var tdScore = document.createElement('td');
      tdScore.innerHTML = score.score;
      dataRow.appendChild(tdScore);
    })
    
  }

  show(){

  }

  hide(){
    
  }

  onback() {
    this.remove(this);
    this.appManager.newMenu();
  }

}