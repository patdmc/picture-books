({
  cap: 'Here’s everything they typed.',
  hint: 'Copy any command. Tap the repo to start again.',
  commands: [
    { cmd: "git init -b main", note: "Make this folder a repo, with main as its first branch." },
    { cmd: "echo \"hello\" > index.html", note: "Make a page to save." },
    { cmd: "git status", note: "See what changed." },
    { cmd: "git add index.html", note: "Stage the page for the next save." },
    { cmd: "git commit -m \"Add the first page\"", note: "Save a snapshot, with a message." },
    { cmd: "git log --oneline", note: "See the history, one save per line." },
    { cmd: "git switch -c new-idea", note: "Make a branch and move onto it." },
    { cmd: "git commit -am \"Try a new idea\"", note: "Save every changed file git already tracks." },
    { cmd: "git switch main", note: "Go back to main." },
    { cmd: "git merge new-idea", note: "Bring the branch’s saves into main." },
    { cmd: "git remote add origin <your repo URL>", note: "Name a home for the repo. Put your own repo’s address in place of <your repo URL>." },
    { cmd: "git push -u origin main", note: "Send main up to that home." },
    { cmd: "git clone <your repo URL>", note: "Make a copy somewhere else." },
  ],
})
