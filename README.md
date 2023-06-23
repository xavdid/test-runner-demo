# `universal-test-runner` Demo

This repo is a collection of small examples for the [universal-test-runner](https://github.com/xavdid/universal-test-runner).

To try it out:

<p align="center">
   <a href="https://github.com/xavdid/test-runner-demo/raw/main/_demo/demo-min.gif">
      <img src="https://github.com/xavdid/test-runner-demo/raw/main/_demo/demo-min.gif"/>
   </a>
</p>

1. [Install](https://github.com/xavdid/universal-test-runner#installation) the universal test runner
2. run: `git clone git@github.com:xavdid/universal-test-runner-demo.git`
3. in each subfolder:
   - run `t` invoke the correct test handler. This will only work if you have the corresponding test runner installed (`pytest`, `cargo`, `npm`, etc), so some languages may fail if you haven't worked on them before
   - run `universal-test-runner --debug` to see what test command would be run (regardless of if you have it installed locally)
