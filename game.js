// Game logic. Content lives in rooms.js; this file shows one screen at a time.
// Flow: start -> warlock intro -> Maze -> Alchemy Lab -> Hall of Illusions -> Final Door -> escape

const app = document.getElementById("app");
// keys: the key counter. Starts at 0, +1 per Final Door answer (see finalCheck)
let player = { knight: null, difficulty: null, hintsLeft: 0, keys: 0, spell: [] };

// Small helper: put HTML on the screen
function show(html) {
  app.innerHTML = html;
  window.scrollTo(0, 0);
}

function codeBlock(code) {
  const safe = code.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return `<pre><code>${safe}</code></pre>`;
}

// Progress bar at the top of every chamber; shows the key counter
function header(chamber, step, total) {
  return `<p class="progress">${chamber.title} · ${step} of ${total} · Keys: ${player.keys} · Hints left: ${player.hintsLeft}</p>
          <p class="concept">${chamber.concept}</p>`;
}

// ---------- Start: choose knight, difficulty ----------
function startScreen() {
  // New game: key counter goes back to 0
  player = { knight: null, difficulty: null, hintsLeft: 0, keys: 0, spell: [] };
  const knights = KNIGHTS.map((k, i) =>
    `<button class="choice" style="border-color:${k.color}" onclick="pickKnight(${i})">${k.name}</button>`).join("");
  show(`<h1>Knight's Escape</h1>
        <p>Choose your knight:</p><div class="choices">${knights}</div>`);
}

function pickKnight(i) {
  player.knight = KNIGHTS[i];
  const levels = DIFFICULTIES.map((d, j) =>
    `<button class="choice" onclick="pickDifficulty(${j})"><b>${d.name}</b><small>${d.about}</small></button>`).join("");
  show(`<h1>${player.knight.name}</h1><p>Choose your difficulty:</p><div class="choices">${levels}</div>`);
}

function pickDifficulty(j) {
  player.difficulty = DIFFICULTIES[j];
  show(`<p class="warlock">${WARLOCK.name}:</p>
        <h2>"${WARLOCK.intro}"</h2>
        <button onclick="mazeTurn(0)">Enter the dungeon</button>`);
}

// Shared by every chamber: hint button and wrong-answer taunt
function useHint(text) {
  if (player.hintsLeft <= 0) { document.getElementById("hint").textContent = "No hints left in this chamber."; return; }
  player.hintsLeft--;
  document.getElementById("hint").textContent = "Hint: " + text;
}

// 👉 LESLIE NOTE (escape screen task, Part B: count mistakes). Delete this note when you're done.
//   Every wrong answer, in every chamber, ends up in this function.
//   1. Ctrl+F: let player   (near the top). Add a mistake counter for each chamber, all starting at 0.
//   2. Ctrl+F: startScreen   It rebuilds player for each new game, so add the same counters there too.
//   3. Ctrl+F: return taunt()   It shows up 3 times, once per chamber. Each one is a wrong answer.
//      Right before each one, add 1 to that chamber's counter.
function taunt() {
  const t = WARLOCK.taunts[Math.floor(Math.random() * WARLOCK.taunts.length)];
  document.getElementById("feedback").textContent = `${WARLOCK.name}: "${t}"`;
}

// ---------- Chamber 1: The Maze ----------
function mazeTurn(n) {
  if (n === 0) player.hintsLeft = player.difficulty.hints;
  if (n >= MAZE.turns.length) return labStep(0);
  const t = MAZE.turns[n];
  const choices = t.choices.map((c, i) => `<button class="choice" onclick="mazeAnswer(${n}, ${i})">${c}</button>`).join("");
  show(`${header(MAZE, n + 1, MAZE.turns.length)}
        ${n === 0 ? `<p class="story">${MAZE.story}</p>` : ""}
        ${codeBlock(t.code)}<h2>${t.question}</h2>
        <div class="choices">${choices}</div>
        <button class="secondary" onclick="useHint(MAZE.turns[${n}].hint)">Hint</button>
        <p id="hint"></p><p id="feedback"></p>`);
}

function mazeAnswer(n, i) {
  const t = MAZE.turns[n];
  if (i !== t.answer) return taunt();
  show(`<h2>The path opens.</h2><p>${t.explain}</p><button onclick="mazeTurn(${n + 1})">Keep going</button>`);
}

// ---------- Chamber 2: The Alchemy Lab ----------
function labStep(n) {
  if (n === 0) { player.hintsLeft = player.difficulty.hints; player.spell = []; }
  if (n >= LAB.steps.length) {
    return show(`<h2>The spell is complete:</h2><p class="spell">${player.spell.join(" ")}</p>
                 <button onclick="hallRound(0)">Cast it</button>`);
  }
  const s = LAB.steps[n];
  const choices = s.choices.map((c, i) => `<button class="choice" onclick="labAnswer(${n}, ${i})">${c}</button>`).join("");
  show(`${header(LAB, n + 1, LAB.steps.length)}
        ${n === 0 ? `<p class="story">${LAB.story}</p>` : ""}
        <p>Spell so far: <span class="spell">${player.spell.join(" ") || "..."}</span></p>
        ${codeBlock(s.code)}<h2>What does this print?</h2>
        <div class="choices">${choices}</div>
        <button class="secondary" onclick="useHint(LAB.steps[${n}].hint)">Hint</button>
        <p id="hint"></p><p id="feedback"></p>`);
}

