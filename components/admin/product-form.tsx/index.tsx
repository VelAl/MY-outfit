"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { toast } from "sonner";

import { T_AddProduct, T_Message, T_Product } from "@/app-types-ts";
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
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updataProduct } from "@/lib/actions/product.actions";
import { insertProductsSchema } from "@/lib/validators";

import { emptyProduct } from "./helpers";

type T_PropsUpd = { type: "Update"; product: T_Product };
type T_PropsCraete = { type: "Create"; product?: undefined };
type T_Props = T_PropsCraete | T_PropsUpd;

export const NewProductForm = ({ type, product }: T_Props) => {
  const router = useRouter();

  const form = useForm<T_AddProduct>({
    resolver: zodResolver(insertProductsSchema),
    defaultValues: product || emptyProduct,
  });

  const _handleResponse = (res: T_Message) => {
    if (res.success) {
      toast.success(res.message);
      router.push("/admin/products");
    } else {
      toast.error(res.message);
    }
  };
  
  const _handleCreate = async (values: T_AddProduct) => {
    const res = await createProduct(values);
    _handleResponse(res);
  };

  const _handleUpdate = async (values: T_AddProduct) => {
    const res = await updataProduct({ ...(product as T_Product), ...values });
    _handleResponse(res);
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        className="space-y-4"
        onSubmit={form.handleSubmit(
          type === "Create" ? _handleCreate : _handleUpdate
        )}
      >
        <div className="flex flex-col md:flex-row gap-5 items-start">
          {/* NAME */}
          <AppFormInput control={form.control} name="name" />

          {/* SLUG */}
          <div className="w-full flex items-end">
            <Button
              type="button"
              className="mt-2 h-9"
              size="sm"
              variant="secondary"
              onClick={() => {
                const slug = slugify(form.getValues("name"), { lower: true });
                form.setValue("slug", slug);
              }}
            >
              Slugify name
            </Button>
            <AppFormInput
              control={form.control}
              name="slug"
              labelClassname="-ml-26"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* CATEGORY */}
          <AppFormInput control={form.control} name="category" />

          {/* BRAND */}
          <AppFormInput control={form.control} name="brand" />
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* PRICE */}
          <AppFormInput
            control={form.control}
            name="price"
            type="number"
            min={0}
          />

          {/* STOCK */}
          <AppFormInput
            control={form.control}
            name="stock"
            type="number"
            min={0}
          />
        </div>

        <div className="upload-field flex flex-col md:flex-row gap-5">
          {/* IMAGES */}
        </div>

        <div className="upload-field">{/* IS FEATURED */}</div>

        <div>
          {/* DESCRIPTION */}

          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder={`Enter description`}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="text-end">
          <Button
            type="submit"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Spinner />}
            {form.formState.isSubmitting
              ? "Submitting..."
              : type === "Create"
              ? "Create"
              : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
