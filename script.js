const QUESTION_COUNT = 10;
const MAX_HEALTH = 100;
const START_HEALTH = 78;
const SAFE_ENDING_THRESHOLD = 80;
const FINALE_SUCCESS_THRESHOLD = 92;
const VERY_GOOD_ANSWER_SCORE = 10;
const GREAT_ANSWER_WORLD_PULSE_MS = 1500;
const GREAT_ANSWER_CELEBRATION_MS = 2200;

const categoryMeta = {
  transport: {
    achievement: "Eco Traveler",
    strength: "Your transport choices gave nature a real boost.",
    improve: "Try walking, biking, or using public transport more often."
  },
  food: {
    achievement: "Green Plate",
    strength: "Your food choices gave the flower more strength.",
    improve: "A little more plant-based food would improve your impact."
  },
  water: {
    achievement: "Water Saver",
    strength: "You protect water well in your everyday habits.",
    improve: "Shorter showers and more mindful water use would help a lot."
  },
  waste: {
    achievement: "Recycling Friend",
    strength: "Your waste habits gave the flower meaningful support.",
    improve: "Sorting trash and disposing of waste properly could improve your result a lot."
  },
  energy: {
    achievement: "Energy Hero",
    strength: "You do a good job cutting unnecessary energy use.",
    improve: "Be more careful with lights, chargers, and heating to reduce your impact."
  },
  shopping: {
    achievement: "Thoughtful Shopper",
    strength: "Your shopping habits were more mindful and eco-friendly.",
    improve: "Buy less often, choose second-hand, or borrow things when you can."
  },
  foodWaste: {
    achievement: "Food Saver",
    strength: "You do a good job avoiding unnecessary food waste.",
    improve: "Planning portions and saving leftovers would help even more."
  },
  plastic: {
    achievement: "Reusable Pro",
    strength: "You reduce single-use plastic well.",
    improve: "Reusable bottles and bags could improve your result a lot."
  },
  laundry: {
    achievement: "Smart Laundry",
    strength: "Your laundry habits saved both water and energy.",
    improve: "Full loads and lower temperatures would make an even better impact."
  },
  electronics: {
    achievement: "Long-Life Tech",
    strength: "You are good at helping devices last longer.",
    improve: "Repairing and using electronics longer would reduce e-waste."
  },
  printing: {
    achievement: "Digital Thinker",
    strength: "Printing less means fewer resources are wasted.",
    improve: "Try printing less and using digital notes more often."
  },
  heating: {
    achievement: "Warm Balance",
    strength: "You manage heating thoughtfully at home.",
    improve: "Before turning the heat up a lot, try simpler ways to stay warm."
  },
  seasonalFood: {
    achievement: "Seasonal Choice",
    strength: "Seasonal and local food gave nature a little more breathing room.",
    improve: "Choose seasonal or local food more often when possible."
  }
};

