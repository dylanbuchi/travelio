import React from "react";
import { SOCIAL_BUTTONS } from "./constants";
import { Button } from "./Button";

export const SocialButtons = () => {
  return (
    <>
      {SOCIAL_BUTTONS.map((item) => (
        <div
          key={item.id}
          className="mt-1 flex flex-col gap-4 text-neutral-500"
        >
          <Button
            outline
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        </div>
      ))}
    </>
  );
};
