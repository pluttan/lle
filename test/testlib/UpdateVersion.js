const { execSync } = require('child_process');

execSync('git add .&&git commit -m "testpatch"&&npm version patch&&npm publish&&cd test/testlib&&npm update', { stdio: 'inherit' });