"use client";
import { useTransition } from "react";
import { toast } from "sonner";

import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { updateOrderToPaidCOD } from "@/lib/actions/order.actions";

const MarkOrderAsPaidBtn = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  const _handleSubmit = () =>
    startTransition(async () => {
      const res = await updateOrderToPaidCOD(id);

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    });

  return (
    <Button disabled={isPending} onClick={_handleSubmit}>
      {isPending && <Spinner />}
      {isPending ? "Confirming..." : "Mark As Paid"}
    </Button>
  );
};

export default MarkOrderAsPaidBtn;
