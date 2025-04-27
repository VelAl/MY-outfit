"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { T_Message } from "@/app-types-ts";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import Spinner from "../spinner";

type T_Props = {
  id: string;
  action: (id: string) => Promise<T_Message>;
};

const DeleteDialog = ({ id, action }: T_Props) => {
  const [open, setopen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const _handleDelete = () =>
    startTransition(async () => {
      const res = await action(id);

      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      setopen(false);
    });

  return (
    <AlertDialog open={open} onOpenChange={setopen}>
      <AlertDialogTrigger asChild>
        <Trash2 className="transition-transform duration-200 hover:scale-120 cursor-pointer" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you really want to delete?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          This action can not be undone.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button disabled={isPending} onClick={_handleDelete}>
            {isPending && <Spinner />}
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
