var player;
var roads = [];

function setup()
{
  createCanvas(780, 800);
  initRoads();
  player = new Player((width / 2), height - 28, 35);
}

function draw()
{
  background(0);
  drawAndUpdateRoads()
  player.update();
  player.draw(color(255, 0, 0));

}

function initRoads()
{
  for (var i = 0; i < 14; i++)
  {
    roads[i] = new Road(height - (height / 14 * (i + 1)), floor(height / 14), color(0, 0, 0));
  }

  roads[0].col = color(255, 0, 255)
  roads[6].col = color(255, 0, 255)
  for (var i = 7; i < 12; i++)
  {
    roads[i].col = color(0, 0, 100);
  }

  roads[1].initCars1();
  roads[2].initCars2();
  roads[3].initCars1();
  roads[4].initCars2();
  roads[5].initCars1();
  roads[7].initTurtle3();
  roads[8].initTrunk1();
  roads[9].initTrunk2();
  roads[10].initTurtle2();
  roads[11].initTrunk3();

  for (var i = 0; i < width; i++)
  {
    roads[1].update();
    roads[2].update();
    roads[5].update();
    roads[7].update();
    roads[8].update();
    roads[11].update();
  }

  for (var i = 0; i < width / 2; i++)
  {
    roads[3].update();
    roads[9].update();
    roads[10].update();
  }

  for (var i = 0; i < width / 5; i++)
  {
    roads[4].update();
  }
}

function drawAndUpdateRoads()
{
  for (var i = 0; i < 14; i++)
  {
    roads[i].update();
    roads[i].draw();
  }
}

function resetSketch()
{
  player = null;
  roads = [];
  initRoads();
  player = new Player((width / 2), height - 28, 35);
}