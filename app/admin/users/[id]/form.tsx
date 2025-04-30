"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, PencilOff } from "lucide-react";
import { z } from "zod";

import AppFormInput from "@/components/shared/form-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRoles } from "@/lib/constants";
import { updateUserSchema } from "@/lib/validators";

type T_FormValues = z.infer<typeof updateUserSchema>;
type T_Props = { user: T_FormValues };

const rolesArray = Object.values(userRoles);

const EditUserAdminForm = ({ user }: T_Props) => {
  const form = useForm<T_FormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const _onSubmit = async (values: T_FormValues) => {
    console.log("values ===>", values);
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        className="space-y-6"
        onSubmit={form.handleSubmit(_onSubmit)}
      >
        {/* EMAIL */}
        <div className="flex items-end gap-4">
          <AppFormInput control={form.control} name="email" disabled />
          <PencilOff className="mb-2 text-gray-500" />
        </div>

        {/* NAME */}
        <div className="flex items-end gap-4">
          <AppFormInput control={form.control} name="name" disabled />
          <PencilOff className="mb-2 text-gray-500" />
        </div>

        {/* ROLE */}
        <div className="flex items-end gap-4">
          <FormField
            control={form.control}
            name={"role"}
            render={({ field }) => (
              <FormItem className="w-full gap-1">
                <FormLabel className={"capitalize ml-2"}>{"Role"}</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full capitalize">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {rolesArray.map((role) => (
                      <SelectItem
                        key={role}
                        value={role}
                        className="capitalize"
                      >
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Pencil className="mb-2 text-primary" />
        </div>

        <div className="pr-10">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Spinner />}
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditUserAdminForm;
