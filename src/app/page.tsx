"use client";

import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import clsx from "clsx";

type ItemType = {
  id: number;
  name: string;
};

const CONTAINER_WIDTH = 256;
const ITEM_WIDTH = 80;
const CONTAINER_CENTER = CONTAINER_WIDTH / 2 - ITEM_WIDTH / 2;
const POSITION = {
  init: {
    L: {
      left: CONTAINER_CENTER - 30,
      top: -20,
      rotate: -16,
      scale: 0.75,
    },
    M: {
      left: CONTAINER_CENTER,
      top: 0,
      rotate: 0,
      scale: 1,
    },
    R: {
      left: CONTAINER_CENTER + 30,
      top: -20,
      rotate: 16,
      scale: 0.75,
    },
  },
  hover: {
    L: {
      left: 0,
      top: 0,
      rotate: 0,
      scale: 0.8,
    },
    M: {
      left: CONTAINER_CENTER,
      top: 0,
      rotate: 0,
      scale: 0.8,
    },
    R: {
      left: CONTAINER_WIDTH - ITEM_WIDTH,
      top: 0,
      rotate: 0,
      scale: 0.8,
    },
  },
};

function isLeft(itemList: ItemType[], id: number, current: number) {
  return (
    Math.min(
      ...itemList.filter(({ id }) => id !== current).map(({ id }) => id)
    ) === id
  );
}

export default function Home() {
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [scopeA, animateA] = useAnimate();
  const [scopeB, animateB] = useAnimate();
  const [scopeC, animateC] = useAnimate();

  const ITEM_LIST = [
    { id: 0, name: "A", scope: scopeA, animate: animateA },
    { id: 1, name: "B", scope: scopeB, animate: animateB },
    { id: 2, name: "C", scope: scopeC, animate: animateC },
  ];

  function onHoverStart() {
    animation("hover");
  }
  function onHoverEnd() {
    animation("init");
  }

  function animation(state: "init" | "hover") {
    ITEM_LIST.map(({ id, scope, animate }) => {
      const flag =
        id === current ? "M" : isLeft(ITEM_LIST, id, current) ? "L" : "R";
      animate(scope.current, POSITION[state][flag]);
    });
  }

  function onReset() {
    setCurrent(1);
    setCount(count + 1);
  }

  useEffect(() => {
    animation("init");
  }, [count, current]);

  return (
    <main className="flex flex-col gap-28 min-h-screen justify-center items-center">
      <motion.div
        className="flex items-center relative w-64 h-20"
        key={count}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
      >
        {ITEM_LIST.map(({ id, scope }) => (
          <motion.div
            key={id}
            ref={scope}
            className={clsx(
              "absolute left-[88px] scale-95 w-20 h-20 border-2 border-gray-500 bg-white rounded-xl duration-100 hover:!scale-90 cursor-pointer",
              id === current && "z-10 !bg-gray-100"
            )}
            onClick={() => setCurrent(id)}
          />
        ))}
      </motion.div>
      <button className="underline" onClick={onReset}>
        Reset
      </button>
      <p className="fixed bottom-0 p-4 w-full text-gray-400">
        <a
          href="https://twitter.com/imyuanx"
          target="_blank"
          className="underline"
        >
          @yuanx
        </a>
      </p>
    </main>
  );
}
