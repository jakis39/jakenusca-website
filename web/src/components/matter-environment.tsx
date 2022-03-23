import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
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
  sprite: Sprite;
}

const SHAPE_BOUNCINESS = 0.9;
const GRAVITY_Y = 0;

const MatterEnvironment = (props: MatterEnvironmentProps) => {
  const { obstacles, bodies } = props;
  const scene = useRef(null);
  const { width, height } = useWindowDimensions({
    debounce: true
  });

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
    return Bodies.rectangle(x, y, shapeWidth, shapeHeight, {
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

    // console.log(bodies.length);

    // create engine
    var engine = Engine.create(),
      world = engine.world;

    engine.gravity.y = GRAVITY_Y;

    // create renderer
    var render = Render.create({
      element: scene.current,
      engine: engine,
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
    Runner.run(runner, engine);

    addWorldBounds(world, containerWidth, containerHeight);

    // Add DOM obstacles
    obstacles?.forEach(obstacle => addDOMObstacle(world, obstacle));

    // Add bodies
    if (bodies && bodies.length) {
      addBodyStack(world, bodies.length, 1, bodies, shapeSize, containerWidth, containerHeight);
    }

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
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
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, [obstacles, bodies, width, height]);

  return <MatterContainer ref={scene} />;
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