const questionBank = [
  {
    category: "transport",
    question: "How do you usually get to a place nearby?",
    answers: [
      { text: "I walk or ride a bike.", score: 12, tip: "Great choice. Walking and biking create almost no emissions." },
      { text: "I use public transport.", score: 6, tip: "That is a good choice. Public transport lowers emissions per person." },
      { text: "I drive a car alone.", score: -10, tip: "Driving alone creates more pollution. When possible, choose walking, biking, or sharing a ride." }
    ]
  },
  {
    category: "food",
    question: "What kind of lunch sounds most like your normal choice?",
    answers: [
      { text: "Mostly plant-based food.", score: 10, tip: "Great choice. Plant-based meals often have a lower environmental impact." },
      { text: "A mix of vegetables and meat.", score: 3, tip: "Not bad. Gradually adding more plant-based meals would make your result even better." },
      { text: "A lot of meat almost every day.", score: -9, tip: "Frequent meat-heavy meals have a larger environmental footprint. Even a small reduction helps." }
    ]
  },
  {
    category: "water",
    question: "How long is your shower most of the time?",
    answers: [
      { text: "Around 5 minutes.", score: 11, tip: "Excellent. A short shower saves both water and energy." },
      { text: "About 10 minutes.", score: 2, tip: "That is okay, but shaving off a few minutes would make a noticeable difference." },
      { text: "More than 15 minutes.", score: -10, tip: "A long shower uses a lot of water and energy. Even a few minutes less would help." }
    ]
  },
  {
    category: "waste",
    question: "What do you usually do with plastic, paper, and glass?",
    answers: [
      { text: "I sort it carefully and recycle it.", score: 10, tip: "Excellent. Sorting helps materials get a second life." },
      { text: "I recycle sometimes, but not always.", score: 2, tip: "A good start. Consistency makes a much bigger difference here." },
      { text: "I throw it all away together.", score: -9, tip: "When everything gets mixed, it becomes harder to recycle. Sorting is one of the easiest habits to improve." }
    ]
  },
  {
    category: "energy",
    question: "How often do you leave lights or chargers on when you do not need them?",
    answers: [
      { text: "Almost never.", score: 10, tip: "Great. Less wasted energy means less impact on the environment." },
      { text: "I forget sometimes.", score: 1, tip: "That happens. A small habit of checking before you leave already helps." },
      { text: "Very often.", score: -8, tip: "Even unused lights and chargers still create impact. Turning them off is a simple but powerful habit." }
    ]
  },
  {
    category: "shopping",
    question: "How often do you buy new clothes just because you want something new?",
    answers: [
      { text: "Only when I really need them.", score: 9, tip: "Very good. Buying less means less waste, less water use, and fewer production emissions." },
      { text: "Sometimes because of trends.", score: 1, tip: "That is already better than constant shopping. Rewearing and swapping clothes can help even more." },
      { text: "Very often, even without needing them.", score: -9, tip: "Fast fashion has a big environmental footprint. Buying less is a really strong step." }
    ]
  },
  {
    category: "foodWaste",
    question: "What happens to leftovers at home?",
    answers: [
      { text: "We save them or eat them later.", score: 8, tip: "Great. Less food waste means fewer wasted resources." },
      { text: "Sometimes we save them, sometimes we throw them away.", score: 1, tip: "That is already a step forward. Planning portions could reduce waste even more." },
      { text: "Most of them get thrown away.", score: -8, tip: "Food waste has a big impact. Even the habit of saving leftovers already helps." }
    ]
  },
  {
    category: "plastic",
    question: "How do you usually carry your shopping?",
    answers: [
      { text: "I bring a reusable bag.", score: 8, tip: "Nice. Reusable bags greatly reduce single-use plastic." },
      { text: "I sometimes reuse old store bags.", score: 2, tip: "Reusing bags is already better than taking new ones every time." },
      { text: "I take new plastic bags each time.", score: -7, tip: "Single-use bags create waste very quickly. A reusable bag is an easy replacement." }
    ]
  },
  {
    category: "plastic",
    question: "What do you usually drink from during the day?",
    answers: [
      { text: "A reusable bottle or cup.", score: 8, tip: "Excellent. This helps you reduce single-use plastic every day." },
      { text: "Sometimes reusable, sometimes disposable.", score: 1, tip: "Not bad. Choosing reusable a little more often would improve your impact." },
      { text: "Mostly single-use plastic bottles.", score: -8, tip: "Single-use bottles create a lot of waste. A reusable bottle is one of the easiest helpful habits." }
    ]
  },
  {
    category: "laundry",
    question: "How do you usually wash your clothes?",
    answers: [
      { text: "Full loads, often at a lower temperature.", score: 9, tip: "Excellent. That saves both water and electricity." },
      { text: "I wash clothes without thinking much about the settings.", score: 1, tip: "A little more attention to temperature and full loads would already help." },
      { text: "Small loads at high temperatures very often.", score: -8, tip: "That kind of laundry uses more water and energy than necessary." }
    ]
  },
  {
    category: "electronics",
    question: "What happens when your phone or laptop gets older?",
    answers: [
      { text: "I keep using it longer or repair it if possible.", score: 10, tip: "Excellent. Repairing and keeping devices longer reduces electronic waste." },
      { text: "I replace it sometimes, but not too often.", score: 2, tip: "That is already good. Using devices even longer would lower the hidden impact more." },
      { text: "I replace it quickly with a new model.", score: -9, tip: "Frequent upgrades increase e-waste and production emissions. Using devices longer is much better." }
    ]
  },
  {
    category: "printing",
    question: "How do you usually print school or work materials?",
    answers: [
      { text: "Only when necessary, often double-sided.", score: 8, tip: "Great. Printing less and using both sides saves paper and energy." },
      { text: "Sometimes digital, sometimes printed.", score: 2, tip: "A decent balance. Using digital formats a little more would reduce the impact further." },
      { text: "I print a lot even when I do not need to.", score: -7, tip: "Unnecessary printing wastes paper, ink, and energy. Digital notes can help." }
    ]
  },
  {
    category: "waste",
    question: "What do you do with old batteries or small electronics?",
    answers: [
      { text: "I take them to a proper collection point.", score: 10, tip: "Perfect. These items need proper disposal so they do not harm nature." },
      { text: "I am not always sure where to take them.", score: 0, tip: "It is worth finding the nearest collection point. Batteries definitely should not go into regular trash." },
      { text: "I throw them into the normal garbage.", score: -10, tip: "Batteries and electronics can release harmful materials. They need separate disposal." }
    ]
  },
  {
    category: "heating",
    question: "When a room feels cold, what do you usually do first?",
    answers: [
      { text: "I put on warmer clothes or use a blanket.", score: 7, tip: "Smart. That can reduce unnecessary heating." },
      { text: "I turn the heat up a little.", score: 1, tip: "Sometimes that is okay, but it is even better to try simple ways to warm up first." },
      { text: "I turn the heating up a lot right away.", score: -7, tip: "Heating uses a lot of energy. Small changes before that can help a lot." }
    ]
  },
  {
    category: "seasonalFood",
    question: "How do you usually buy fruits and vegetables?",
    answers: [
      { text: "Mostly seasonal or local when possible.", score: 9, tip: "Great choice. Seasonal and local food often needs fewer resources." },
      { text: "A mix of seasonal and imported food.", score: 2, tip: "Not bad. Choosing seasonal food a little more often would improve the result." },
      { text: "Mostly imported items without thinking about the season.", score: -6, tip: "Seasonal food often has a smaller environmental footprint." }
    ]
  },
  {
    category: "water",
    question: "How careful are you with water when brushing your teeth or washing dishes?",
    answers: [
      { text: "I turn the water off when I do not need it.", score: 8, tip: "Excellent. Small habits like this add up to a big effect." },
      { text: "Sometimes I remember, sometimes I do not.", score: 1, tip: "That is already a start. Being more consistent could save much more water." },
      { text: "The water usually runs the whole time.", score: -8, tip: "Running water continuously wastes a lot. Turning it off between steps is a very helpful habit." }
    ]
  },
  {
    category: "shopping",
    question: "What do you usually do before buying something new for home or a hobby?",
    answers: [
      { text: "I check whether I can borrow it, reuse something, or buy second-hand.", score: 9, tip: "Fantastic. Second-hand choices and reuse reduce waste and resource use." },
      { text: "I sometimes look at used options.", score: 2, tip: "That is already a good approach. Checking those options more often would reduce your impact further." },
      { text: "I buy everything brand new right away.", score: -8, tip: "Buying new all the time creates more production waste. Reuse is often a great alternative." }
    ]
  },
  {
    category: "transport",
    question: "If you are going somewhere with friends, what sounds most like your choice?",
    answers: [
      { text: "We walk, bike, or share one ride.", score: 9, tip: "Nice. Sharing transport or avoiding a car entirely lowers emissions a lot." },
      { text: "It depends, but we sometimes share a ride.", score: 2, tip: "That already helps. Choosing shared transport more often would make an even bigger difference." },
      { text: "Everyone usually goes separately by car.", score: -8, tip: "Several separate cars create much more pollution than sharing one ride." }
    ]
  },
  {
    category: "energy",
    question: "What do you usually do with a laptop, console, or TV when you are done using it?",
    answers: [
      { text: "I turn it off fully when I can.", score: 8, tip: "Great habit. Fully switching devices off can cut unnecessary standby energy." },
      { text: "I often leave it in sleep mode.", score: 1, tip: "Sleep mode is better than leaving everything fully active, but turning devices off still saves more energy." },
      { text: "I often leave it running for a long time.", score: -8, tip: "Leaving devices on when you are not using them wastes electricity for no good reason." }
    ]
  },
  {
    category: "laundry",
    question: "How do you usually dry clothes after washing them?",
    answers: [
      { text: "I air-dry them most of the time.", score: 9, tip: "Excellent. Air-drying saves a surprising amount of energy." },
      { text: "I mix air-drying and using a dryer.", score: 2, tip: "That is already better than always using a dryer. Air-drying more often would improve your impact." },
      { text: "I almost always use a dryer.", score: -7, tip: "Dryers use a lot of electricity. When possible, air-drying is the kinder option for nature." }
    ]
  },
  {
    category: "foodWaste",
    question: "What usually happens to fruit peels or food scraps at home?",
    answers: [
      { text: "We compost them or separate them if possible.", score: 8, tip: "Great. Composting or separating food scraps helps reduce waste." },
      { text: "We throw them away, but only a small amount.", score: 1, tip: "That is still manageable, but composting would be an even better step." },
      { text: "A lot of food scraps go into mixed trash.", score: -7, tip: "Food scraps in mixed trash create unnecessary waste. Composting or separating them helps a lot." }
    ]
  },
  {
    category: "plastic",
    question: "How do you usually choose fruits and vegetables in a store?",
    answers: [
      { text: "I choose loose produce or use a reusable produce bag.", score: 8, tip: "Nice. That avoids a lot of extra plastic packaging." },
      { text: "I buy a mix of loose and packaged produce.", score: 2, tip: "A balanced start. Choosing loose produce more often would cut waste further." },
      { text: "I mostly buy produce wrapped in plastic.", score: -7, tip: "Extra packaging creates avoidable waste. Loose produce is often the better choice." }
    ]
  },
  {
    category: "water",
    question: "When washing a few dishes by hand, what sounds most like your habit?",
    answers: [
      { text: "I use a basin or turn the water on only when needed.", score: 8, tip: "Excellent. This saves far more water than letting the tap run the whole time." },
      { text: "I try to be careful, but not always.", score: 1, tip: "That is a good start. A little more consistency would save even more water." },
      { text: "The tap usually runs the whole time.", score: -8, tip: "Running water the whole time wastes much more than most people realize." }
    ]
  },
  {
    category: "heating",
    question: "If the room gets too warm while the heat is on, what do you usually do?",
    answers: [
      { text: "I lower the heat first and air the room briefly if needed.", score: 8, tip: "Smart move. Adjusting heating first avoids wasting energy." },
      { text: "Sometimes I open a window and forget about the heat.", score: 0, tip: "That happens, but lowering the heat before airing out the room is much more efficient." },
      { text: "I often leave the heating on high and open a window for a long time.", score: -8, tip: "That wastes a lot of heat energy. It is much better to reduce heating first." }
    ]
  },
  {
    category: "electronics",
    question: "What do you usually do with broken cables, headphones, or small gadgets?",
    answers: [
      { text: "I try to repair them or recycle them properly.", score: 9, tip: "Great. Repairing or recycling small electronics helps reduce hidden waste." },
      { text: "I keep them in a drawer until I decide later.", score: 1, tip: "That is common, but proper recycling or repair is much better than forgetting them." },
      { text: "I throw them into normal trash.", score: -9, tip: "Small electronics should not go in normal trash. They contain materials that need proper handling." }
    ]
  }
];

