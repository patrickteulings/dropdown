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
 TouchFlick responsive slider
 ---------------------------------------- */

const selects = document.querySelectorAll('[data-module="select"]');

for (let select of selects) {
  let mySelect = new Select(select);
  console.log(mySelect);
}
