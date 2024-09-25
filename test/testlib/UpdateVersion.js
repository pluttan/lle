const { execSync } = require('child_process');

execSync('npm version patch&&npm publish&&cd test/testlib&&npm update', { stdio: 'inherit' });