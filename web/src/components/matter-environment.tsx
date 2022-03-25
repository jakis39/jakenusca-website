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
import { easeInOutCubic } from "../lib/timing-functions";
import { isMobileBrowser } from "../lib/helpers";

export interface Sprite {
  path: any;
  height: number;
  width: number;
}

export interface BouncingSpriteRect {
  label?: string;
  sprite: Sprite;
}

enum ScrollDirection {
  Down,
  Up
}

const LETTER_LABEL = "FloatingLetter";
const SHAPE_BOUNCINESS = 0.9;
const GRAVITY_Y = 0;

export interface MatterEnvironmentProps {
  obstacles?: Array<HTMLElement>;
  bodies?: Array<BouncingSpriteRect> | Array<Array<BouncingSpriteRect>>;
}

const MatterEnvironment = (props: MatterEnvironmentProps) => {
  const { obstacles, bodies } = props;
  const { width, height } = useWindowDimensions({
    debounce: true,
    // mobile browser address bar shenanigans cause a redraw of whole environment,
    //  so ignore height changes on mobile devices
    ignoreHeight: isMobileBrowser()
  });
  const scene = useRef(null);
  const [engine, setEngine] = useState<Engine>(null);
  const [initialBodyPositions, setInitialBodyPositions] = useState(null);
  const [isResettingBodies, setIsResettingBodies] = useState(false);
  const [bodiesAreHome, setBodiesAreHome] = useState(true);
  const [shapeScale, setShapeScale] = useState(null);

  const [scrollPosition, _setScrollPosition] = useState(0);
  const scrollPositionRef = useRef(scrollPosition);
  const setScrollPosition = val => {
    scrollPositionRef.current = val;
    _setScrollPosition(val);
  };

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

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

  function determineAppropriateShapeSize(
    longestArrayLength: number,
    containerWidth: number,
    containerHeight: number
  ) {
    const shapeSize = Math.min(containerWidth / (longestArrayLength + 1), containerHeight / 5);
    console.log("shapeSize", shapeSize);
    return shapeSize;
  }

  function addBodyStacks(
    world: World,
    bodies: BouncingSpriteRect[] | BouncingSpriteRect[][],
    containerWidth,
    containerHeight
  ) {
    const bodiesArrays = Array.isArray(bodies[0])
      ? (bodies as BouncingSpriteRect[][])
      : [bodies as BouncingSpriteRect[]];
    const numLines = bodiesArrays.length;

    // Determine shape size
    const arrayLengths = bodiesArrays.map(a => a.length);
    const longestArrayLength = Math.max(...arrayLengths);
    const longestArray = bodiesArrays[
      arrayLengths.indexOf(longestArrayLength)
    ] as BouncingSpriteRect[];
    const shapeSize = determineAppropriateShapeSize(
      longestArrayLength,
      containerWidth,
      containerHeight
    );
    setShapeScale(shapeSize);

    // Determine vertical positioning to center words
    const lineSpacing = shapeSize / 6;
    const letterSpacing = shapeSize / 20;
    const yOffset = Math.round(
      containerHeight / 2 - (shapeSize / 2) * numLines - lineSpacing * (numLines - 1)
    );

    // Determine x offset to center words in screen
    const widestWidth = Math.round(
      longestArray.reduce((partialSum, letter) => {
        const spriteRatio = letter.sprite.width / letter.sprite.height;
        const shapeHeight = shapeSize,
          shapeWidth = shapeSize * spriteRatio;
        return partialSum + shapeWidth;
      }, 0)
    );
    const xOffset = containerWidth / 2 - widestWidth / 2;

    bodiesArrays.forEach((array, index) => {
      var stack = Composites.stack(
        // containerWidth - (2 * shapeSize + containerWidth * 0.1),
        xOffset,
        yOffset + (shapeSize + lineSpacing) * index,
        array.length,
        1,
        letterSpacing,
        lineSpacing,
        function(x, y, column, row, lastBody, i) {
          return createSpriteRectangle(x, y, array[i].sprite, shapeSize);
        }
      );
      Composite.add(world, stack);
    });
  }

  function addMouseControl(render: Render, eng: Engine, world: World) {
    const mouse = Mouse.create(render.canvas);

    // doesn't work
    // mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    // mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(eng, {
      mouse: mouse
    });
    mouse.pixelRatio = window.devicePixelRatio;
    mouseConstraint.constraint.render.visible = false;
    // mouseConstraint.constraint.stiffness = 0.2;
    // mouseConstraint.constraint.damping = 0.3; // not sure whether this does much

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
  }

  useEffect(() => {
    const containerWidth = scene.current ? scene.current.clientWidth : document.body.clientWidth;
    const containerHeight = scene.current ? scene.current.clientHeight : document.body.clientHeight;

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
      addBodyStacks(world, bodies, containerWidth, containerHeight);
    }

    // Mark original positions of bodies on screen;
    const newInitialBodyPositions = [];
    Composite.allBodies(newEngine.world)
      .filter(body => body.label == LETTER_LABEL)
      .forEach(body => {
        newInitialBodyPositions.push({ ...body.position });
      });
    setInitialBodyPositions(newInitialBodyPositions);

    // add mouse control
    // addMouseControl(render, newEngine, world);

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
    if (isResettingBodies) {
      return;
    }
    setIsResettingBodies(true);
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
      const reducedAngle = body.angle % (2 * Math.PI);
      currentBodyAngles.push(reducedAngle);
    });

    let ticker = 0;
    const maxTick = 30; // higher number == slower time for letters to move

    function timingFunction(time, beginVal, delta, duration) {
      return easeInOutCubic(time, beginVal, delta, duration);
    }

    function forceMove(body, endX, endY, ticker, index) {
      // source: https://github.com/liabru/matter-js/issues/733

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
        x = timingFunction(ticker, currentBodyPositions[index].x, dx, maxTick);
        y = timingFunction(ticker, currentBodyPositions[index].y, dy, maxTick);
        angle = timingFunction(ticker, currentBodyAngles[index], da, maxTick);
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
        setIsResettingBodies(false);
        setBodiesAreHome(true);
      }
    }

    Events.on(engine, "beforeUpdate", beforeUpdateCallback);
  }

  function applyForceOnBodies() {
    if (!engine || !engine.world) {
      return;
    }
    const letters = Composite.allBodies(engine.world).filter(body => body.label == LETTER_LABEL);
    const forceDirection = scrollDirection === ScrollDirection.Down ? -1 : 1;
    const force = 0.00001 * shapeScale * forceDirection;
    letters.forEach(body => {
      Body.applyForce(body, { x: body.position.x + 0.2 * shapeScale, y: 0 }, { x: 0, y: force });
    });
    setBodiesAreHome(false);
  }

  useEffect(() => {
    function scrollListener() {
      const newScroll = document.body.scrollTop;
      const oldScroll = scrollPositionRef.current;
      setScrollDirection(newScroll > oldScroll ? ScrollDirection.Down : ScrollDirection.Up);
      setScrollPosition(newScroll);
    }

    document.body.addEventListener("scroll", scrollListener);

    return () => {
      document.body.removeEventListener("scroll", scrollListener);
    };
  }, [engine]);

  useEffect(() => {
    if (
      scrollPosition < 100 &&
      scrollDirection === ScrollDirection.Up &&
      !bodiesAreHome &&
      !isResettingBodies
    ) {
      resetBodyPositions();
    } else {
      applyForceOnBodies();
    }
  }, [scrollPosition]);

  return (
    <>
      <MatterContainer ref={scene}></MatterContainer>
      <ScrollIndicator>{scrollDirection === ScrollDirection.Down ? "↓" : "↑"}</ScrollIndicator>
      <ButtonsContainer>
        <Button onClick={applyForceOnBodies}>force</Button>
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

const ScrollIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 3em;
`;
