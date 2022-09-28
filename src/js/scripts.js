import paper from "paper";
//*********
//* Setup *
//*********
// Set up paper canvas
const paperView = new paper.PaperScope();
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
/**
 * Submit a POST request with a new path to add to the database
 * @param path The path to post to the server
 */
function submitPath(path) {
    const body = path.exportJSON();
    fetch('/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    })
        .then((response) => response.json())
        .then((json) => {
        console.log(json);
    });
}
function refreshPaths() {
    fetch('/canvas', { method: 'GET' })
        .then(response => response.json())
        .then(json => {
        // Clear canvas and replace with updated paths
        const updatedPaths = json;
        paperView.project.clear();
        for (let userPath of updatedPaths) {
            const currPath = new paper.Path();
            currPath.importJSON(JSON.stringify(userPath.path));
            userPath.path = currPath;
            paths.push(userPath);
        }
    });
}
//*********************
//* Utility Functions *
//*********************
// Boilerplate for a new path with stroke color and width
function initPath() {
    const newPath = new paper.Path();
    newPath.strokeColor = new paper.Color("black");
    newPath.fullySelected = true;
    newPath.strokeWidth = 10;
    newPath.strokeCap = "round";
    return newPath;
}
// Convert canvas local position to position in canvas
function getMousePos(x, y) {
    const rect = canvas.getBoundingClientRect();
    const canvasRes = new paper.Point(canvas.width, canvas.height);
    return new paper.Point(x - rect.left - 15, y - rect.top - 15);
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
            paths.push({ path: currentPath, user: "cjacobson32", id: paths.length });
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
            submitPath(currentPath);
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
