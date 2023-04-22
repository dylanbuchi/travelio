"use client";

import { CounterProps, Counter } from "../Counter";
import { ModalContentLayout } from "./ModalContentLayout";

interface InfoModalContentProps {
  counterData: CounterProps[];
  title?: string;
  subtitle?: string;
}

export const InfoModalContent = ({
  counterData,
  subtitle = "What amenities do you have?",
  title = "Share info about your place",
}: InfoModalContentProps) => {
  return (
    <ModalContentLayout title={title} subtitle={subtitle}>
      {counterData.map((item) => (
        <div key={item.subtitle}>
          <Counter
            title={item.title}
            subtitle={item.subtitle}
            value={item.value}
            onChange={item.onChange}
          />
          <hr />
        </div>
      ))}
    </ModalContentLayout>
  );
};
