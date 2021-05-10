const db = require('./db/connection');
const mainPrompt = require('./lib/prompt');

// Connect to Company Database
// Begin Prompt
db.connect(function(err) {
    if (err) throw err
    mainPrompt();
});
