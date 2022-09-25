"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
process.env.PORT = '3000';
const app = (0, express_1.default)(), dreams = [];
app.use(express_1.default.static('src'));
app.use(express_1.default.json());
app.post('/submit', (req, res) => {
    dreams.push(req.body.newdream);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dreams));
});
app.listen(process.env.PORT);
