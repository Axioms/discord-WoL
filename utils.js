const util = require("util");

exports.sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

exports.runCommand = async function (cmd) {
  const exec = util.promisify(require("child_process").exec);
  try {
    await exec(cmd);
    return true;
  } catch (err) {
    return false;
  }
};

exports.startComputer = async function () {
  const started = await this.runCommand(
    "sudo etherwake -b " + process.env.MACADDRESS
  );
  console.log(started);
  if (started) {
    return true;
  } else {
    return false;
  }
};
