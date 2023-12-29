import React from "react";
import { useSpring, animated } from "react-spring";

export function DigitalDisplay({
  title,
  number,
}: {
  title: string;
  number: number;
}) {
  const startNumber = number > 0 ? number * 0.9 : number; // 如果 number 大于 0，从稍小的值开始动画
  const props = useSpring({ number, from: { number: startNumber } });

  return (
    <div className="flex flex-col items-center justify-center p-6 lg:p-16 lg:w-1/5">
      <animated.span className="lg:text-4xl text-xl  p-2 font-bold">
        {props.number.to((n) => Number(n.toFixed(0)).toLocaleString("en-US"))}
      </animated.span>
      <span className="lg:p-2 text-gray-400 lg:text-lg text-base">{title}</span>
    </div>
  );
}
