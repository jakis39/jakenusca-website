import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRef } from "react";
import {
  Engine,
  Events,
  Render,
  World,
  Bodies,
  Body,
  Runner,
  Composite,
  Composites,
  Mouse,
  MouseConstraint
} from "matter-js";
import useWindowDimensions from "../hooks/useWindowDimensions";

export interface MatterEnvironmentProps {
  obstacles?: Array<HTMLElement>;
  bodies?: Array<BouncingSpriteRect>;
}

export interface Sprite {
  path: any;
  height: number;
  width: number;
}

export interface BouncingSpriteRect {
  label?: string;
  sprite: Sprite;
}

const LETTER_LABEL = "FloatingLetter";
const SHAPE_BOUNCINESS = 0.9;
const GRAVITY_Y = 0;

const MatterEnvironment = (props: MatterEnvironmentProps) => {
  const { obstacles, bodies } = props;
  const { width, height } = useWindowDimensions({
    debounce: true
  });
  const scene = useRef(null);
  const [engine, setEngine] = useState<Engine>(null);
  const [initialBodyPositions, setInitialBodyPositions] = useState(null);

  function addWorldBounds(world, containerWidth, containerHeight) {
    const wallWidth = 300;
    const wallOffset = wallWidth / 2;

    // Add walls
    Composite.add(world, [
      Bodies.rectangle(containerWidth / 2, -wallOffset, containerWidth, wallWidth, {
        isStatic: true,
        render: { fillStyle: "transparent" }
      }),
      Bodies.rectangle(-wallOffset, containerHeight / 2, wallWidth, containerHeight, {
        isStatic: true,
        render: { fillStyle: "transparent" }
      }),
      Bodies.rectangle(
        containerWidth / 2,
        containerHeight + wallOffset,
        containerWidth,
        wallWidth,
        {
          isStatic: true,
          render: { fillStyle: "transparent" }
        }
      ),
      Bodies.rectangle(
        containerWidth + wallOffset,
        containerHeight / 2,
        wallWidth,
        containerHeight,
        {
          isStatic: true,
          render: { fillStyle: "transparent" }
        }
      )
    ]);
  }

  function addDOMObstacle(world, element: HTMLElement) {
    if (!element) {
      return;
    }
    const elementRect = element.getBoundingClientRect(),
      elementWidth = element.offsetWidth,
      elementHeight = element.offsetHeight;

    Composite.add(world, [
      Bodies.rectangle(
        elementRect.x + elementWidth / 2,
        elementRect.y + elementHeight / 2,
        elementWidth,
        elementHeight,
        {
          isStatic: true,
          render: { fillStyle: "transparent" }
        }
      )
    ]);
  }

  function createSpriteRectangle(x, y, sprite: Sprite, shapeSize: number) {
    const spriteRatio = sprite.width / sprite.height;
    const shapeHeight = shapeSize,
      shapeWidth = shapeSize * spriteRatio;
    const letter = Bodies.rectangle(x, y, shapeWidth, shapeHeight, {
      restitution: SHAPE_BOUNCINESS,
      chamfer: { radius: 15 },
      render: {
        fillStyle: "grey",
        strokeStyle: "#000000",
        sprite: {
          texture: sprite.path,
          xScale: shapeWidth / sprite.width,
          yScale: shapeHeight / sprite.height
        }
      }
    });
    letter.label = LETTER_LABEL;
    return letter;
  }

  function addBodyStack(
    world,
    columns,
    rows,
    bodies: BouncingSpriteRect[],
    shapeSize,
    containerWidth,
    containerHeight
  ) {
    var stack = Composites.stack(
      // containerWidth - (2 * shapeSize + containerWidth * 0.1),
      20,
      containerHeight / 2 - shapeSize / 2,
      columns,
      rows,
      5,
      20,
      function(x, y, column, row, lastBody, i) {
        return createSpriteRectangle(x, y, bodies[i].sprite, shapeSize);
      }
    );

    Composite.add(world, stack);
  }

  useEffect(() => {
    const containerWidth = scene.current ? scene.current.clientWidth : document.body.clientWidth;
    const containerHeight = scene.current ? scene.current.clientHeight : document.body.clientHeight;
    const shapeSize = containerWidth / 12;

    setInitialBodyPositions(null);

    // create engine
    var newEngine = Engine.create(),
      world = newEngine.world;

    newEngine.gravity.y = GRAVITY_Y;
    setEngine(newEngine);

    // create renderer
    var render = Render.create({
      element: scene.current,
      engine: newEngine,
      options: {
        width: containerWidth,
        height: containerHeight,
        // showAngleIndicator: true,
        background: "transparent",
        wireframes: false,
        pixelRatio: window?.devicePixelRatio
      }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, newEngine);

    addWorldBounds(world, containerWidth, containerHeight);

    // Add DOM obstacles
    obstacles?.forEach(obstacle => addDOMObstacle(world, obstacle));

    // Add bodies
    if (bodies && bodies.length) {
      addBodyStack(world, bodies.length, 1, bodies, shapeSize, containerWidth, containerHeight);
    }

    // Mark original positions of bodies on screen;
    const newInitialBodyPositions = [];
    Composite.allBodies(newEngine.world)
      .filter(body => body.label == LETTER_LABEL)
      .forEach((body, index) => {
        newInitialBodyPositions.push({ ...body.position });
      });
    setInitialBodyPositions(newInitialBodyPositions);

    // add mouse control
    // var mouse = Mouse.create(render.canvas),
    //   mouseConstraint = MouseConstraint.create(newEngine, {
    //     mouse: mouse
    //   });
    // mouse.pixelRatio = window.devicePixelRatio;
    // mouseConstraint.constraint.render.visible = false;
    // // mouseConstraint.constraint.stiffness = 0.2;
    // // mouseConstraint.constraint.damping = 0.3; // not sure whether this does much

    // Composite.add(world, mouseConstraint);

    // // keep the mouse in sync with rendering
    // render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: containerWidth, y: containerHeight }
    });

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render);
      World.clear(newEngine.world, false);
      Engine.clear(newEngine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
      setEngine(null);
    };
  }, [obstacles, bodies, width, height]);

  function resetBodyPositions() {
    const currentBodyPositions = [];
    const currentBodyAngles = [];
    const letters = Composite.allBodies(engine.world).filter(body => body.label == LETTER_LABEL);
    letters.forEach((body, index) => {
      // Freeze body and disable collisions
      Body.setStatic(body, true);
      body.collisionFilter.group = -1;
      // Stop velocities
      Body.setAngularVelocity(body, 0);
      Body.setVelocity(body, { x: 0, y: 0 });
      // Record current position and angle
      currentBodyPositions.push({ ...body.position });
      const reducedAngle = (body.angle % 2) * Math.PI;
      currentBodyAngles.push(reducedAngle);
    });

    let ticker = 0;
    const maxTick = 50; // higher number == slower time for letters to move

    function easeOutQuart(time, beginVal, delta, duration) {
      return -delta * ((time = time / duration - 1) * time * time * time - 1) + beginVal;
    }

    function forceMove(body, endX, endY, ticker, index) {
      // dx is the total distance to move in the X direction
      let dx = endX - currentBodyPositions[index].x;
      // dy is the total distance to move in the Y direction
      let dy = endY - currentBodyPositions[index].y;
      // da is the angle delta
      let da = 0 - currentBodyAngles[index];

      // use dx & dy to calculate where the current [x,y] is at a given ticker
      let x, y, angle;

      if (ticker > maxTick - 1) {
        x = endX;
        y = endY;
        angle = 0;
      } else {
        x = easeOutQuart(ticker, currentBodyPositions[index].x, dx, maxTick);
        y = easeOutQuart(ticker, currentBodyPositions[index].y, dy, maxTick);
        angle = easeOutQuart(ticker, currentBodyAngles[index], da, maxTick);
      }

      Body.setPosition(body, { x: x, y: y });
      Body.setAngle(body, angle);
    }

    function beforeUpdateCallback(event) {
      if (ticker < maxTick + 1) {
        ticker = ticker + 1;
        letters.forEach((letter, index) => {
          const position = initialBodyPositions[index];
          forceMove(letter, position.x, position.y, ticker, index);
        });
      } else {
        letters.forEach((body, index) => {
          body.collisionFilter.group = 1;
          Body.setStatic(body, false);
        });
        Events.off(engine, "beforeUpdate", beforeUpdateCallback);
      }
    }

    Events.on(engine, "beforeUpdate", beforeUpdateCallback);
  }

  function doForce(test?: any) {
    const asdf = test ?? engine;
    if (!asdf || !asdf.world) {
      return;
    }
    const letters = Composite.allBodies(engine.world).filter(body => body.label == LETTER_LABEL);
    letters.forEach((body, index) => {
      Body.applyForce(
        body,
        { x: body.position.x + 100, y: body.position.y + 20 },
        { x: 0, y: -0.001 }
      );
    });
  }

  return (
    <>
      <MatterContainer ref={scene}></MatterContainer>
      <ButtonsContainer>
        <Button onClick={doForce}>force</Button>
        <Button onClick={resetBodyPositions}>Return</Button>
      </ButtonsContainer>
    </>
  );
};

export default MatterEnvironment;

const MatterContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const Button = styled.button`
  margin-left: 10px;
`;