const elements = {
  worldPanel: document.querySelector(".world-panel"),
  flower: document.getElementById("flower"),
  soundToggle: document.getElementById("soundToggle"),
  finaleOverlay: document.getElementById("finaleOverlay"),
  finaleFlower: document.getElementById("finaleFlower"),
  finaleParticles: document.getElementById("finaleParticles"),
  finaleTitle: document.getElementById("finaleTitle"),
  finaleText: document.getElementById("finaleText"),
  finaleHealthValue: document.getElementById("finaleHealthValue"),
  finaleChoicesValue: document.getElementById("finaleChoicesValue"),
  finaleAchievements: document.getElementById("finaleAchievements"),
  finaleSummary: document.getElementById("finaleSummary"),
  finaleRestartButton: document.getElementById("finaleRestartButton"),
  statusBadge: document.getElementById("statusBadge"),
  sparkles: document.getElementById("sparkles"),
  startCard: document.getElementById("startCard"),
  quizCard: document.getElementById("quizCard"),
  resultCard: document.getElementById("resultCard"),
  startButton: document.getElementById("startButton"),
  nextButton: document.getElementById("nextButton"),
  restartButton: document.getElementById("restartButton"),
  questionText: document.getElementById("questionText"),
  answers: document.getElementById("answers"),
  tipText: document.getElementById("tipText"),
  progressLabel: document.getElementById("progressLabel"),
  questionCounter: document.getElementById("questionCounter"),
  progressFill: document.getElementById("progressFill"),
  resultTitle: document.getElementById("resultTitle"),
  resultText: document.getElementById("resultText"),
  healthValue: document.getElementById("healthValue"),
  choicesValue: document.getElementById("choicesValue"),
  resultAchievements: document.getElementById("resultAchievements"),
  resultSummary: document.getElementById("resultSummary")
};

const state = {
  selectedQuestions: [],
  selectedResponses: [],
  currentQuestionIndex: 0,
  flowerHealth: START_HEALTH,
  bloomLevel: 3,
  goodStreak: 0,
  currentAnswer: null,
  finaleRunning: false,
  audioEnabled: true,
  audioContext: null,
  tipTimer: null,
  answerCelebrationTimer: null
};

