const writeYamlFile = require("write-yaml-file");
const path = require("path");
const replace = require("replace-in-file");

const config = {
  command: "bash -l",
  cwd: "/Users/david/projects/test-runner-demo",
  env: {
    recording: true,
  },
  cols: 108,
  rows: 23,
  repeat: 0,
  quality: 100,
  frameDelay: "auto",
  maxIdleTime: 2000,
  frameBox: {
    type: "floating",
    title: "universal-test-runner",
    style: {
      border: "0px black solid",
    },
  },
  watermark: {
    imagePath: null,
    style: {
      position: "absolute",
      right: "15px",
      bottom: "15px",
      width: "100px",
      opacity: 0.9,
    },
  },
  cursorStyle: "block",
  fontFamily: "Monaco, Lucida Console, Ubuntu Mono, Monospace",
  fontSize: 12,
  lineHeight: 1,
  letterSpacing: 0,
  theme: {
    background: "transparent",
    foreground: "#afafaf",
    cursor: "#c7c7c7",
    black: "#232628",
    red: "#fc4384",
    green: "#b3e33b",
    yellow: "#ffa727",
    blue: "#75dff2",
    magenta: "#ae89fe",
    cyan: "#708387",
    white: "#d5d5d0",
    brightBlack: "#626566",
    brightRed: "#ff7fac",
    brightGreen: "#c8ed71",
    brightYellow: "#ebdf86",
    brightBlue: "#75dff2",
    brightMagenta: "#ae89fe",
    brightCyan: "#b1c6ca",
    brightWhite: "#f9f9f4",
  },
};

const PROMPT = "\r\n% ";
const dim = (s) => `\x1b[2m-> ${s}\x1b[0m`;

/**
 * if `word` is an empty string, the function runs fine, but the resulting yml file hangs
 * @param {string} word
 */
const print = (word) => word.split("").map((c) => [{ delay: 75, content: c }]);

/**
 * @param {string} dest the target to `cd` to
 * @param {string} output the test suite output
 * @param {boolean} first is this the first command?
 */
const runT = (dest, cmd, output, first = false) => [
  {
    delay: first ? 75 : 1000,
    content: "c",
  },
  print(`d ${dest}`),
  {
    delay: 50,
    content: PROMPT,
  },
  {
    delay: 400,
    content: "t",
  },
  {
    delay: 300,
    content: `\r\n${dim(cmd)}\r\n`,
  },
  {
    delay: 500,
    content: output,
  },
  {
    delay: 50,
    content: PROMPT,
  },
];

const data = {
  config,
  records: [
    {
      delay: 0,
      content: "% ",
    },
    runT(
      "./clojure",
      "lien test",
      "\r\nlein test demo-test\r\n\r\nRan 1 tests containing 1 assertions.\r\n0 failures, 0 errors.\r\n",
      true
    ),
    runT(
      "../elixir",
      "mix test",
      "\r\nHelloWorldTest [test/hello_world_test.exs]\r\n  * test does basic math [L#4]\\\\e[32m\r  * test does basic math (0.3ms) [L#4]\\e[0m\r\n\r\nFinished in 0.00 seconds (0.00s async, 0.00s sync)\r\n\\e[32m1 test, 0 failures\\e[0m\r\n\r\nRandomized with seed 208318\r\n"
    ),
    runT("../go", "go test ./...", "ok  \tdemo/demo\r\n"),
    runT(
      "../js/npm",
      "npm test",
      "\r\n> npm@1.0.0 test\r\n> echo 'running tests with npm!'\r\n\r\nrunning tests with npm!\r\n"
    ),
    runT(
      "../js/yarn",
      "yarn test",
      "\\e[2K\\e[1G\\e[1myarn run v1.22.19\\e[22m\r\n\\e[2K\\e[1G\\e[2m$ echo 'running tests with yarn!'\\e[22m\r\nrunning tests with yarn!\r\n\\e[2K\\e[1G✨  Done in 0.02s.\r\n"
    ),
    runT(
      "../js/pnpm",
      "pnpm test",
      "\r\n> npm@1.0.0 test /Users/david/projects/test-runner-demo/js/pnpm\r\n> echo 'running tests with pnpm!'\r\n\r\nrunning tests with pnpm!\r\n"
    ),
    runT(
      "../../makefiles",
      "make test",
      "running test script in Makefile!\r\n"
    ),
    runT(
      "../python-django",
      "./manage.py test",
      ".\r\n----------------------------------------------------------------------\r\nRan 1 test in 0.000s\r\n\r\nOK\r\n"
    ),
    runT(
      "../python-pytest",
      "pytest",
      "\\e[1m================================== test session starts ====================================\\e[0m\r\nplatform darwin -- Python 3.11.0, pytest-7.3.1, pluggy-1.0.0\r\nrootdir: /Users/david/projects/test-runner-demo/python-pytest\r\n\\e[1mcollecting ... \\e[0m\\e[1m\rcollected 1 item                                                                                      \\e[0m\r\n\r\ntest_add.py \\e[32m.\\e[0m\\e[32m                                                                        [100%]\\e[0m\r\n\r\n\\e[32m=================================== \\e[32m\\e[1m1 passed\\e[0m\\e[32m in 0.00s\\e[0m\\e[32m =====================================\\e[0m\r\n"
    ),
    runT(
      "../rust",
      "cargo test",
      "\\e[0m\\e[0m\\e[1m\\e[32m    Finished\\e[0m test [unoptimized + debuginfo] target(s) in 0.00s\r\n\\e[0m\\e[0m\\e[1m\\e[32m     Running\\e[0m tests/demo.rs (target/debug/deps/demo-8a20e670b520f4bc)\r\n\r\nrunning 1 test\r\ntest basic_math ... \\e[32mok\\e(B\\e[m\r\n\r\ntest result: \\e[32mok\\e(B\\e[m. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\r\n\r\n"
    ),
    {
      delay: 2500,
      content: " ",
    },
  ].flat(5),
};

const outputFile = path.join(__dirname, "demo.yml");
writeYamlFile.sync(outputFile, data);
// replace double backslashes with single ones for correct colorization
const options = {
  files: outputFile,
  from: /\\\\/g,
  to: "\\",
};
replace.sync(options);
