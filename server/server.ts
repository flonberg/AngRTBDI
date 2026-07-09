import express from 'express';
import cors from 'cors';
import { execFile } from 'node:child_process';
import path from 'node:path';

const app = express();
app.use(cors()); // allows Angular dev server (different port) to call this

app.get('/run-script', (req, res) => {
  const scriptPath = path.join(__dirname, 'script.py');

  execFile('python3', [scriptPath], (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      res.status(500).json({ error: stderr });
      return;
    }
    res.json({ output: stdout });
  });
});

app.listen(3000, () => console.log('Local dev server running on http://localhost:3000'));