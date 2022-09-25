"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paper_1 = __importDefault(require("paper"));
// Set up paper canvas
const paperView = new paper_1.default.PaperScope();
paperView.setup(document.getElementById('main-canvas'));
const circle = new paper_1.default.Path.Circle(paperView.view.center, 50);
circle.fillColor = new paper_1.default.Color("#000000");
