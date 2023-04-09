"use client";

import { CounterProps, Counter } from "@/app/components/Counter";
import { ModalContentLayout } from "./ModalContentLayout";

interface InfoModalContentProps {
  counterData: CounterProps[];
}

export const InfoModalContent = ({ counterData }: InfoModalContentProps) => {
  return (
    <ModalContentLayout
      title={"Share info about your place"}
      subtitle={"What amenities do you have?"}
    >
      {counterData.map((item) => (
        <>
          <Counter
            title={item.title}
            subtitle={item.subtitle}
            value={item.value}
            onChange={item.onChange}
          />
          <hr />
        </>
      ))}
    </ModalContentLayout>
  );
};
