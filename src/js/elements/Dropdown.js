/**
  *
  * @desc A a11Y custom dropdown selector
  * @author Patrick Teulings
  *
  * https://github.com/patrickteulings/dropdown/
  *
  */

/**
  *
  * @desc Uses eventEmitter for dispachting values
  * You can also get the values with getter and
  * Skip the Event Emitter
  *
  */

import EventEmitter from 'events';


export default class Select extends EventEmitter{
  constructor (_el) {
    super();
    this.el = _el;

    this.config = {
      selectWrapperClass: '.js-dd--wrapper',
      triggerClass: '.js-dd__trigger',
      optionsWrapperClass: '.js-dd__options',
      optionsClass: '.js-dd__options',
      preventLinks: false,
    }

    /** Extends our defaults with new classnames (data-config) if desired */

    if(_el.dataset.config){
      Object.assign(this.config, JSON.parse(_el.dataset.config));
    }

    /** DOM elements */
    this.selectWrapper = this.el;
    this.trigger = this.el.querySelector(this.config.triggerClass);
    this.optionsWrapper = this.el.querySelector(this.config.optionsWrapperClass);
    this.options = this.el.querySelectorAll(this.config.optionsClass);

    /** Active state variables */
    this.activeOption;
    this.isActive = false;
    this.focusIndex = 0; // The element that has focus
    this.wrapperFocus = false // Whether the wrapper has (tab) focus or not

    /** Off we go... */
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
      this.activeOption = this.options[0];
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
      this.toggleSelect();
    });

    for(let option of this.options){
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
    this.selectWrapper.addEventListener('mouseleave', (e) => {
      this.closeSelect();
    });


    // Receive focus on wrapper
    this.selectWrapper.addEventListener('focus', (e) => {
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
    for(let item of this.options){
      item.dataset.selected = "false";
    }

    /* set new active item */
    this.options[this.focusIndex].dataset.selected = "true";
    this.activeOption = this.options[this.focusIndex];
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
    (this.isActive === true) ? this.closeSelect() : this.openSelect();
  }

  openSelect() {
    this.optionsWrapper.setAttribute("aria-hidden","false");
    this.selectWrapper.setAttribute("aria-expanded","true");
    this.resetFocusIndex();
    this.isActive = true;
  }

  closeSelect() {
    this.optionsWrapper.setAttribute("aria-hidden","true");
    this.selectWrapper.setAttribute("aria-expanded","false");
    this.resetFocusIndex();
    this.isActive = false;
  }

  resetFocusIndex() {
    this.focusIndex = 0;
  }

  onDocumentClick(e) {
    if(!e.target.closest(this.config.selectWrapperClass)) {
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
    if(this.focusIndex >= (this.options.length - 1)) return;
    this.focusIndex += 1;

    // The selected item is hidden in our list, so skip it
    if(this.options[this.focusIndex].dataset.selected === "true"){
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
    this.options[this.focusIndex].focus();
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
