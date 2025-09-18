"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = 3000;
const CHANNEL_ID = "2943258";
const THINGSPEAK_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?results=20`;
app.use(express_1.default.static("public"));
app.get("/api/data", async (_req, res) => {
    try {
        const response = await axios_1.default.get(THINGSPEAK_URL);
        const feeds = response.data.feeds.map((entry) => ({
            created_at: entry.created_at,
            temperatura: parseFloat(entry.field2) / 10,
            umidade: parseFloat(entry.field1) / 10,
        }));
        res.json(feeds);
    }
    catch (error) {
        console.error("Erro ao buscar dados do ThingSpeak:", error);
        res.status(500).json({ error: "Erro ao buscar dados" });
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map