const FLOWER_STATE_CLASSES = [
  "mood-happy",
  "mood-neutral",
  "mood-sad",
  "mood-ecstatic",
  "mood-wilted",
  "health-great",
  "health-mid",
  "health-low",
  "finale-dying"
];

const FLOWER_SPRITE_SHEET = {
  width: 256,
  height: 256
};

const FLOWER_SPRITES = {
  cheerful: { x: 5, y: 8, w: 37, h: 66 },
  calm: { x: 54, y: 9, w: 36, h: 66 },
  concerned: { x: 104, y: 11, w: 34, h: 64 },
  sad: { x: 151, y: 13, w: 34, h: 64 },
  wilted: { x: 199, y: 14, w: 34, h: 64 },
  collapse: { x: 9, y: 83, w: 30, h: 58 },
  hero: { x: 114, y: 87, w: 39, h: 68 },
  glow: { x: 171, y: 84, w: 37, h: 72 },
  restored: { x: 218, y: 87, w: 37, h: 66 }
};

function shuffleArray(items) {
  const array = [...items];

  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }

  return array;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function getMoodFromScore(score) {
  if (score >= 10) {
    return "ecstatic";
  }

  if (score >= 5) {
    return "happy";
  }

  if (score <= -8) {
    return "wilted";
  }

  if (score <= -4) {
    return "sad";
  }

  return "neutral";
}

function getHealthTier(health) {
  if (health >= 75) {
    return "health-great";
  }

  if (health >= 45) {
    return "health-mid";
  }

  return "health-low";
}

function getWorldTier(health) {
  if (health >= 80) {
    return "world-healthy";
  }

  if (health >= 45) {
    return "world-balanced";
  }

  return "world-hurt";
}

function getStatusMessage(health) {
  if (health >= 94) {
    return "The daisy is glowing, laughing, and almost dancing with joy";
  }

  if (health >= 82) {
    return "The daisy feels happy and full of life";
  }

  if (health >= 66) {
    return "The daisy is holding on and still believes in you";
  }

  if (health >= 48) {
    return "The daisy looks tired and worried";
  }

  if (health >= 30) {
    return "The daisy is weak and starting to wilt";
  }

  return "The daisy is struggling and needs better choices";
}

function getHealthChange(score) {
  if (score >= 10) {
    return 4;
  }

  if (score >= 8) {
    return 3;
  }

  if (score >= 5) {
    return 2;
  }

  if (score >= 2) {
    return 1;
  }

  if (score >= 0) {
    return 0;
  }

  if (score <= -10) {
    return -5;
  }

  if (score <= -8) {
    return -4;
  }

  if (score <= -6) {
    return -3;
  }

  return -2;
}

function getBloomLevelChange(score, currentLevel) {
  if (score >= 10) {
    return currentLevel >= 5 ? 1 : 2;
  }

  if (score >= 8) {
    return 1;
  }

  if (score >= 5) {
    return 1;
  }

  if (score >= 2) {
    return 0;
  }

  if (score >= 0) {
    return -1;
  }

  if (score <= -10) {
    return currentLevel >= 5 ? -3 : -2;
  }

  if (score <= -8) {
    return currentLevel >= 4 ? -3 : -2;
  }

  if (score <= -6) {
    return -2;
  }

  return -1;
}

function getEndingTier(health) {
  if (health > FINALE_SUCCESS_THRESHOLD) {
    return "victory";
  }

  if (health > SAFE_ENDING_THRESHOLD) {
    return "stable";
  }

  return "collapse";
}

function getFlowerSpriteScale(target) {
  return target.id === "finaleFlower" ? 8 : 6;
}

function setFlowerSpriteFrame(target, frameKey) {
  const frame = FLOWER_SPRITES[frameKey];
  const scale = getFlowerSpriteScale(target);

  if (!frame) {
    return;
  }

  target.dataset.spriteFrame = frameKey;
  target.style.setProperty("--sprite-frame-w", `${frame.w * scale}px`);
  target.style.setProperty("--sprite-frame-h", `${frame.h * scale}px`);
  target.style.setProperty("--sprite-sheet-w", `${FLOWER_SPRITE_SHEET.width * scale}px`);
  target.style.setProperty("--sprite-sheet-h", `${FLOWER_SPRITE_SHEET.height * scale}px`);
  target.style.setProperty("--sprite-bg-x", `${-frame.x * scale}px`);
  target.style.setProperty("--sprite-bg-y", `${-frame.y * scale}px`);
}

function getFlowerSpriteFrame(target, mood) {
  const health = state.flowerHealth;
  const bloomLevel = state.bloomLevel;
  const isPositiveMood = mood === "happy" || mood === "ecstatic";
  const isNegativeMood = mood === "sad" || mood === "wilted";

  if (target.classList.contains("finale-dying")) {
    return "collapse";
  }

  if (mood === "ecstatic" && bloomLevel >= 5) {
    return bloomLevel >= 6 ? "glow" : "hero";
  }

  if (health > SAFE_ENDING_THRESHOLD) {
    if (mood === "wilted") {
      return "concerned";
    }

    if (mood === "sad") {
      return bloomLevel >= 4 ? "calm" : "concerned";
    }
  }

  if (bloomLevel >= 6) {
    if (isNegativeMood) {
      return "hero";
    }

    return "glow";
  }

  if (bloomLevel === 5) {
    if (mood === "wilted") {
      return "sad";
    }

    if (mood === "sad") {
      return "concerned";
    }

    return state.goodStreak >= 2 ? "hero" : "restored";
  }

  if (bloomLevel === 4) {
    if (isNegativeMood) {
      return "concerned";
    }

    return isPositiveMood ? "cheerful" : "restored";
  }

  if (bloomLevel === 3) {
    return isNegativeMood ? "concerned" : "calm";
  }

  if (bloomLevel === 2) {
    if (isPositiveMood) {
      return "calm";
    }

    return "concerned";
  }

  if (bloomLevel === 1) {
    if (isPositiveMood) {
      return "concerned";
    }

    return "sad";
  }

  if (isPositiveMood) {
    return "concerned";
  }

  return "wilted";
}

