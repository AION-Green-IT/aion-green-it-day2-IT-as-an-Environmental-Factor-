// build_all.js — builds all four worksheets in sequence into dist/.
const builds = [
  require("./build_ws1"),
  require("./build_ws2"),
  require("./build_ws3"),
  require("./build_ws4"),
];

(async () => {
  for (const build of builds) {
    await build();
  }
  console.log("All four worksheets built in dist/.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
