
import paper from "paper"

// Set up paper canvas
const paperView = new paper.PaperScope();
paperView.setup(<HTMLCanvasElement>document.getElementById('main-canvas'));

const circle = new paper.Path.Circle(paperView.view.center, 50);

circle.fillColor = new paper.Color("#000000");
