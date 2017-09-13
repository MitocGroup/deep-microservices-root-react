'use strict';

const path = require('path');
const { spawn } = require('child_process');

module.exports = function(callback) {
  let installation = spawn(
    process.env.SHELL || 'bash',
    [
      path.join(__dirname, 'framework.sh')
    ]
  );

  installation.stdout.pipe(process.stdout);
  installation.stderr.pipe(process.stderr);

  installation.on('close', function(code) {
    if (code !== 0) {
      console.error('Framework installation failed (exit with code ' + code + ')');
    }

    callback();
  });
};
