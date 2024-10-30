"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, ButtonProps } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/responsive-modal";

export const useConfirm = (
  title: string,
  message: string,
  variant: ButtonProps["variant"] = "primary"
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    if (promise) {
      promise.resolve(true);
      setPromise(null);
    }
  };

  const handleCancel = () => {
    if (promise) {
      promise.resolve(false);
      setPromise(null);
    }
  };

  const ConfirmationDialogBox = () => {
    return (
      <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
        <Card className="w-full h-full border-none shadow-none">
          <CardContent>
            <CardHeader className="p-0 pt-4">
              <CardTitle className="mt-3">{title}</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <div className="pt-4 w-full flex flex-col lg:flex-row gap-x-2 items-center justify-end gap-y-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full lg:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant={variant}
                onClick={handleConfirm}
                className="w-full lg:w-auto"
              >
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      </ResponsiveModal>
    );
  };

  return [ConfirmationDialogBox, confirm];
};
