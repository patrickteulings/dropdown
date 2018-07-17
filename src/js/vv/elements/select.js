

export default class Select {
  constructor (_el) {
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

    return;
    this.el = document.querySelector('.js-hammer');
    this.wrapper = document.querySelector('.touchflick__inner--wrap');    

    this.nrSlides = this.el.querySelectorAll('.touchflick__item').length;
    this.thumbs = this.el.querySelectorAll(this.config.thumbItem);
    
    this.buttonPrev = this.el.querySelector(this.config.buttonPrev);    
    this.buttonNext = this.el.querySelector(this.config.buttonNext);
    this.wrapper.style.transform = 'translateX(0px)';
    this.animationFrame = 0;
    
    this.setNavigation();
    
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
    console.log(e.target);
    if(!e.target.closest('.dd--wrapper')) {
      this.closeSelect();
    }
  }

  // Calculate the current position the slider contents have
  onPanStart () {
    this.currentX = 0;
    let transformStyle = this.wrapper.style.transform;
    var regex = /[+-]?\d+(?:\.\d+)?/g;
    let test = regex.exec(transformStyle)
    this.start = test[0];
    this.isPanning = true;
  }

  // Body moving!
  onPan (ev) {
    let percentage = (ev.deltaX / this.wrapper.clientWidth) * 100;
    let position = Number(this.start) + Number(percentage);
    this.wrapper.style.transform = `translateX(${position}%)`;
    this.currentX = position;
  }

  // And release, now scroll!
  onPanEnd (ev) {
    this.isPanning = false;
    let percentage = (ev.deltaX / this.wrapper.clientWidth) * 100;

    if (percentage > this.config.threshold && ev.deltaX > 0) {      
      this.index = (this.index === 0) ? 0 : this.index - 1;
    }
    if (percentage < -(this.config.threshold) && ev.deltaX < 0) {
      this.index = (this.index === this.nrSlides - 1) ? (this.nrSlides - 1) : this.index + 1;
    }

    this.animate();
    this.setNavigation();
  }

  // Our requestAnimationFrame function
  animate () {
    this.distanceX = (-(this.index * 100)) - (this.currentX);

    let translateX = (this.distanceX === 0) ? this.currentX : ((this.currentX + (this.distanceX / 9)));

    if (Math.abs(this.distanceX) < 0.2) {
      this.animationFrame = null;
      this.wrapper.style.transform = `translateX(-${this.index * 100}%)`;      
    } else {
      this.animationFrame = window.requestAnimationFrame(() => { this.animate() });
      this.wrapper.style.transform = `translateX(${translateX}%)`;
      this.wrapper.dataset.test = translateX;
      this.currentX = translateX;
    }
  }

  // Scroll to a new index
  onIndexClick (_index) {    
    this.index = (this.index <= -1) ? 0 : this.index - 1;
    this.index = (this.index >= this.nrSlides - 1) ? (this.nrSlides - 1) : this.index + 1;
    this.animate();
    this.setNavigation();
  }

  // Click on potential thumbs
  onThumbClick (e) {
    for(let [index, thumb] of this.thumbs.entries()){
      if (thumb === e.target) this.index = index;
    }

    this.animate();
    this.setNavigation();
  }

  // Check possible active states
  setNavigation () {    
    if(this.thumbs){
      for(let [index, thumb] of this.thumbs.entries()){
        if(this.index === index){          
          thumb.classList.add(this.config.activeClass);    
        }
        else{
          thumb.classList.remove(this.config.activeClass);
        } 
      }
    }

    // set active prev/next
    if( this.buttonPrev && this.buttonNext){
      (this.index <= 0 && this.buttonPrev) ? this.buttonPrev.classList.add(this.config.disabledClass) : this.buttonPrev.classList.remove(this.config.disabledClass);
      (this.index === this.nrSlides - 1 && this.buttonNext) ? this.buttonNext.classList.add(this.config.disabledClass) : this.buttonNext.classList.remove(this.config.disabledClass);
    }  
  }
}
