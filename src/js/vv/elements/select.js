

import EventEmitter from 'events';

export default class Select extends EventEmitter{
  constructor (_el) {
    super();
    this.el = _el;
    this.start = 0;
    this.isPanning = false;
    this.index = 0;
    this.distanceX = 0;
    this.currentX = 0;
    this.distanceX = 0;    

    this.config = {
      thumbItem: '.touchflick-thumbs__item',
      buttonPrev: '.touchflick-buttons__item--prev',
      buttonNext: '.touchflick-buttons__item--next',
      activeClass: 'is-active',
      disabledClass: 'is-disabled',
      threshold: 25
    }
    if(_el.dataset.config){
      Object.assign(this.config, JSON.parse(_el.dataset.config));
    }
    this.trigger = this.el.querySelector('.dd__trigger');
    this.options = this.el.querySelector('.dd__options');
    this.option = this.el.querySelectorAll('.dd__option');
    this.activeOption;
    this.isActive = false;
    this.initialize();
    this.addEvents();    
  }


  // Get's all options and selected state
  initialize() {
    this.getActiveOption();
  }


  getActiveOption() {
    if(this.el.querySelector('[data-selected="true"]')){
      this.activeOption = this.el.querySelector('[data-selected="true"]');
    }
    else{
      this.activeOption = this.option[0];
    }
    this.update();
  }

  // Resets all values and gets selected option
  setActiveOption(e) {
    for(let item of this.option){
      item.dataset.selected = "false";
    }
    e.currentTarget.dataset.selected = "true";
    this.activeOption = e.currentTarget;
    this.update();
  }


  // Updates our selected variables and view

  update() {    
    this.trigger.innerHTML = this.activeOption.dataset.value;    
    this.el.dataset.selectedValue = this.activeOption.dataset.value;
    this.closeSelect();
    this.emit('some-event', 'some-val1', 'some-val2', 'some-val3');
  }

  // ******************
  // You guessid it
  // ******************

  addEvents () {
    this.trigger.addEventListener('click', (e) => {
      this.toggleSelect()
    });

    for(let option of this.option){
      option.addEventListener('click', (e) => {
        this.setActiveOption(e);                
      })
    }

    document.addEventListener('click', (e) => {
      this.onDocumentClick(e);
    })
  }


  // Open or close

  toggleSelect() {
    (this.isActive) ? this.closeSelect() : this.openSelect();
  }

  openSelect() {
    this.options.setAttribute("aria-hidden","false");
    this.isActive = true;
  }

  closeSelect() {
    this.options.setAttribute("aria-hidden","true");
    this.isActive = false;
  }

  onDocumentClick(e) {    
    if(!e.target.closest('.dd--wrapper')) {
      this.closeSelect();
    }
  }
}
