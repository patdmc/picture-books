({
  cap: "Here’s the whole recipe.",
  hint: "Copy any command. Tap the button to start again.",
  commands: [
    { cmd: "git clone https://github.com/patdmc/picture-books.git", note: "Get the repo." },
    { cmd: "cd picture-books", note: "Go into it." },
    { cmd: "mkdir -p ~/.claude/skills", note: "Make sure your personal skills folder exists." },
    { cmd: "ln -s \"$PWD/skills/picture-book\" ~/.claude/skills/picture-book", note: "Teach Claude Code the picture-book recipe." },
    { cmd: "ln -s \"$PWD/skills/picture-book-revise\" ~/.claude/skills/picture-book-revise", note: "And the one for changing a finished book." },
    { cmd: "claude", note: "Start Claude Code in the repo." },
    { cmd: "/picture-book a story about a cat who learns git", note: "Type this inside Claude Code, with your own idea." },
    { cmd: "node engine/cli/picture-book.js check my-book", note: "Draw every page in every style and cast, and report problems. Use your book’s folder name." },
    { cmd: "node engine/cli/picture-book.js contact my-book", note: "Every page on one sheet, in site/my-book/. Add ?style=ink&cast=toys to the address." },
    { cmd: "node engine/cli/picture-book.js edit", note: "The editor, at http://localhost:4800: reorder pages, edit words, ask Claude." },
    { cmd: "node engine/cli/picture-book.js build --all --pages", note: "Build the site into docs/." },
    { cmd: "git push", note: "Publish it, if your repo serves GitHub Pages from main:/docs." },
  ],
})
