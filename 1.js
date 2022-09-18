import "./styles.css";
import * as PIXI from "pixi.js";

let app = new PIXI.Application({
  width: 720,
  height: 1280
});

const loadOptions = { crossOrigin: true };

app.loader.baseUrl = "./assets/";

app.loader.add("enemy", "48_enemy.png", loadOptions);
app.loader.add("ship_straight", "ship.png", loadOptions);
app.loader.add("ship_turn", "ship_turn.png", loadOptions);
app.loader.add("bg_tiled_layer1", "bg_tiled_layer1.png", loadOptions);
app.loader.add("snake", "snake.png", loadOptions);
app.loader.add("turel_base", "rail_gun_base.png", loadOptions);
app.loader.add("turel_gun", "rail_gun.png", loadOptions);
app.loader.add("projectile", "projectile_yellow.png", loadOptions);
app.loader.add(
  "bg_tiled_layer2",
  "./assets/bg_tiled_layer2_stars.png",
  loadOptions
);
//app.loader.add('ship_straight', './assets/ship_straight.png')

app.loader.load(initLevel);

document.getElementById("app").appendChild(app.view);

let debugGraphics = new PIXI.Graphics();

function initLevel () {
  let enemy = createEnemy();
  enemy.position.set(160, 100);

  let bg2 = createBg(app.loader.resources["bg_tiled_layer2"].texture);
  let bg1 = createBg(app.loader.resources["bg_tiled_layer1"].texture);
  let backgroundY = 0;
  const bgSpeed = 1;

  const shipSpeed = 10;
  let ship = createShip();
  ship.position.set(350, 800);
  let targetMovablePos = new PIXI.Point();

  let leftTurel = createTurel({ turnSpeed: 0.01 });
  leftTurel.children[0].tint = 0xff8080;
  leftTurel.position.set(200, 900);
  leftTurel.targetObject = ship;

  let rightTurel = createTurel();
  rightTurel.position.set(520, 300);

  let snake = createSnake();
  snake.position.set(100, 300);
  rightTurel.targetObject = enemy;

  app.ticker.add(updateLevel);

  let bullets = [];

  app.stage.addChild(debugGraphics);

  function updateLevel (delta) {
    debugGraphics.clear();

    enemy.rotation += delta * 0.01;
    enemy.phase += 0.1 * delta;
    enemy.position.x = 160 + 100 * Math.cos(enemy.phase);
    enemy.position.y = 120 + 60 * Math.sin(enemy.phase);

    updateMovableShip(delta);

    backgroundY = (backgroundY + delta * bgSpeed) % 2048;
    bg2.tilePosition.y = backgroundY;
    bg1.tilePosition.y = backgroundY / 2;

    updateTurrets(delta);
    updateBullets(delta);

    snake.update(delta);

    app.stage.children.forEach(elem => {
      drawObject(elem);
    });
  }

  app.stage.on("pointermove", shipMove);
  app.stage.interactive = true;

  function shipMove (event) {
    targetMovablePos.copyFrom(event.data.global);
    if (targetMovablePos.x < 64) {
      targetMovablePos.x = 64;
    }
    if (targetMovablePos.x > 720 - 64) {
      targetMovablePos.x = 720 - 64;
    }
  }

  let cannons = [new PIXI.Point(-24, -20), new PIXI.Point(24, -20)];

  function updateBullets (delta) {
    for (let i = 0; i < 2; i++) {
      if (Math.random() < 0.1) {
        let bullet = createBullet();
        ship.toGlobal(cannons[i], bullet.position);
        bullets.push(bullet);
      }
    }
    for (let i = 0; i < bullets.length; i++) {
      const bullet = bullets[i];
      bullet.y += bullet.velocityY;
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
      const bullet = bullets[i];

      if (bullet.y < 100) {
        app.stage.removeChild(bullet);
        bullets.splice(i, 1);
      }
    }
  }

  function updateTurrets (delta) {
    leftTurel.update(delta);

    debugGraphics.lineStyle(1.0, 0xff0000);

    rightTurel.phase += delta * 0.001;
    rightTurel.position.y =
      500 + Math.sin(rightTurel.phase * 2 * Math.PI) * 400;

    rightTurel.update(delta);
  }

  function updateMovableShip (delta) {
    const dx = targetMovablePos.x - ship.position.x;

    if (dx > 0) {
      ship.gotoAndStop(3);
    } else if (dx < 0) {
      ship.gotoAndStop(1);
    } else {
      ship.gotoAndStop(0);
    }

    if (dx > 0) {
      if (dx < shipSpeed * delta) {
        ship.position.x = targetMovablePos.x;
      } else {
        ship.position.x += shipSpeed * delta;
      }
    } else if (dx < 0) {
      if (dx > -shipSpeed * delta) {
        ship.position.x = targetMovablePos.x;
      } else {
        ship.position.x -= shipSpeed * delta;
      }
    }
  }
}

