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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elements_Dropdown__ = __webpack_require__(2);
/**
 *
 * Patrick Teulings © 1978-2018
 *
 * Hi, hello!
 *
 * This is our main Javscript file.
 *
 * Let's go and may the wind be always at your back!
 *
 * https://www.patrickteulings.nl
 */

/** Imports */


/** ----------------------------------------
 a11Y enabled Custom Select box
 ---------------------------------------- */

const dropdowns = document.querySelectorAll('[data-module="select"]');

for (let dropdown of dropdowns) {

  dropdown = new __WEBPACK_IMPORTED_MODULE_0__elements_Dropdown__["a" /* default */](dropdown);

  dropdown.on('selectChanged', function listener(el, elementID, elementValue) {
    console.log(`Get values with public methods; ElementID: ${el.currentSelectId}  - Selected value: ${el.currentValue}`);
    console.log(`Get values from EventEmitter; ElementID: ${elementID} - Selected value: ${elementValue}`);
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);
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



class Select extends __WEBPACK_IMPORTED_MODULE_0_events___default.a {
  constructor(_el) {
    super();
    this.el = _el;

    this.config = {
      selectWrapperClass: '.js-dd--wrapper',
      triggerClass: '.js-dd__trigger',
      optionsWrapperClass: '.js-dd__options',
      optionsClass: '.js-dd__options',
      preventLinks: false

      /** Extends our defaults with new classnames (data-config) if desired */

    };if (_el.dataset.config) {
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
    this.focusIndex = -1; // The element that has focus
    this.wrapperFocus = false; // Whether the wrapper has (tab) focus or not

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
    if (this.el.querySelector('[data-selected="true"]')) {
      this.activeOption = this.el.querySelector('[data-selected="true"]');
    } else {
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

  addEvents() {
    this.trigger.addEventListener('click', e => {
      this.toggleSelect();
    });

    for (let option of this.options) {
      option.addEventListener('click', e => {
        this.setActiveOption(e);
      });

      option.addEventListener('mouseover', e => {
        this.setFocusIndex(e);
      });
    }

    // Close on outside click
    document.addEventListener('click', e => {
      this.onDocumentClick(e);
    });

    // Close on ESC key
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27 && this.isActive === true) this.closeSelect();
    });

    // Select focussed item with ENTER key if links are prevented
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && this.isActive === true && this.config.preventLinks === true) {
        e.preventDefault();
        this.setActiveOption(e);
      };
    });

    // Select item with your UP/DOWN keys
    document.addEventListener('keyup', e => {
      if (e.keyCode === 40 && this.isActive === true) this.selectNextSibling(e);
      if (e.keyCode === 38 && this.isActive === true) this.selectPreviousSibling(e);

      // Element has focus but is not opened yet
      if (e.keyCode === 40 && this.isActive === false && this.wrapperFocus === true) {
        this.openSelect();
        this.resetFocusIndex();
      };
    });

    // Close on MouseLeave
    this.selectWrapper.addEventListener('mouseleave', e => {
      this.closeSelect();
    });

    // Receive focus on wrapper
    this.selectWrapper.addEventListener('focus', e => {
      this.wrapperFocus = true;
    });

    // Custom Blur Event / Hijacking Tab for blur
    document.addEventListener('keyup', e => {
      if (e.keyCode === 9 && this.isActive === true) {
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
    if (this.config.preventLinks === true) {
      e.preventDefault();
    }

    /* reset previous active items */
    for (let item of this.options) {
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
    this.isActive === true ? this.closeSelect() : this.openSelect();
  }

  openSelect() {
    this.optionsWrapper.setAttribute("aria-hidden", "false");
    this.selectWrapper.setAttribute("aria-expanded", "true");
    this.resetFocusIndex();
    this.isActive = true;
  }

  closeSelect() {
    this.optionsWrapper.setAttribute("aria-hidden", "true");
    this.selectWrapper.setAttribute("aria-expanded", "false");
    this.resetFocusIndex();
    this.isActive = false;
  }

  resetFocusIndex() {
    this.focusIndex = -1;
  }

  onDocumentClick(e) {
    if (!e.target.closest(this.config.selectWrapperClass)) {
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
    if (this.focusIndex >= this.options.length - 1) return;
    this.focusIndex += 1;

    // The selected item is hidden in our list, so skip it
    if (this.options[this.focusIndex].dataset.selected === "true") {
      this.focusIndex += 1;
    }

    this.focusItem();
  }

  selectPreviousSibling() {
    this.focusIndex -= 1;
    if (this.focusIndex === 0) {
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
    return this.activeOption.dataset.value;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Select;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map