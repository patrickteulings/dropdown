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

import Select from './vv/elements/Select';

/** ----------------------------------------
 a11Y enabled Custom Select box
 ---------------------------------------- */

const selects = document.querySelectorAll('[data-module="select"]');

for (let select of selects) {
  let mySelect = new Select(select);

  mySelect.on('selectChanged', function listener (el, elementID, elementValue) {
    console.log(`The changed selectbox: ${el.currentSelectId}  - now has value: ${el.currentValue}`);
    console.log(elementID, elementValue);
  });
}
