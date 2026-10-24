# Welcome to Knight's Escape

Knight's Escape is a browser escape room that teaches Java OOP. A warlock traps the player, who gets out through 4 chambers by reading code. Demo: Thursday, Nov 12.

## Get started

1. Clone the repo and open the folder in VS Code.
2. Open `index.html` in your browser. There's nothing to install.
3. Search the code for `TODO` to find open work.

## Where things live

| File | What's in it | Owner |
| --- | --- | --- |
| `rooms.js` | Story, Java snippets, questions, hints | Content (Sanjana, Leslie) |
| `style.css` | Colors, fonts, layout | Design (Shirley, Tvishaa) |
| `game.js` | How screens work, the victory screen | Build (Leslie, Sanjana) |
| `index.html` | Page structure (rarely changes) | Build |
| `README.md` | Full game overview and git workflow | Katrina |
| `TEAM-GUIDE.md` | Setup, weekly routine, AI tips, demo timeline | Katrina |
| `WELCOME.md` | This page | Katrina |

Most tasks only touch one file. Every chamber has an example you can copy.

## Leslie's tasks

Do these in order. Use a new branch for each task (see "Making a change" below).

**1. Write 2 more Alchemy Lab steps** (`rooms.js`, Content)

- Search `rooms.js` for `TODO (Leslie/Sanjana)`. It's at the end of the `LAB` steps.
- Copy one of the 2 steps above it and paste it in twice, replacing the TODO line.
- For each new step, change:
  - `code`: a short Java snippet that prints exactly one word.
  - `choices`: 3 options. One of them is the word the code prints.
  - `answer`: the position of the right choice, counting from 0 (first = 0, second = 1, third = 2).
  - `hint`: one sentence that nudges the player without giving it away.
- Keep the topic on methods and return values.
- The 4 printed words become the spell, so pick words that sound good together (for example `OPEN SESAME ...`).
- Done when: you can play through the Lab, all 4 steps appear, and the spell shows 4 words.
- Branch name: `leslie/lab-steps`

**2. Make the victory screen feel like a win** (`game.js`, Build)

- Search `game.js` for `TODO (build crew)`. It's in `escapeScreen()` near the bottom.
- That function shows the screen the player sees after escaping. Add more to it, for example a victory title, a line from the warlock, the knight's name, and the key count.
- `player.keys` holds the number of keys earned (0 to 3). The comments in `game.js` that mention the "key counter" show everywhere it's used. You don't need to change how keys are earned.
- If you want new colors or animations, add a class here and ask Design (Shirley, Tvishaa) to style it in `style.css`.
- Done when: you can beat the game and the ending looks clearly different from a normal chamber screen.
- Branch name: `leslie/victory-screen`

Sanjana shares both files. Tell them in Discord before you start so you don't both edit the same part.

## Making a change

1. `git checkout 1.0` and `git pull origin 1.0`
2. `git checkout -b your-name/task-name`
3. Edit the file, then reload `index.html` to check your change.
4. `git add .`, `git commit -m "What you did"`, then `git push -u origin your-name/task-name`
5. Open a pull request on GitHub. Katrina reviews and merges it.

Never push directly to `1.0` (that's our main branch). GitHub will block it anyway.

## Stuck?

Run `git status` to see your branch and what changed. If you hit a merge conflict or pushed to the wrong place, don't force anything. Post in Discord and we'll fix it together.

The full details are in [README.md](README.md).
