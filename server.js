import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANTE: Servir arquivos de áudio e capas diretamente
app.use('/audios', express.static(path.join(__dirname, 'data', 'audios')));
app.use('/covers', express.static(path.join(__dirname, 'data', 'covers')));

// API Routes
const songs = JSON.parse(fs.readFileSync("./data/songs.json", "utf8"));

app.get("/api/songs", (req, res) => {
    res.json(songs);
});

app.get("/api/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const song = songs.find((m) => m.id === id);

    if (!song) {
        return res.status(404).json({ error: "Música não encontrada" });
    }

    res.json(song);
});

// Servir o frontend buildado (React)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback para SPA
app.use((req, res, next) => {
    if (!req.path.startsWith('/api') && 
        !req.path.startsWith('/audios') && 
        !req.path.startsWith('/covers')) {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } else {
        next();
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
