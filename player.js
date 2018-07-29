class Player
{
  constructor(x, y, w)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.speed = floor(height / 14);
    this.canMove = true;
    this.col = color(255, 0, 0);
    this.roadCount = 0;
    this.countdown = 1;
    this.attached = false;
    this.attachedObj = undefined;
    this.attachedDist = 0;
  }

  update()
  {
    this.move();
    var coll = this.collision();
    if (this.roadCount > 6)
    {
      if (!coll[0] || this.x + this.w / 2 < 0 || this.x - this.w / 2 > width)
      {
        this.die();
      }
      else
      {
        //coll[1] -> contiene ll'oggetto con cui è in collisione (tronco o tartaruga)
        if (!this.attached || this.attachedObj != coll[1])
        {
          this.attached = true;
          this.attachedObj = coll[1];
          this.attachedDist = this.attachedObj.x - this.x;
        }
      }
    }
    else
    {
      this.attached = false;
      if (coll[0])
      {
        this.die();
      }
    }

    this.scorr();
  }

  scorr()
  {
    if (this.attached)
    {
      for (var i = 0; i < this.attachedObj.speed; i++)
      {
        this.x += 1 * this.attachedObj.dir;
      }
    }
  }

  collision()
  {
    for (var r of roads)
    {
      for (var o of r.objs)
      {
        var coll = o.collision(this.x, this.y, this.w, this.w);
        if (coll[0])
          return coll;
      }
    }
    return [false, 0];
  }

  move()
  {
    if (keyIsPressed)
    {
      if (this.canMove)
      {
        if (!this.reachedEdges(keyCode))
        {
          //update road counter
          if (keyCode === UP_ARROW)
          {
            this.roadCount++;
          }

          if (keyCode === DOWN_ARROW)
          {
            this.roadCount--;
          }

          //effectively move the player
          for (var i = 0; i < this.speed; i++)
          {
            this.canMove = false;
            //update collision
            if (keyCode === UP_ARROW)
            {
              this.y -= 1;
            }

            if (keyCode === DOWN_ARROW)
            {
              this.y += 1;
            }

            if (keyCode === LEFT_ARROW)
            {
              this.x -= 1;
            }

            if (keyCode === RIGHT_ARROW)
            {
              this.x += 1;
            }
          }
        }
      }
    }
    else
    {
      this.canMove = true;
    }
  }

  reachedEdges(key)
  {
    var left = 0,
      right = 0,
      up = 0,
      down = 0;
    switch (key)
    {
      case UP_ARROW:
        up = this.speed;
        break;
      case DOWN_ARROW:
        down = this.speed;
        break;
      case LEFT_ARROW:
        left = this.speed;
        break;
      case RIGHT_ARROW:
        right = this.speed;
        break;

    }
    return (this.x + (this.w / 2) + right > width || this.x - (this.w / 2) - left < 0 || this.y + (this.w / 2) + down > height || this.y - (this.w / 2) - up < 0);
  }

  draw()
  {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    stroke(72);
    strokeWeight(4)
    fill(this.col);
    rect(0, 0, this.w, this.w);
    pop();
  }

  die()
  {
    frameRate(1);
    if (this.countdown == 0)
    {
      frameRate(60);
      this.reset();
      return;
    }
    else
      this.countdown--;

  }

  reset()
  {
    // this.x = (width / 2);
    // this.y = height - 28;
    // this.roadCount = 0;
    // this.countdown = 1;
    resetSketch();
  }
}