function setFlowerSpriteMood(target, mood, frameKey) {
  setFlowerState(target, mood);
  setFlowerSpriteFrame(target, frameKey);
}

function applyFlowerSprite(target, mood = "neutral") {
  target.dataset.flowerMood = mood;
  setFlowerSpriteFrame(target, getFlowerSpriteFrame(target, mood));
}

function setFlowerState(target, mood = "neutral") {
  target.classList.remove(...FLOWER_STATE_CLASSES);
  target.classList.add(`mood-${mood}`);
  target.classList.add(getHealthTier(state.flowerHealth));
  applyFlowerSprite(target, mood);
}

function updateWorldAppearance() {
  elements.worldPanel.classList.remove("world-healthy", "world-balanced", "world-hurt");
  elements.worldPanel.classList.add(getWorldTier(state.flowerHealth));
  elements.statusBadge.textContent = getStatusMessage(state.flowerHealth);
}

function updateFlowerAppearance(mood = "neutral") {
  setFlowerState(elements.flower, mood);
  updateWorldAppearance();
}

function updateSoundButton() {
  elements.soundToggle.textContent = state.audioEnabled ? "Sound: on" : "Sound: off";
  elements.soundToggle.setAttribute("aria-pressed", String(state.audioEnabled));
}

async function getAudioContext() {
  if (!state.audioEnabled) {
    return null;
  }

  const AudioContextClass = window.AudioContext || window["webkitAudioContext"];

  if (!AudioContextClass) {
    return null;
  }

  if (!state.audioContext) {
    state.audioContext = new AudioContextClass();
  }

  if (state.audioContext.state === "suspended") {
    try {
      await state.audioContext.resume();
    } catch (error) {
      return null;
    }
  }

  return state.audioContext;
}

async function playTone({
  frequency,
  duration = 0.16,
  type = "sine",
  gain = 0.035,
  delayTime = 0,
  frequencyEnd = null,
  detune = 0,
  attack = 0.02,
  release = 0.08,
  filterFrequency = 3200
}) {
  const audioContext = await getAudioContext();

  if (!audioContext) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const filterNode = audioContext.createBiquadFilter();
  const startAt = audioContext.currentTime + delayTime;
  const endAt = startAt + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  oscillator.detune.setValueAtTime(detune, startAt);

  filterNode.type = "lowpass";
  filterNode.frequency.setValueAtTime(filterFrequency, startAt);

  if (frequencyEnd !== null) {
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, frequencyEnd), endAt);
  }

  gainNode.gain.setValueAtTime(0.0001, startAt);
  gainNode.gain.exponentialRampToValueAtTime(gain, startAt + attack);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, endAt + release);

  oscillator.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start(startAt);
  oscillator.stop(endAt + release + 0.02);
}

function playChord(frequencies, options = {}) {
  frequencies.forEach((frequency, index) => {
    playTone({
      frequency,
      delayTime: (options.delayTime ?? 0) + (options.spread ? index * options.spread : 0),
      duration: options.duration ?? 0.22,
      gain: options.gain ?? 0.018,
      type: options.type ?? "triangle",
      detune: index % 2 === 0 ? -4 : 4,
      attack: options.attack ?? 0.015,
      release: options.release ?? 0.08,
      filterFrequency: options.filterFrequency ?? 3000
    });
  });
}

async function playNoiseBurst({ gain = 0.01, duration = 0.08, delayTime = 0 } = {}) {
  const audioContext = await getAudioContext();

  if (!audioContext) {
    return;
  }

  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  const source = audioContext.createBufferSource();
  const filterNode = audioContext.createBiquadFilter();
  const gainNode = audioContext.createGain();
  const startAt = audioContext.currentTime + delayTime;
  const endAt = startAt + duration;

  for (let index = 0; index < data.length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
  }

  source.buffer = buffer;
  filterNode.type = "bandpass";
  filterNode.frequency.setValueAtTime(1800, startAt);
  gainNode.gain.setValueAtTime(0.0001, startAt);
  gainNode.gain.exponentialRampToValueAtTime(gain, startAt + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, endAt);

  source.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(audioContext.destination);
  source.start(startAt);
  source.stop(endAt + 0.01);
}

function playStartSound() {
  playTone({ frequency: 261.63, duration: 0.22, type: "triangle", gain: 0.024, filterFrequency: 2600 });
  playTone({ frequency: 392, duration: 0.24, type: "triangle", gain: 0.024, delayTime: 0.1, filterFrequency: 2800 });
  playTone({ frequency: 523.25, duration: 0.3, type: "triangle", gain: 0.022, delayTime: 0.22, filterFrequency: 3200 });
  playChord([392, 523.25, 659.25], { delayTime: 0.22, spread: 0.03, duration: 0.26, gain: 0.012, filterFrequency: 3600 });
  playNoiseBurst({ gain: 0.004, duration: 0.06, delayTime: 0.24 });
}

function playAnswerSound(score) {
  if (score >= 8) {
    playTone({ frequency: 659.25, duration: 0.13, type: "triangle", gain: 0.026, filterFrequency: 3400 });
    playTone({ frequency: 987.77, duration: 0.22, type: "sine", gain: 0.014, delayTime: 0.06, filterFrequency: 4200 });
    playNoiseBurst({ gain: 0.003, duration: 0.05, delayTime: 0.02 });
    return;
  }

  if (score <= -6) {
    playTone({ frequency: 220, duration: 0.14, type: "sawtooth", gain: 0.018, filterFrequency: 1600 });
    playTone({ frequency: 174.61, duration: 0.3, type: "triangle", gain: 0.018, delayTime: 0.08, frequencyEnd: 130, filterFrequency: 1200 });
    playTone({ frequency: 110, duration: 0.24, type: "sine", gain: 0.012, delayTime: 0.12, frequencyEnd: 80, filterFrequency: 700 });
    return;
  }

  playTone({ frequency: 440, duration: 0.14, type: "triangle", gain: 0.016, filterFrequency: 2400 });
  playTone({ frequency: 554.37, duration: 0.12, type: "sine", gain: 0.009, delayTime: 0.04, filterFrequency: 2800 });
}

