"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paper_1 = __importDefault(require("paper"));
//*********
//* Setup *
//*********
// Set up paper canvas
const paperView = new paper_1.default.PaperScope();
const canvas = document.getElementById('main-canvas');
const canvasHolder = canvas.parentElement;
// Set initial canvas size before adding paperView
canvas.width = canvasHolder.clientWidth - 100;
canvas.height = canvas.width / 2;
paperView.setup(canvas);
// Track all paths currently in the scene
const paths = [];
let currentPath;
//**************
//* Networking *
//**************
//*********************
//* Utility Functions *
//*********************
// Boilerplate for a new path with stroke color and width
function initPath() {
    const newPath = new paper_1.default.Path();
    newPath.strokeColor = new paper_1.default.Color("black");
    newPath.fullySelected = true;
    newPath.strokeWidth = 10;
    newPath.strokeCap = "round";
    return newPath;
}
// Convert canvas local position to position in canvas
function getMousePos(x, y) {
    const rect = canvas.getBoundingClientRect();
    const canvasRes = new paper_1.default.Point(canvas.width, canvas.height);
    return new paper_1.default.Point(x - rect.left - 15, y - rect.top - 15);
}
//***********************
//* Handle Mouse Events *
//***********************
// Check for mouse dragging
let leftMouseDown = false;
let middleMouseDown = false;
let rightMouseDown = false;
canvas.addEventListener("mousedown", ev => {
    switch (ev.button) {
        case 0: // Left mouse button
            leftMouseDown = true;
            // Init path
            currentPath = initPath();
            paths.push(currentPath);
            currentPath.add(getMousePos(ev.x, ev.y));
            break;
        case 1: // Left mouse button
            middleMouseDown = true;
            break;
        case 2: // Left mouse button
            rightMouseDown = true;
            break;
    }
});
window.addEventListener("mouseup", ev => {
    switch (ev.button) {
        case 0: // Left mouse button
            leftMouseDown = false;
            // Simplify line with fewer points
            currentPath.simplify();
            // If the path is empty, remove it immediately (this happens if the user just clicks)
            if (currentPath.segments.length <= 1) {
                paths.pop();
                currentPath.remove();
            }
            currentPath = null;
            break;
        case 1: // Middle mouse button
            middleMouseDown = false;
            break;
        case 2: // Right mouse button
            rightMouseDown = false;
            break;
    }
});
// Draw line when mouse is dragged
canvas.addEventListener("mousemove", ev => {
    if (leftMouseDown) {
        currentPath?.add(getMousePos(ev.x, ev.y));
    }
});
