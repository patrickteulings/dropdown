

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
      wrapperClass: '.js-dd--wrapper',
      triggerClass: '.js-dd__trigger',
      optionsClass: '.js-dd__options',
      optionClass: '.js-dd__option',      
    }

    if(_el.dataset.config){
      Object.assign(this.config, JSON.parse(_el.dataset.config));
    }

    this.trigger = this.el.querySelector(this.config.triggerClass);
    this.options = this.el.querySelector(this.config.optionsClass);
    this.option = this.el.querySelectorAll(this.config.optionClass);
    this.activeOption;
    this.isActive = false;
    this.initialize();
    this.addEvents();    
  }


  // Selected inital selected state
  initialize() {
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
    this.emit(this.el.dataset.selectId, this, 'some-val2', 'some-val3');
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

    // Close on outside click
    document.addEventListener('click', (e) => {
      this.onDocumentClick(e);
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 27 && this.isActive === true) this.closeSelect();
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
    if(!e.target.closest(this.config.wrapperClass)) {
      this.closeSelect();
    }
  }

  // Getters

  get currentSelectId() {
    return this.el.id;
  }

  get currentValue() {
    return this.activeOption.dataset.value
  }
}
