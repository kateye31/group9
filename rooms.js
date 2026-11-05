// ALL GAME CONTENT LIVES HERE. Edit this file to change the story and puzzles.
// Based on Shirley's Group 9 design roadmap: a warlock traps you in his dungeon,
// and you escape through 4 chambers. Search for TODO to find open work.

// ---------- Start screen ----------
const KNIGHTS = [
  // TODO (design crew): name your knights and pick their colors
  { name: "Sir Byte", color: "#ffc21a" },
  { name: "Dame Loop", color: "#c2ba52" },
  { name: "Sir Null", color: "#f08a4b" },
];

// Difficulty changes how many hints you get in each chamber
const DIFFICULTIES = [
  { name: "Squire", hints: 3, about: "New to OOP. Lots of help." },
  { name: "Knight", hints: 2, about: "Seen Java before." },
  { name: "Champion", hints: 1, about: "Ready for a challenge." },
];

// ---------- The warlock ----------
const WARLOCK = {
  // TODO (story): give him a name and a personality (see the Council answers)
  name: "The Warlock",
  intro: "Welcome to my dungeon, little knight. Four chambers stand between you and freedom. Each one is locked with code. Good luck... you'll need it.",
  taunts: ["Wrong! Try again, if you dare.", "Ha! My dungeon grows stronger.", "Not quite. Think like a programmer."],
  defeated: "No! You've escaped my dungeon. You truly understand objects...",
};

// ---------- Chamber 1: The Maze ----------
// 5 turns. Each turn is a multiple-choice question; the right answer is the right direction.
const MAZE = {
  title: "The Maze",
  concept: "Classes and objects",
  story: "Stone walls twist in every direction. Choose the right path at each turn.",
  turns: [
    {
      code: "class Knight {\n    String name;\n}\n\nKnight k = new Knight();",
      question: "Which one is the OBJECT?",
      choices: ["⬅️ Knight", "⬆️ k", "➡️ class"],
      answer: 1, // index into choices, 0 = first
      hint: "A class is the blueprint. What gets built FROM the blueprint?",
      explain: "Knight is the class. k is an object made from it with new.",
    },
    {
      code: "Knight a = new Knight();\nKnight b = new Knight();",
      question: "How many Knight objects exist?",
      choices: ["⬅️ 1", "⬆️ 2", "➡️ 0"],
      answer: 1,
      hint: "Count how many times you see the word new.",
      explain: "Each new creates one object, so there are 2.",
    },
    // TODO (Sanjana): write turns 3, 4 and 5
    //Hi!
  ],
};

// ---------- Chamber 2: The Alchemy Lab ----------
// 4 steps. Guess what each snippet prints; the printed words join into the spell.
const LAB = {
  title: "The Alchemy Lab",
  concept: "Methods and return values",
  story: "Bubbling potions line the shelves. Each one whispers a word when you read its code.",
  steps: [
    // Step 1: Print "Squire"
    {
      code: 'class Knight {\n    String title() { return "Squire"; }\n}\n\nSystem.out.println(new Knight().title());',
      choices: ["Squire", "title", "Knight"],
      answer: 0,
      hint: "What does the title() method return?",
    },
    // Step 2: Print "doing"
    {
      code: 'String action = "doing";\nSystem.out.println(action);',
      choices: ["do", "doing", "action"],
      answer: 1,
      hint: "The variable 'action' holds the string 'doing'.",
    },

      // Step 3 (Fixed): Print "king's"
    {
      code: 'String possessive = "king";\nSystem.out.println(possessive + "\'s");',
      choices: ["king", "king's", "possessive"],
      answer: 1,
      hint: "Adding '\\'s' to 'king' makes it possessive.",
    },

    // Step 4: Print "work" using encapsulation
    {
      code: 'class Squire {\n    private String task = "work";\n    \n    String getTask() {\n        return this.task;\n    }\n}\n\nSystem.out.println(new Squire().getTask());',
      choices: ["work", "task", "Squire"],
      answer: 0,
      hint: "The getTask() method returns the private 'task' variable.",
    },
  ],
};
// Lol 