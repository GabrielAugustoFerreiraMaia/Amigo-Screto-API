const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const grupos = []; // Array para armazenar grupos (banco em memória)

// POST: Criar grupo
app.post("/grupos", (req, res) => {
    const { nome } = req.body;
    const novoGrupo = { id: grupos.length + 1, nome, participantes: [], matches: {} };
    grupos.push(novoGrupo);
    res.status(201).json({ mensagem: "Grupo criado com sucesso!", grupo: novoGrupo });
});

// POST: Adicionar participante ao grupo
app.post("/grupos/:id/participantes", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const grupo = grupos.find(g => g.id === parseInt(id));

    if (!grupo) return res.status(404).json({ mensagem: "Grupo não encontrado!" });

    grupo.participantes.push(nome);
    res.status(200).json({ mensagem: "Participante adicionado!", grupo });
});

// POST: Gerar matches
app.post("/grupos/:id/matches", (req, res) => {
    const { id } = req.params;
    const grupo = grupos.find(g => g.id === parseInt(id));

    if (!grupo) return res.status(404).json({ mensagem: "Grupo não encontrado!" });
    if (grupo.participantes.length < 2) return res.status(400).json({ mensagem: "Precisa de pelo menos 2 participantes!" });

    const participantes = [...grupo.participantes];
    const matches = {};

    for (const participante of grupo.participantes) {
        let sorteado;
        do {
            sorteado = participantes[Math.floor(Math.random() * participantes.length)];
        } while (sorteado === participante || Object.values(matches).includes(sorteado));

        matches[participante] = sorteado;
    }

    grupo.matches = matches;
    res.status(200).json({ mensagem: "Matches gerados!", matches });
});

// GET: Saber quem o participante deve presentear
app.get("/grupos/:id/match/:participante", (req, res) => {
    const { id, participante } = req.params;
    const grupo = grupos.find(g => g.id === parseInt(id));

    if (!grupo) return res.status(404).json({ mensagem: "Grupo não encontrado!" });
    if (!grupo.matches[participante]) return res.status(404).json({ mensagem: "Participante não encontrado no grupo!" });

    res.status(200).json({ mensagem: `Você deve presentear ${grupo.matches[participante]}` });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));