function playVictorySound() {
  playChord([523.25, 659.25, 783.99], { spread: 0.03, duration: 0.24, gain: 0.016, filterFrequency: 3400 });
  playChord([659.25, 783.99, 1046.5], { delayTime: 0.2, spread: 0.04, duration: 0.32, gain: 0.014, filterFrequency: 4200 });
  playTone({ frequency: 1318.51, duration: 0.46, type: "sine", gain: 0.012, delayTime: 0.38, filterFrequency: 4600 });
  playNoiseBurst({ gain: 0.004, duration: 0.08, delayTime: 0.18 });
}

function playCollapseSound() {
  playTone({ frequency: 220, duration: 0.2, type: "sawtooth", gain: 0.016, filterFrequency: 1400 });
  playTone({ frequency: 164.81, duration: 0.28, type: "triangle", gain: 0.016, delayTime: 0.14, frequencyEnd: 120, filterFrequency: 1100 });
  playTone({ frequency: 110, duration: 0.56, type: "sine", gain: 0.012, delayTime: 0.26, frequencyEnd: 70, filterFrequency: 700 });
  playNoiseBurst({ gain: 0.003, duration: 0.07, delayTime: 0.16 });
}

function toggleSound() {
  state.audioEnabled = !state.audioEnabled;
  updateSoundButton();

  if (state.audioEnabled) {
    playTone({ frequency: 587.33, duration: 0.14, type: "triangle", gain: 0.014, filterFrequency: 2800 });
    playTone({ frequency: 880, duration: 0.18, type: "sine", gain: 0.008, delayTime: 0.06, filterFrequency: 3600 });
  }
}

function typeText(element, text) {
  window.clearInterval(state.tipTimer);
  element.textContent = "";
  let index = 0;

  state.tipTimer = window.setInterval(() => {
    element.textContent += text[index];
    index += 1;

    if (index >= text.length) {
      window.clearInterval(state.tipTimer);
    }
  }, 12);
}

function pulseWorld(effectClass, duration = 700) {
  elements.worldPanel.classList.remove("answer-glow-good", "answer-glow-great", "answer-glow-bad");
  void elements.worldPanel.offsetWidth;
  elements.worldPanel.classList.add(effectClass);

  window.setTimeout(() => {
    elements.worldPanel.classList.remove(effectClass);
  }, duration);
}

function createSparkles(strength) {
  const isVeryGood = strength >= VERY_GOOD_ANSWER_SCORE;
  const sparkleCount = isVeryGood ? 12 : strength > 0 ? 8 : 4;
  const spriteFrame = elements.flower.dataset.spriteFrame;
  const sparkleDuration = isVeryGood ? 1450 : 800;
  const sparkleDelayStep = isVeryGood ? 55 : 40;
  let totalSparkles = sparkleCount;

  if (spriteFrame === "hero") {
    totalSparkles += 6;
  }

  if (spriteFrame === "glow") {
    totalSparkles += 12;
  }

  for (let index = 0; index < totalSparkles; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = isVeryGood ? "sparkle sparkle-long" : "sparkle";
    sparkle.style.left = `${30 + Math.random() * 40}%`;
    sparkle.style.top = `${18 + Math.random() * 46}%`;
    sparkle.style.animationDelay = `${index * sparkleDelayStep}ms`;
    elements.sparkles.appendChild(sparkle);

    window.setTimeout(() => {
      sparkle.remove();
    }, sparkleDuration + index * sparkleDelayStep + 120);
  }
}

function clearAnswerCelebration() {
  window.clearTimeout(state.answerCelebrationTimer);
  state.answerCelebrationTimer = null;
  elements.flower.classList.remove("answer-celebrate");
}

function triggerAnswerCelebration(score) {
  clearAnswerCelebration();

  if (score < VERY_GOOD_ANSWER_SCORE) {
    return;
  }

  elements.flower.classList.add("answer-celebrate");
  state.answerCelebrationTimer = window.setTimeout(() => {
    elements.flower.classList.remove("answer-celebrate");
    state.answerCelebrationTimer = null;
  }, GREAT_ANSWER_CELEBRATION_MS);
}

function updateProgress() {
  const answeredCount = state.currentQuestionIndex;
  const progressPercent = (answeredCount / QUESTION_COUNT) * 100;

  elements.progressFill.style.width = `${progressPercent}%`;
  elements.questionCounter.textContent = `${answeredCount} / ${QUESTION_COUNT}`;

  if (answeredCount === 0) {
    elements.progressLabel.textContent = "Press start to begin";
  } else if (answeredCount < QUESTION_COUNT) {
    elements.progressLabel.textContent = "Keep helping the daisy";
  } else {
    elements.progressLabel.textContent = "Challenge complete";
  }
}

function renderQuestion() {
  const currentQuestion = state.selectedQuestions[state.currentQuestionIndex];
  const shuffledAnswers = shuffleArray(currentQuestion.answers);

  elements.questionText.textContent = currentQuestion.question;
  elements.answers.innerHTML = "";
  elements.tipText.textContent = "Choose an answer to see a helpful tip.";
  elements.nextButton.disabled = true;
  state.currentAnswer = null;

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer.text;
    button.addEventListener("click", () => selectAnswer(currentQuestion, answer, button));
    elements.answers.appendChild(button);
  });
}