function labAnswer(n, i) {
  const s = LAB.steps[n];
  if (i !== s.answer) return taunt();
  player.spell.push(s.choices[s.answer]);
  labStep(n + 1);
}

// ---------- Chamber 3: The Hall of Illusions ----------
function hallRound(n) {
  if (n === 0) player.hintsLeft = player.difficulty.hints;
  if (n >= HALL.rounds.length) return finalQuestion(0);
  const r = HALL.rounds[n];
  const doors = r.doors.map((code, i) =>
    `<button class="door" onclick="hallAnswer(${n}, ${i})"><b>Door ${i + 1}</b>${codeBlock(code)}</button>`).join("");
  show(`${header(HALL, n + 1, HALL.rounds.length)}
        ${n === 0 ? `<p class="story">${HALL.story}</p>` : ""}
        <h2>${r.question}</h2><div class="doors">${doors}</div>
        <button class="secondary" onclick="useHint(HALL.rounds[${n}].hint)">Hint</button>
        <p id="hint"></p><p id="feedback"></p>`);
}

function hallAnswer(n, i) {
  const r = HALL.rounds[n];
  if (i !== r.answer) return taunt();
  show(`<h2>The illusion fades. That door was real.</h2><p>${r.explain}</p><button onclick="hallRound(${n + 1})">Walk through</button>`);
}

// ---------- Chamber 4: The Final Door ----------
// Open-ended: the player writes an answer, compares it with a model answer, and checks themselves.
function finalQuestion(n) {
  if (n >= FINAL.questions.length) return escapeScreen();
  const q = FINAL.questions[n];
  show(`${header(FINAL, n + 1, FINAL.questions.length)}
        ${n === 0 ? `<p class="story">${FINAL.story}</p>` : ""}
        <p class="warlock">${WARLOCK.name} asks:</p><h2>${q.question}</h2>
        <textarea id="answer" rows="4" placeholder="Answer in your own words..."></textarea>
        <button onclick="finalCheck(${n})">Answer the warlock</button><p id="feedback"></p>`);
}

// 👉 SANJANA NOTE (keys are flashcards). Delete this note when you're done.
//   In this function, q is the question the player just answered.
//   q.model is its strong answer, like "A class is a blueprint...". That's your flashcard's text.
//   1. A few lines down, find the "Yes, take the key" button. Clicking it = a key is earned.
//   2. Inside the same show(` `) text, add a small box that shows q.model.
//   3. Ask Shirley how the card should look (she styles it in style.css).
//   4. Save, play to the Final Door, answer one question, and check the card shows up.
function finalCheck(n) {
  const text = document.getElementById("answer").value.trim();
  if (!text) { document.getElementById("feedback").textContent = "The warlock waits for an answer..."; return; }
  const q = FINAL.questions[n];
  const list = q.lookFor.map((x) => `<li>${x}</li>`).join("");
  show(`<h2>Compare your answer</h2><p><b>You said:</b> ${text.replace(/</g, "&lt;")}</p>
        <p><b>A strong answer:</b> ${q.model}</p><p>Did yours include:</p><ul>${list}</ul>
        <!-- Key counter goes up here: player.keys++ when the player accepts the key -->
        <button onclick="player.keys++; finalQuestion(${n + 1})">Yes, take the key</button>
        <button class="secondary" onclick="finalQuestion(${n})">Let me try again</button>`);
}

// ---------- Escape ----------
function escapeScreen() {
  // TODO (build crew): make this screen feel like a victory
  // 👉 LESLIE NOTE (escape screen task). Delete this note when you're done.
  //   Play the whole game once first, so you know what this screen looks like now.
  //   Part A, victory: a big title, the warlock's defeated line, your knight, "Keys: 2 of 3".
  //   Part B, count mistakes: see the LESLIE NOTE above taunt().
  //   Part C, weak-spot scroll: show the chamber with the most mistakes and what to review.
  //   Part D, pegasus: add up all the mistakes. 2 or fewer = Shirley's pegasus picture,
  //     more = the knight walking out. Put her files (like pegasus.png) in this folder, show them with <img>.
  //   Keep the Play again button. Test twice: once carefully, once with mistakes on purpose.
  // Final key count is shown below
  show(`<h1>You escaped!</h1><p class="warlock">${WARLOCK.name}: "${WARLOCK.defeated}"</p>
        <p>${player.knight.name} · ${player.difficulty.name} · Keys: ${player.keys}</p>
        <button onclick="startScreen()">Play again</button>`);
}

startScreen();
