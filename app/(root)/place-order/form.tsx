"use client";

import { FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order.actions";

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full mt-4" disabled={pending} type="submit">
      {pending ? <Spinner /> : <Check />} Place Order
    </Button>
  );
};

function PlaceOrderForm() {
  const router = useRouter();

  const _handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await createOrder();
    if (res.redirectTo) {
      router.push(res.redirectTo);
    } else if (!res.success) {
      toast.error(res.message);
    }
  };

  return (
    <form onSubmit={_handleSubmit} className="w-full">
      <SubmitBtn />
    </form>
  );
}
export default PlaceOrderForm;
