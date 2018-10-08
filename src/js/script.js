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
    console.log(`Get values with public methods; ElementID: ${el.currentSelectId}  - Selected value: ${el.currentValue}`);
    console.log(`Get values from EventEmitter; ElementID: ${elementID} - Selected Value ${elementValue}`);
  });
}
