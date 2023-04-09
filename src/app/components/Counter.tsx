"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}
export const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {
  const addValue = useCallback(() => {
    onChange(Math.min(value + 1, 99));
  }, [value, onChange]);

  const reduceValue = useCallback(() => {
    onChange(Math.max(1, value - 1));
  }, [value, onChange]);

  const PlusButton = () => (
    <button
      onClick={addValue}
      className="border-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-neutral-400 text-neutral-600 transition hover:opacity-70"
    >
      <AiOutlinePlus />
    </button>
  );

  const MinusButton = () => (
    <button
      onClick={reduceValue}
      className="border-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-neutral-400 text-neutral-600 transition hover:opacity-70"
    >
      <AiOutlineMinus />
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col text-center sm:text-start">
        <h3 className="text-base font-medium">{title}</h3>
        <h4 className="whitespace-nowrap text-sm font-light text-gray-600">
          {subtitle}
        </h4>
      </div>
      <div className="flex items-center justify-center sm:justify-start">
        <MinusButton />
        <div className="text-base font-semibold text-neutral-900">{value}</div>
        <PlusButton />
      </div>
    </div>
  );
};