function createBullet () {
  let sprite = new PIXI.Sprite(app.loader.resources["projectile"].texture);
  sprite.anchor.set(0.5);
  sprite.velocityY = -10.0;
  app.stage.addChild(sprite);
  return sprite;
}

function createEnemy () {
  let obj = new PIXI.Sprite(app.loader.resources["enemy"].texture);
  obj.scale.set(2);
  obj.rotation = Math.PI / 4;
  obj.anchor.set(0.5);
  obj.phase = 0;

  app.stage.addChild(obj);
  return obj;
}

function createShip () {
  let resources = app.loader.resources;

  let texLeft = resources["ship_turn"].texture;
  let texForward = resources["ship_straight"].texture;
  let texRight = new PIXI.Texture(texLeft.baseTexture, texLeft.frame);
  texRight.rotate = 12;
  let textures = [texForward, texLeft, texForward, texRight];

  let obj = new PIXI.AnimatedSprite(textures, false);
  obj.play();
  obj.animationSpeed = 0.05;
  obj.scale.set(2);
  obj.anchor.set(0.5);
  obj.phase = 0;

  app.stage.addChild(obj);
  return obj;
}

function createBg (tex) {
  let tiling = new PIXI.TilingSprite(tex, 600, 800);
  tiling.position.set(60, 200);
  app.stage.addChildAt(tiling, 0);

  return tiling;
}

function createSnake () {
  let tex = app.loader.resources["snake"].texture;

  let points = [];
  let segmentCount = 20;
  let segmentLength = tex.width / segmentCount;

  for (let i = 0; i < 20; i++) {
    points.push(new PIXI.Point(i * segmentLength, 0));
  }

  let snake = new PIXI.SimpleRope(tex, points);
  app.stage.addChild(snake);
  snake.rotation = Math.PI / 2;

  let phase = 0;
  snake.update = function (delta) {
    phase += 0.1 * delta;
    for (let i = 0; i < 20; i++) {
      points[i].y = Math.sin(i * 0.5 + phase) * 30;
    }
  };

  return snake;
}

function createTurel (options) {
  options = options || {};
  let baseTex = app.loader.resources["turel_base"].texture;
  let gunTex = app.loader.resources["turel_gun"].texture;
  let base = new PIXI.Sprite(baseTex);
  let gun = new PIXI.Sprite(gunTex);

  gun.anchor.set(0.5);
  base.anchor.set(0.5);
  base.scale.set(2);

  base.addChild(gun);

  app.stage.addChild(base);

  base.phase = 0;
  let turnSpeed = options.turnSpeed || 0.025;
  base.targetObject = undefined;
  base.update = function (delta) {
    if (!base.targetObject) {
      return;
    }

    let dx = base.targetObject.position.x - base.position.x;
    let dy = base.targetObject.position.y - base.position.y;
    let rads = Math.atan2(dy, dx) - Math.PI / 2;
    let dr = rads - gun.rotation;

    if (dr > Math.PI) {
      dr -= 2 * Math.PI;
    }
    if (dr < -Math.PI) {
      dr += 2 * Math.PI;
    }

    if (Math.abs(dr) < turnSpeed * delta) {
      gun.rotation = rads;
    } else {
      if (dr > 0) {
        gun.rotation += turnSpeed * delta;
      } else {
        gun.rotation -= turnSpeed * delta;
      }
    }

    debugGraphics.lineStyle(2.0, 0xff0000);
    debugGraphics.moveTo(base.position.x, base.position.y);
    debugGraphics.lineTo(
      base.position.x - Math.sin(gun.rotation) * 200,
      base.position.y + Math.cos(gun.rotation) * 200
    );
    debugGraphics.lineStyle(2.0, 0xff8080);
    debugGraphics.moveTo(base.position.x, base.position.y);
    debugGraphics.lineTo(
      base.position.x - Math.sin(rads) * 200,
      base.position.y + Math.cos(rads) * 200
    );
  };

  return base;
}

function drawObject (entry) {
  if (entry instanceof PIXI.TilingSprite) {
    return;
  }

  const bounds = entry.getBounds(); //AABB
  let color = 0xd0ffd0,
    width = 1.0;
  let p = app.renderer.plugins.interaction.mouse.global;
  if (entry.containsPoint) {
    if (entry.containsPoint(p)) {
      color = 0x00ffff;
      width = 3.0;
    }
  }
  debugGraphics.lineStyle(width, color);

  if (entry instanceof PIXI.SimpleRope) {
    drawMesh(entry);
  }

  debugGraphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function drawMesh (obj) {
  if (!obj.geometry || !obj.indices) {
    return;
  }

  obj.updateTransform();
  obj.calculateVertices();

  let verts = obj.vertexData;
  let indices = obj.indices;
  let count = indices.length;

  let points = [];

  for (let i = 0; i < count; i += 3) {
    points = [];

    for (let j = 0; j < 3; j++) {
      points.push(verts[indices[j + i] * 2 + 0]);
      points.push(verts[indices[j + i] * 2 + 1]);
    }

    debugGraphics.drawPolygon(points);
  }
}