function selectAnswer(question, answer, button) {
  if (state.currentAnswer) {
    return;
  }

  state.currentAnswer = answer;
  state.selectedResponses.push({
    category: question.category,
    question: question.question,
    answer: answer.text,
    score: answer.score,
    tip: answer.tip
  });

  state.flowerHealth = clamp(state.flowerHealth + getHealthChange(answer.score), 0, MAX_HEALTH);

  if (answer.score >= 8) {
    state.goodStreak += 1;
  } else if (answer.score >= 2) {
    state.goodStreak = Math.max(0, state.goodStreak - 1);
  } else {
    state.goodStreak = 0;
  }

  state.bloomLevel = clamp(
    state.bloomLevel + getBloomLevelChange(answer.score, state.bloomLevel),
    0,
    6
  );

  typeText(elements.tipText, answer.tip);
  elements.nextButton.disabled = false;

  const mood = getMoodFromScore(answer.score);
  const selectionState = answer.score >= 8 ? "selected-good" : answer.score <= -6 ? "selected-bad" : "selected-neutral";

  [...elements.answers.children].forEach((answerButton) => {
    answerButton.disabled = true;
  });

  button.classList.add(selectionState);
  updateFlowerAppearance(mood);
  triggerAnswerCelebration(answer.score);
  createSparkles(answer.score);
  playAnswerSound(answer.score);
  pulseWorld(
    answer.score >= VERY_GOOD_ANSWER_SCORE
      ? "answer-glow-great"
      : answer.score >= 0
        ? "answer-glow-good"
        : "answer-glow-bad",
    answer.score >= VERY_GOOD_ANSWER_SCORE ? GREAT_ANSWER_WORLD_PULSE_MS : 700
  );
}

function getAchievements(responses, health) {
  const positiveCategories = responses
    .filter((response) => response.score >= 8)
    .sort((left, right) => right.score - left.score);

  const achievements = [];
  const usedCategories = new Set();

  if (health > FINALE_SUCCESS_THRESHOLD) {
    achievements.push("Daisy Rescuer");
  }

  positiveCategories.forEach((response) => {
    if (achievements.length >= 3 || usedCategories.has(response.category)) {
      return;
    }

    usedCategories.add(response.category);
    const category = categoryMeta[response.category];
    achievements.push(category ? category.achievement : "Eco Friend");
  });

  if (achievements.length === 0) {
    achievements.push("First Green Step");
  }

  if (achievements.length === 1 && health <= 45) {
    achievements.push("There Is Still Hope");
  }

  return achievements.slice(0, 3);
}

function buildSummary(responses, health) {
  const summary = [];
  const sortedBest = [...responses].sort((left, right) => right.score - left.score);
  const sortedWorst = [...responses].sort((left, right) => left.score - right.score);

  const bestUnique = [];
  const worstUnique = [];
  const bestSeen = new Set();
  const worstSeen = new Set();

  sortedBest.forEach((response) => {
    if (response.score >= 6 && !bestSeen.has(response.category) && bestUnique.length < 2) {
      bestSeen.add(response.category);
      bestUnique.push(response);
    }
  });

  sortedWorst.forEach((response) => {
    if (response.score <= 1 && !worstSeen.has(response.category) && worstUnique.length < 2) {
      worstSeen.add(response.category);
      worstUnique.push(response);
    }
  });

  bestUnique.forEach((response) => {
    const category = categoryMeta[response.category];
    summary.push(`Strong point: ${category ? category.strength : "You made several good environmental choices."}`);
  });

  worstUnique.forEach((response) => {
    const category = categoryMeta[response.category];
    summary.push(`What to improve: ${category ? category.improve : "Think about where you can reduce your environmental footprint."}`);
  });

  const endingTier = getEndingTier(health);

  if (endingTier === "victory") {
    summary.unshift("Top ending: your daisy received so much support that it burst into a true celebration scene.");
  } else if (endingTier === "stable") {
    summary.unshift("Safe ending: the daisy stayed alive and steady, even if it did not reach its brightest celebration form.");
  } else if (health <= 45) {
    summary.unshift("The ending was rough: nature showed that it really needs better everyday habits.");
  } else {
    summary.unshift("The result is mixed: you already have some good habits, but a few changes could completely save the flower.");
  }

  return summary.slice(0, 4);
}

function getResultContent() {
  const health = state.flowerHealth;
  const achievements = getAchievements(state.selectedResponses, health);
  const summary = buildSummary(state.selectedResponses, health);
  const endingTier = getEndingTier(health);
  let title = "The flower bloomed";
  let text = "Your choices gave the daisy a lot of strength. It stayed bright, smiling, and full of hope.";
  let restartLabel = "Try again and grow an even better ending";

  if (endingTier === "victory") {
    title = "The daisy became the star of the forest";
    text = "Your choices gave the flower so much life that it burst with joy, flew upward, and turned the ending into a real celebration of nature.";
  } else if (endingTier === "stable") {
    title = "The daisy stayed safe";
    text = "The daisy made it through the challenge. It may not have reached the brightest glow, but it still stayed alive, steady, and hopeful.";
    restartLabel = "Try again and help the daisy bloom even more";
  } else if (health < 75 && health >= 45) {
    title = "The flower could still be saved";
    text = "The daisy fought until the end, but a few difficult habits spoiled the ending. The good news is that these are exactly the kinds of things that can change fastest.";
    restartLabel = "Try again and give the flower another chance";
  } else if (health < 45) {
    title = "The flower needs a new chance";
    text = "The ending was sad: the daisy grew tired, wilted, and could not withstand that much pressure. But even a few better choices could completely change this story.";
    restartLabel = "Come back and save the daisy";
  }

  return { title, text, health, achievements, summary, restartLabel };
}

function renderAchievements(target, achievements) {
  target.innerHTML = "";

  achievements.forEach((achievement) => {
    const chip = document.createElement("span");
    chip.className = "achievement-chip";
    chip.textContent = achievement;
    target.appendChild(chip);
  });
}

function renderSummary(target, summaryLines) {
  target.innerHTML = "";

  summaryLines.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    target.appendChild(item);
  });
}

