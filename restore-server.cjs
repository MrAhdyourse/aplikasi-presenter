const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 9999;

app.use(cors());
app.use(express.json());

// SERVE UI STATIC FILES
app.use(express.static(path.join(__dirname, 'restore-ui')));

// Helper untuk eksekusi command shell
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Exec Error: ${error.message}`);
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
};

// --- API ROUTES ---

// 1. GET LIST SNAPSHOTS (Berdasarkan Git Tags 'backup-*')
app.get('/api/snapshots', async (req, res) => {
  try {
    // Ambil tag yang diawali dengan 'backup-'
    const tags = await runCommand('git tag -l "backup-*" --sort=-creatordate');
    const list = tags.split('\n').filter(Boolean).map(tag => {
      return {
        id: tag,
        name: tag.replace('backup-', '').replace(/-/g, ' '),
        timestamp: new Date().toISOString() // Simpelnya
      };
    });
    res.json({ success: true, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. CREATE RESTORE POINT
app.post('/api/snapshot', async (req, res) => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const backupName = `backup-${timestamp}`;
    const message = req.body.message || 'Manual Restore Point';

    // Add all, Commit, and Tag
    await runCommand('git add .');
    try {
      await runCommand(`git commit -m "SNAPSHOT: ${message}"`);
    } catch (e) {
      // Ignore if nothing to commit, just tag
      console.log("Nothing to commit, creating tag only.");
    }
    await runCommand(`git tag -a "${backupName}" -m "${message}"`);

    res.json({ success: true, message: `Restore Point [${backupName}] created!` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. RESTORE (ROLLBACK)
app.post('/api/restore', async (req, res) => {
  const { tagId } = req.body;
  
  if (!tagId) return res.status(400).json({ success: false, message: 'Tag ID required' });

  try {
    // HARD RESET ke Tag tersebut
    console.log(`Restoring to ${tagId}...`);
    await runCommand(`git reset --hard ${tagId}`);
    
    // Opsional: Clean untracked files agar benar-benar bersih
    await runCommand('git clean -fd');

    res.json({ success: true, message: `System restored to ${tagId} successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. DELETE SNAPSHOT
app.delete('/api/snapshot/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await runCommand(`git tag -d "${id}"`);
    res.json({ success: true, message: `Checkpoint ${id} deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. SHUTDOWN SERVER
app.post('/api/shutdown', (req, res) => {
  res.json({ success: true, message: "Engine shutting down..." });
  console.log("[SYSTEM] Shutdown signal received from UI. Exiting...");
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});

// Fallback UI ditangani oleh express.static secara otomatis
// Hapus route '*' yang bermasalah

app.listen(PORT, () => {
  console.log(`
[SYSTEM RESTORE MANAGER] GUI Dashboard siap di http://localhost:${PORT}`);
  console.log(`[INFO] Server ini berjalan independen (Standalone Mode).`);
});
