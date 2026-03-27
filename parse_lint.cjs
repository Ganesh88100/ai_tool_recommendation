const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lint_results.json', 'utf8'));
let output = '';
data.forEach(file => {
  file.messages.forEach(msg => {
    if (msg.severity === 2) {
      output += `${file.filePath}:${msg.line}:${msg.column} - ${msg.message}\n`;
    }
  });
});
fs.writeFileSync('parsed_lint_direct.txt', output, 'utf8');
