/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vv_elements_Select__ = __webpack_require__(2);
/**
 *
 * Patrick Teulings © 1978-2018
 *
 * Hi, welcome!
 *
 * This is the main Javscript file.
 * One script to rule them all!
 * Let's go and godspeed you!
 *
 */



/** ----------------------------------------
 TouchFlick responsive slider
 ---------------------------------------- */

const selects = document.querySelectorAll('[data-module="select"]');

for (let select of selects) {
  let mySelect = new __WEBPACK_IMPORTED_MODULE_0__vv_elements_Select__["a" /* default */](select);
  console.log(mySelect);
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Select {
  constructor(_el) {
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
    };
    if (_el.dataset.config) {
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
    if (this.el.querySelector('[data-selected="true"]')) {
      this.activeOption = this.el.querySelector('[data-selected="true"]');
    } else {
      this.activeOption = this.option[0];
    }
    this.update();
  }

  // Resets all values and gets selected option
  setActiveOption(e) {
    for (let item of this.option) {
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

  addEvents() {
    this.trigger.addEventListener('click', e => {
      this.toggleSelect();
    });

    for (let option of this.option) {
      option.addEventListener('click', e => {
        this.setActiveOption(e);
      });
    }

    document.addEventListener('click', e => {
      this.onDocumentClick(e);
    });
  }

  // Open or close

  toggleSelect() {
    this.isActive ? this.closeSelect() : this.openSelect();
  }

  openSelect() {
    this.options.setAttribute("aria-hidden", "false");
    this.isActive = true;
  }

  closeSelect() {
    this.options.setAttribute("aria-hidden", "true");
    this.isActive = false;
  }

  onDocumentClick(e) {
    if (!e.target.closest('.dd--wrapper')) {
      this.closeSelect();
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Select;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map