function populateResultContent() {
  const { title, text, health, achievements, summary, restartLabel } = getResultContent();

  elements.resultTitle.textContent = title;
  elements.resultText.textContent = text;
  elements.healthValue.textContent = `${health}%`;
  elements.choicesValue.textContent = `${QUESTION_COUNT}`;
  elements.restartButton.textContent = restartLabel;
  renderAchievements(elements.resultAchievements, achievements);
  renderSummary(elements.resultSummary, summary);

  elements.finaleTitle.textContent = title;
  elements.finaleText.textContent = text;
  elements.finaleHealthValue.textContent = `${health}%`;
  elements.finaleChoicesValue.textContent = `${QUESTION_COUNT}`;
  elements.finaleRestartButton.textContent = restartLabel;
  renderAchievements(elements.finaleAchievements, achievements);
  renderSummary(elements.finaleSummary, summary);
}

function clearFinaleParticles() {
  elements.finaleParticles.innerHTML = "";
}

function spawnFinaleParticles(type, count) {
  clearFinaleParticles();

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    const left = 14 + Math.random() * 72;
    const delayTime = Math.random() * 0.55;
    const driftX = `${Math.round((Math.random() - 0.5) * 240)}px`;

    particle.className = `finale-particle ${type}`;
    particle.style.left = `${left}%`;
    particle.style.top = type === "confetti" ? `${-6 - Math.random() * 16}%` : `${30 + Math.random() * 18}%`;
    particle.style.animationDelay = `${delayTime}s`;
    particle.style.setProperty("--drift-x", driftX);

    if (type === "confetti") {
      const colors = ["#ff8a42", "#ffd95d", "#82cf6f", "#7dc3ff", "#ff8cb3"];
      particle.style.background = colors[index % colors.length];
    }

    elements.finaleParticles.appendChild(particle);

    window.setTimeout(() => {
      particle.remove();
    }, type === "confetti" ? 2400 : 2700);
  }
}

function resetFinale() {
  document.body.classList.remove("finale-lock");
  elements.finaleOverlay.hidden = true;
  elements.finaleOverlay.classList.remove("active", "animate-in", "show-result", "finale-victory", "finale-stable", "finale-collapse");
  elements.finaleFlower.classList.remove("finale-dying");
  setFlowerState(elements.finaleFlower, "neutral");
  clearFinaleParticles();
}

async function playFinale() {
  if (state.finaleRunning) {
    return;
  }

  state.finaleRunning = true;
  populateResultContent();
  elements.quizCard.hidden = true;
  elements.resultCard.hidden = true;
  updateProgress();

  const outcome = getEndingTier(state.flowerHealth);
  const finaleMood = outcome === "victory" ? "ecstatic" : outcome === "stable" ? "happy" : "wilted";

  if (outcome === "victory") {
    setFlowerSpriteMood(elements.finaleFlower, "neutral", "restored");
  } else if (outcome === "stable") {
    setFlowerSpriteMood(elements.finaleFlower, "neutral", "calm");
  } else {
    setFlowerSpriteMood(elements.finaleFlower, "neutral", "concerned");
  }

  elements.finaleOverlay.hidden = false;
  document.body.classList.add("finale-lock");
  elements.finaleOverlay.classList.add("active", `finale-${outcome}`);

  await delay(30);
  elements.finaleOverlay.classList.add("animate-in");

  if (outcome === "victory") {
    playVictorySound();
    await delay(850);
    setFlowerSpriteMood(elements.finaleFlower, "happy", "cheerful");
    await delay(420);
    setFlowerSpriteMood(elements.finaleFlower, "ecstatic", "hero");
    await delay(380);
    spawnFinaleParticles("confetti", 42);
    setFlowerSpriteMood(elements.finaleFlower, finaleMood, "glow");
    await delay(900);
  } else if (outcome === "stable") {
    playTone({ frequency: 523.25, duration: 0.2, type: "triangle", gain: 0.016, filterFrequency: 2800 });
    playTone({ frequency: 659.25, duration: 0.26, type: "sine", gain: 0.01, delayTime: 0.12, filterFrequency: 3400 });
    await delay(760);
    setFlowerSpriteMood(elements.finaleFlower, "happy", "restored");
    await delay(520);
    setFlowerSpriteMood(elements.finaleFlower, finaleMood, "hero");
    await delay(720);
  } else {
    playCollapseSound();
    await delay(720);
    setFlowerSpriteMood(elements.finaleFlower, "sad", "sad");
    await delay(760);
    setFlowerSpriteMood(elements.finaleFlower, "wilted", "wilted");
    await delay(720);
    spawnFinaleParticles("petal", 14);
    await delay(520);
    elements.finaleFlower.classList.add("finale-dying");
    setFlowerSpriteFrame(elements.finaleFlower, "collapse");
    await delay(980);
  }

  elements.finaleOverlay.classList.add("show-result");
  state.finaleRunning = false;
}

function advanceGame() {
  if (!state.currentAnswer) {
    return;
  }

  state.currentQuestionIndex += 1;
  updateProgress();

  if (state.currentQuestionIndex >= QUESTION_COUNT) {
    playFinale();
    return;
  }

  renderQuestion();
}

function startGame() {
  resetFinale();
  clearAnswerCelebration();
  state.selectedQuestions = shuffleArray(questionBank).slice(0, QUESTION_COUNT);
  state.selectedResponses = [];
  state.currentQuestionIndex = 0;
  state.flowerHealth = START_HEALTH;
  state.bloomLevel = 3;
  state.goodStreak = 0;
  state.currentAnswer = null;
  state.finaleRunning = false;

  elements.startCard.hidden = true;
  elements.quizCard.hidden = false;
  elements.resultCard.hidden = true;
  elements.questionCounter.textContent = `0 / ${QUESTION_COUNT}`;
  elements.progressFill.style.width = "0%";

  updateFlowerAppearance("neutral");
  updateProgress();
  renderQuestion();
  populateResultContent();
  playStartSound();
}

elements.startButton.addEventListener("click", startGame);
elements.nextButton.addEventListener("click", advanceGame);
elements.restartButton.addEventListener("click", startGame);
elements.finaleRestartButton.addEventListener("click", startGame);
elements.soundToggle.addEventListener("click", toggleSound);

updateSoundButton();
updateFlowerAppearance("neutral");
setFlowerState(elements.finaleFlower, "neutral");
updateProgress();
populateResultContent();
