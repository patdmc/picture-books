({
  cap: 'Here’s everything they typed.',
  hint: 'Copy any command. Tap the repo to start again.',
  commands: [
    { cmd: "cd my-site", note: "Go into your repo (the one from If You Give a Dev a Repo, or any repo)." },
    { cmd: "mkdir -p .claude/skills/recap", note: "Make the folder. A project skill lives in .claude/skills/<name>/." },
    { cmd: "cat > .claude/skills/recap/SKILL.md <<'EOF'\n---\nname: recap\ndescription: Summarizes uncommitted changes and flags anything risky. Use when the user asks what changed.\n---\n\nSummarize the changes in two or three bullet points, then list any risks.\nEOF", note: "Write the skill. The description tells Claude when to use it." },
    { cmd: "claude", note: "Start Claude Code in the repo. The first time, it opens a browser to log in." },
    { cmd: "/recap", note: "Type this inside Claude Code to use the skill now. Claude also uses it on its own when the description fits." },
    { cmd: "git add .claude", note: "Stage the skill." },
    { cmd: "git commit -m \"Add the recap skill\"", note: "Save it." },
    { cmd: "git push", note: "Send it up, so the team gets it." },
    { cmd: "git pull", note: "On a teammate’s computer: get the skill." },
    { cmd: "mkdir -p ~/.claude/skills && ln -s \"$PWD/.claude/skills/recap\" ~/.claude/skills/recap", note: "Optional: link it into ~/.claude/skills to use it in every project on this computer." },
  ],
})
