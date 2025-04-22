"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { T_PaymentMethod } from "@/app-types-ts";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updUserPaymentMethod } from "@/lib/actions/user.actions";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import { paymentMethodSchema } from "@/lib/validators";

import { paymentMethodsNames } from "./helpers";

type T_Props = {
  preferedMethod: string | null;
};

const PaymentMethodForm = ({ preferedMethod }: T_Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<T_PaymentMethod>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: { type: preferedMethod || DEFAULT_PAYMENT_METHOD },
  });

  const _onSubmit = async (values: T_PaymentMethod) =>
    startTransition(async () => {
      const res = await updUserPaymentMethod(values);

      if (!res.success) {
        toast.error(res.message);
      } else {
        router.push("/place-order");
      }
    });

  return (
    <div className="max-w-72 mx-auto">
      <h1 className="h2-bold mt-4 mb-0">Payment Method</h1>
      <p className="text-sm text-muted-foreground">
        Please select a payment method
      </p>

      <Form {...form}>
        <form
          method="post"
          className="space-y-4"
          onSubmit={form.handleSubmit(_onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-5 mt-12">
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3"
                    >
                      {PAYMENT_METHODS.map((method) => (
                        <FormItem
                          key={method}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={method} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {paymentMethodsNames[method] || method}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end mt-8">
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
export default PaymentMethodForm;
