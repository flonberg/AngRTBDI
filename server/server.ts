import express from 'express';
import cors from 'cors';
import { execFile } from 'node:child_process';
import path from 'node:path';

const app = express();
app.use(cors());
app.use(express.json()); // needed to parse JSON request bodies

app.post('/run-script', (req, res) => {
  const { i, value } = req.body;

  if (i === undefined || value === undefined) {
    res.status(400).json({ error: 'Missing i or value' });
    return;
  }

  const scriptPath = path.join(__dirname, 'script.py');

  execFile('python3', [scriptPath, String(i), value], (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      res.status(500).json({ error: stderr });
      return;
    }
    console.log('Python output:', stdout); // <-- confirms Python actually ran and what it printed
    res.json({ output: stdout });
  });
});

app.listen(3000, () => console.log('Local dev server running on http://localhost:3000'));