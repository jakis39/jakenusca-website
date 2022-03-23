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

  const [letterJ, setLetterJ] = useState<Body>(null);

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
    if (letterJ === null) {
      setLetterJ(letter);
    }
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

    // console.log(bodies.length);

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
    console.log(newInitialBodyPositions);
    setInitialBodyPositions(newInitialBodyPositions);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(newEngine, {
        mouse: mouse
      });
    mouse.pixelRatio = window.devicePixelRatio;
    mouseConstraint.constraint.render.visible = false;
    // mouseConstraint.constraint.stiffness = 0.2;
    // mouseConstraint.constraint.damping = 0.3; // not sure whether this does much

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

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

  function forceMove(body, endX, endY, pct) {
    // dx is the total distance to move in the X direction
    let dx = endX - body.position.x;

    // dy is the total distance to move in the Y direction
    let dy = endY - body.position.y;

    // use dx & dy to calculate where the current [x,y] is at a given pct
    let x = body.position.x + (dx * pct) / 100;
    let y = body.position.y + (dy * pct) / 100;

    Body.setPosition(body, {
      x: x,
      y: y
    });
  }

  function handleClick() {
    console.log(letterJ.position);
    Body.setStatic(letterJ, true);
    console.log(Composite.allBodies(engine.world));

    const letters = Composite.allBodies(engine.world).filter(body => body.label == LETTER_LABEL);
    letters.forEach((body, index) => {
      Body.setStatic(body, true);
      // body.collisionFilter.group = -1;
      Body.setAngle(body, 0);
      Body.setAngularVelocity(body, 0);
      Body.setVelocity(body, { x: 0, y: 0 });
      console.log(body.position, initialBodyPositions[index]);
      Body.setPosition(body, initialBodyPositions[index]);
      Body.setStatic(body, false);
    });

    // let pct = 0;
    // Events.on(engine, "beforeUpdate", function(event) {
    //   if (pct < 101) {
    //     pct = pct + 1;
    //     forceMove(letterJ, 0, 0, pct);
    //   }
    // });
  }

  return (
    <>
      <MatterContainer ref={scene}></MatterContainer>
      <Button onClick={handleClick}>Return</Button>
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
`;

const Button = styled.button`
  display: block;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
