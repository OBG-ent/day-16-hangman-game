/* ============================================================
   WORD BANK — organized by category, then difficulty.
   easy   = 3–5 letters   ·   medium = 6–8 letters   ·   hard = 9+ letters
   Pick a random word with:  randomWord(category, difficulty)
   ============================================================ */

const WORDS = {
  animals: {
    easy:   ["DOG", "CAT", "FOX", "BEAR", "WOLF", "ZEBRA", "PANDA", "KOALA"],
    medium: ["GIRAFFE", "ELEPHANT", "PENGUIN", "DOLPHIN", "CHEETAH", "KANGAROO", "RACCOON", "TURTLE"],
    hard:   ["RHINOCEROS", "HIPPOPOTAMUS", "CHIMPANZEE", "PORCUPINE", "ARMADILLO", "PLATYPUS", "ORANGUTAN", "JELLYFISH"]
  },
  food: {
    easy:   ["PIZZA", "BREAD", "APPLE", "PASTA", "HONEY", "MELON", "TACO", "RICE"],
    medium: ["LASAGNA", "BURRITO", "WAFFLE", "MUFFIN", "PICKLE", "SUSHI", "CUPCAKE", "PRETZEL"],
    hard:   ["CROISSANT", "QUESADILLA", "BRUSCHETTA", "GUACAMOLE", "CHEESECAKE", "MEATBALLS", "SPAGHETTI", "ARTICHOKE"]
  },
  tech: {
    easy:   ["MOUSE", "CHIP", "CODE", "PHONE", "WIFI", "ROBOT", "PIXEL", "EMAIL"],
    medium: ["KEYBOARD", "LAPTOP", "SERVER", "ROUTER", "BROWSER", "CURSOR", "TABLET", "MONITOR"],
    hard:   ["ALGORITHM", "FRAMEWORK", "DATABASE", "CYBERSECURITY", "MICROCHIP", "COMPILER", "SMARTPHONE", "BLOCKCHAIN"]
  },
  sports: {
    easy:   ["BALL", "GOAL", "SWIM", "SKI", "BOX", "GOLF", "TENNIS", "JUDO"],
    medium: ["SOCCER", "RUGBY", "CRICKET", "BOXING", "KARATE", "CYCLING", "ROWING", "SURFING"],
    hard:   ["BASKETBALL", "VOLLEYBALL", "BADMINTON", "TRIATHLON", "SKATEBOARD", "MARATHON", "PINGPONG", "SNOWBOARD"]
  }
};

/* Return a random word from a category + difficulty bucket. */
function randomWord(category, difficulty) {
  const bucket = WORDS[category][difficulty];
  return bucket[Math.floor(Math.random() * bucket.length)];
}

/* Points awarded for solving a word at each difficulty. */
const POINTS = { easy: 100, medium: 150, hard: 200 };
