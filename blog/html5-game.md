---
slug: html5-game
title: "Building a HTML5 game with KaplayJS"
date: 08/22/2024
draft: true
authors: rohan
---

![https://unsplash.com/photos/red-blue-and-yellow-lego-minifig-pRS6itEjhyI](/static/img/html5-game/boukaih-pRS6itEjhyI-unsplash.webp)

## Introduction

Creating 2D games is not only fun but also a great way to learn and practice coding. In this blog post, we'll build a simple game using KaplayJS, a JavaScript game development library. The game is about controlling a character, "the bean", and helping it jump over pipes to avoid collisions. Let's break down the steps and understand how the game works!

## Setting Up the Game Environment

We start by loading some essential assets for our game: a character sprite (our bean). Here&apos;s the code to load them:

```js
kaplay();

loadSprite("bean", "/sprites/bean.png");
loadSound("score", "/examples/sounds/score.mp3");
loadSound("wooosh", "/examples/sounds/wooosh.mp3");
loadSound("hit", "/examples/sounds/hit.mp3");
```

- `loadSprite()` loads the bean's image, which we'll use for the player character.

## Setting Gravity

Next, we define gravity using:

```js
setGravity(3200);
```

This sets the gravity of the game world, making the bean fall unless it jumps. It ensures our bean behaves as expected in a physics-based environment.

## Creating the Main Game Scene

KaplayJS organizes game logic in **scenes**, and we define the core gameplay inside a "game" scene:

```js
scene("game", () => {
  // Game logic goes here
});
```

Inside the scene, we initialize the bean and the pipes.

## The Bean Character

The bean is the player character, and it's created with the following:

```js
const bean = add([sprite("bean"), pos(width() / 4, 0), area(), body()]);
```

Here&apos;s what each part does:

- `sprite("bean")`: Draws the bean sprite.
- `pos(width() / 4, 0)`: Places the bean at a quarter of the screen&apos;s width and the top of the screen.
- `area()`: Adds a collider for detecting collisions.
- `body()`: Makes the bean affected by gravity and allows it to jump.

## Jumping Mechanism

To make the game interactive, the bean needs to jump. We enable jumping with several input options:

```js
onKeyPress("space", () => bean.jump(JUMP_FORCE));
onGamepadButtonPress("south", () => bean.jump(JUMP_FORCE));
onClick(() => bean.jump(JUMP_FORCE));
```

- **Spacebar** for keyboard control.
- **Gamepad** button for controller users.
- **Clicking** for mobile or desktop users.

## Generating Pipes

The game&apos;s challenge comes from the pipes, which the bean must avoid. Here&apos;s how we generate them:

```js
function spawnPipe() {
  const h1 = rand(PIPE_MIN, height() - PIPE_MIN - PIPE_OPEN);
  const h2 = height() - h1 - PIPE_OPEN;

  add([pos(width(), 0), rect(64, h1), area(), move(LEFT, SPEED), "pipe"]);

  add([
    pos(width(), h1 + PIPE_OPEN),
    rect(64, h2),
    area(),
    move(LEFT, SPEED),
    "pipe",
    { passed: false },
  ]);
}
```

- `rand()` generates random heights for the pipes.
- `add()` creates the pipes as rectangles that move from right to left at a set speed.
- `move(LEFT, SPEED)` keeps the pipes moving across the screen.

We generate a new pipe every second:

```js
loop(1, () => spawnPipe());
```

## Scoring and Collisions

The game adds points every time the bean successfully passes through a pair of pipes. This is handled with an update event:

```js
onUpdate("pipe", (p) => {
  if (p.pos.x + p.width <= bean.pos.x && p.passed === false) {
    addScore();
    p.passed = true;
  }
});
```

If the bean collides with a pipe, it&apos;s game over:

```js
bean.onCollide("pipe", () => {
  go("lose", score);
  play("hit");
  addKaboom(bean.pos);
});
```

## The Lose Scene

When the player loses (either by hitting a pipe or falling off the screen), we switch to a "lose" scene that displays the final score:

```js
scene("lose", (score) => {
  add([
    sprite("bean"),
    pos(width() / 2, height() / 2 - 108),
    scale(3),
    anchor("center"),
  ]);
  add([
    text(score),
    pos(width() / 2, height() / 2 + 108),
    scale(3),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("game"));
  onClick(() => go("game"));
});
```

Here, the player can restart the game by pressing space or clicking anywhere.

## Game Initialization

Finally, the game starts with this line:

```js
go("game");
```

This loads the "game" scene and kicks off the gameplay.
