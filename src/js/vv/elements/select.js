

import EventEmitter from 'events';

/**
  *
  * @todo - give correct parameters to event emitter
  * @todo - Open element on Tab focus or Tab-focus -> Enter key?
  *
  */

export default class Select extends EventEmitter{
  constructor (_el) {
    super();
    this.el = _el;

    this.config = {
      wrapperClass: '.js-dd--wrapper',
      triggerClass: '.js-dd__trigger',
      optionsClass: '.js-dd__options',
      optionClass: '.js-dd__option',
      preventLinks: false,
    }

    if(_el.dataset.config){
      Object.assign(this.config, JSON.parse(_el.dataset.config));
    }

    this.wrapper = this.el;
    this.trigger = this.el.querySelector(this.config.triggerClass);
    this.triggerNew = this.el.querySelector('.js-dd__trigger-new');
    this.options = this.el.querySelector(this.config.optionsClass);
    this.option = this.el.querySelectorAll(this.config.optionClass);
    this.activeOption;
    this.isActive = false;
    this.focusIndex = -1; // The element that has focus
    this.wrapperFocus = false // Whether the wrapper has (tab) focus or not
    this.initialize();
    this.addEvents();
  }


  /**
    *
    * @desc Sets out initial states
    * @param
    * @returns
    *
    */

  initialize() {
    if(this.el.querySelector('[data-selected="true"]')){
      this.activeOption = this.el.querySelector('[data-selected="true"]');
    }
    else{
      this.activeOption = this.option[0];
    }
    this.update();
  }


/**
  *
  * @desc Add all out event listeners needed
  * @param
  * @returns
  *
  */

  addEvents () {
    this.trigger.addEventListener('click', (e) => {
      this.toggleSelect()
    });

    for(let option of this.option){
      option.addEventListener('click', (e) => {
        this.setActiveOption(e);
      })

      option.addEventListener('mouseover', (e) => {
        this.setFocusIndex(e);
      })
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      this.onDocumentClick(e);
    });


    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 27 && this.isActive === true) this.closeSelect();
    });


    // Select focussed item with ENTER key if links are prevented
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 13 && this.isActive === true && this.config.preventLinks === true) {
        e.preventDefault();
        this.setActiveOption(e);
      };
    });


    // Select item with your UP/DOWN keys
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 40 && this.isActive === true) this.selectNextSibling(e);
      if(e.keyCode === 38 && this.isActive === true) this.selectPreviousSibling(e);

      // Element has focus but is not opened yet
      if(e.keyCode === 40 && this.isActive === false && this.wrapperFocus === true) {
        this.openSelect();
        this.resetFocusIndex();
      };
    });


    // Close on MouseLeave
    this.wrapper.addEventListener('mouseleave', (e) => {
      this.closeSelect();
    });


    // Receive focus on wrapper
    this.wrapper.addEventListener('focus', (e) => {
      this.wrapperFocus = true;
    });


    // Custom Blur Event / Hijacking Tab for blur
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 9 && this.isActive === true) {
        this.closeSelect();
      }
    });
  }


  /**
    *
    * @desc Sets the active option based on the focussed item
    * @param Event (mouseclick or ENTER)
    * @returns
    *
    */

  setActiveOption(e) {

    /* prevent linking depending on config*/
    if(this.config.preventLinks === true){
      e.preventDefault();
    }

    /* reset previous active items */
    for(let item of this.option){
      item.dataset.selected = "false";
    }

    /* set new active item */
    this.option[this.focusIndex].dataset.selected = "true";
    this.activeOption = this.option[this.focusIndex];
    this.update();
  }


  /**
    *
    * @desc Sets the (focus) index on mouseover
    * @param
    * @returns
    *
    */

  setFocusIndex(e) {
    let option = e.currentTarget;
    this.focusIndex = [...option.parentNode.children].indexOf(option);
    this.focusItem();
  }


  /**
    *
    * @desc Update the selected element and emit the changes
    * @param
    * @returns
    *
    */

  update() {
    this.trigger.innerHTML = this.activeOption.innerHTML;
    this.el.dataset.selectedValue = this.activeOption.dataset.value;
    this.closeSelect();
    this.emit('selectChanged', this, this.el.id, this.activeOption.dataset.value, 'some-val3');
  }


  /**
    *
    * @desc Open or close the select based on it's active state
    * @param
    * @returns
    *
    */

  toggleSelect() {
    (this.isActive) ? this.closeSelect() : this.openSelect();
  }

  openSelect() {
    this.options.setAttribute("aria-hidden","false");
    this.wrapper.setAttribute("aria-expanded","true");
    this.resetFocusIndex();
    this.isActive = true;
  }

  closeSelect() {
    this.options.setAttribute("aria-hidden","true");
    this.wrapper.setAttribute("aria-expanded","false");
    this.resetFocusIndex();
    this.isActive = false;
  }

  resetFocusIndex() {
    this.focusIndex = -1;
  }

  onDocumentClick(e) {
    if(!e.target.closest(this.config.wrapperClass)) {
      this.closeSelect();
    }
  }


  /**
    *
    * @desc Set the focus element with the arrow keys
    * @param
    * @returns
    *
    */

  selectNextSibling(e) {
    if(this.focusIndex >= (this.option.length - 1)) return;
    this.focusIndex += 1;

    // The selected item is hidden in our list, so skip it
    if(this.option[this.focusIndex].dataset.selected === "true"){
      this.focusIndex += 1;
    }
    this.focusItem();
  }

  selectPreviousSibling() {
    this.focusIndex -= 1;
    if(this.focusIndex === 0) {
      this.closeSelect();
      return;
    }
    this.focusItem();

  }

  /** sets the actual focus on the item */

  focusItem() {
    this.option[this.focusIndex].focus();
  }


  /**
    *
    * @desc Public function to get the selected item from outside this class
    * @param
    * @returns
    *
    */

  get currentSelectId() {
    return this.el.id;
  }

  get currentValue() {
    return this.activeOption.dataset.value
  }
}
