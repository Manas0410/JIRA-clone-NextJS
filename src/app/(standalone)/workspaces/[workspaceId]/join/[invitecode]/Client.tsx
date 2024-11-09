"use client";

import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import React from "react";

const Client = () => {
  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={Workspace} />
    </div>
  );
};

export default Client;
