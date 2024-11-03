"use client";

import { RiAddCircleFill } from "react-icons/ri";

export const Projects = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between mb-4">
        <p className="text-neutral-500 uppercase text-xs">Projects</p>
        <RiAddCircleFill
          onClick={() => {}}
          className="text-neutral-500 cursor-pointer size-5 hover:opacity-75 transition-all"
        />
      </div>
    </div>
  );
};
