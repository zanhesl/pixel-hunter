// import {assert} from 'chai';
// import {header} from './header.js';
//
// const FULL_LIVES_TIME = `<header class="header">
// <div class="header__back">
//   <span class="back">
//     <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
//     <img src="img/logo_small.png" width="101" height="44">
//   </span>
// </div>
// <h1 class="game__timer">100</h1>
// <div class="game__lives">
//   <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
//   <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
//   <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
// </div>
// </header>`;
//
// const ONE_LIVE_TIME = `<header class="header">
// <div class="header__back">
//   <span class="back">
//     <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
//     <img src="img/logo_small.png" width="101" height="44">
//   </span>
// </div>
// <h1 class="game__timer">50</h1>
// <div class="game__lives">
//   <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
//   <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
//   <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
// </div>
// </header>`;
//
// describe(`Header function`, () => {
//   it(`should return correct amount of full lives and time`, () => {
//     assert.equal(FULL_LIVES_TIME, header(4, 100));
//     assert.equal(ONE_LIVE_TIME, header(1, 50));
//   });
// });
