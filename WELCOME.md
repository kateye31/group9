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
| `WELCOME.md` | This page | Katrina |

Most tasks only touch one file. Every chamber has an example you can copy.

## Making a change

1. `git checkout main` and `git pull origin main`
2. `git checkout -b your-name/task-name`
3. Edit the file, then reload `index.html` to check your change.
4. `git add .`, `git commit -m "What you did"`, then `git push -u origin your-name/task-name`
5. Open a pull request on GitHub. Katrina reviews and merges it.

Never push directly to `main`.

## Stuck?

Run `git status` to see your branch and what changed. If you hit a merge conflict or pushed to the wrong place, don't force anything. Post in Discord and we'll fix it together.

The full details are in [README.md](README.md).
