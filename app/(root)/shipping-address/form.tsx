"use client";

import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { T_ShippingAddress } from "@/app-types-ts";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updUserAddress } from "@/lib/actions/user.actions";
import { shippingAddressSchema } from "@/lib/validators";

import { emptyShippingAddress, inputsStructure } from "./helpers";

type T_Props = {
  address: T_ShippingAddress | null;
};

const ShippingAddressForm = ({ address }: T_Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<T_ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || emptyShippingAddress,
  });

  const _onSubmit: SubmitHandler<T_ShippingAddress> = async (values) => {
    startTransition(async () => {
      const res = await updUserAddress(values);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      router.push("/payment-method");
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="h2-bold mt-4 mb-0">Shipping Address</h1>
      <p className="text-sm text-muted-foreground">
        Please enter an address to ship to
      </p>

      <Form {...form}>
        <form
          method="post"
          className="space-y-4"
          onSubmit={form.handleSubmit(_onSubmit)}
        >
          {inputsStructure.map(({ label, name }) => (
            <div key={name} className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter ${label}`} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : <ArrowRight height={4} width={4} />}{" "}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ShippingAddressForm;
