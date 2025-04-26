"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

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
import { updUserProfile } from "@/lib/actions/user.actions";
import { updUserProfileSchema } from "@/lib/validators";

type T_UpdateProfileValues = z.infer<typeof updUserProfileSchema>;

const ProfileForm = () => {
  const { data, update } = useSession();

  const form = useForm<T_UpdateProfileValues>({
    resolver: zodResolver(updUserProfileSchema),
    defaultValues: {
      name: data?.user?.name || "",
      email: data?.user?.email || "",
    },
  });

  const _onSubmit = async (values: T_UpdateProfileValues) => {
    const res = await updUserProfile(values);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    const newSession = {
      ...data,
      user: { ...data?.user, ...values },
    };
    await update(newSession);
    toast.success(res.message);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(_onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder={`Name`} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder={`Email`} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="button col-span-2 w-full"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting && <Spinner />}
          {form.formState.isSubmitting ? "Submitting..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};
export default ProfileForm;
