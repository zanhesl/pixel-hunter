
export const state = {
  level: 0,
  lives: 3,
  results: []
};

export const stats = [
  {
    userName: `One`,
    results: [
      `wrong`,
      `slow`,
      `fast`,
      `correct`,
      `wrong`,
      `unknown`,
      `slow`,
      `unknown`,
      `fast`,
      `unknown`
    ]
  }, {
    userName: `Two`,
    results: [
      `wrong`,
      `slow`,
      `fast`,
      `correct`,
      `wrong`,
      `unknown`,
      `slow`,
      `wrong`,
      `fast`,
      `wrong`
    ]
  }, {
    userName: `Tree`,
    results: [
      `wrong`,
      `fast`,
      `fast`,
      `correct`,
      `wrong`,
      `unknown`,
      `slow`,
      `wrong`,
      `slow`,
      `slow`
    ]
  }, {
    userName: `Four`,
    results: [
      `correct`,
      `fast`,
      `correct`,
      `correct`,
      `fast`,
      `correct`,
      `correct`,
      `slow`,
      `correct`,
      `correct`
    ]
  }
];

export const levels = [
  {
    template: `game-1`,
    options: [{
      img: `http://placehold.it/468x458`,
      answer: `photo`
    }, {
      img: `http://placehold.it/468x458`,
      answer: `paint`
    }]
  }, {
    template: `game-1`,
    options: [{
      img: `http://placehold.it/468x458`,
      answer: `photo`
    }, {
      img: `http://placehold.it/468x458`,
      answer: `paint`
    }]
  }, {
    template: `game-2`,
    options: [{
      img: `http://placehold.it/705x455`,
      answer: `photo`
    }]
  }, {
    template: `game-2`,
    options: [{
      img: `http://placehold.it/705x455`,
      answer: `photo`
    }]
  }, {
    template: `game-3`,
    options: [{
      img: `http://placehold.it/304x455`,
      answer: `photo`
    }, {
      img: `http://placehold.it/304x455`,
      answer: `paint`
    }, {
      img: `http://placehold.it/304x455`,
      answer: `photo`
    }]
  }
];
