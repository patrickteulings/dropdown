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
import Dropdown from './elements/Dropdown';

/** ----------------------------------------
 a11Y enabled Custom Select box
 ---------------------------------------- */

const dropdowns = document.querySelectorAll('[data-module="select"]');

for (let dropdown of dropdowns) {

  dropdown = new Dropdown(dropdown);

  dropdown.on('selectChanged', function listener (el, elementID, elementValue) {
    console.log(`Get values with public methods; ElementID: ${el.currentSelectId}  - Selected value: ${el.currentValue}`);
    console.log(`Get values from EventEmitter; ElementID: ${elementID} - Selected value: ${elementValue}`);
  });
}
