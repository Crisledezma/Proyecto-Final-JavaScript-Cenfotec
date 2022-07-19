export class View {
  constructor(parent) {
    
    this.parent = parent;
    this.mainContainer = document.createElement('div');
    this.parent.appendChild(this.mainContainer);
  }
}