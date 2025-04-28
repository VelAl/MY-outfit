"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";

import { T_AddProduct, T_Product } from "@/app-types-ts";
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
import { Textarea } from "@/components/ui/textarea";
import { insertProductsSchema } from "@/lib/validators";

type T_PropsUpd = { type: "Update"; product: T_Product };
type T_PropsCraete = { type: "Create"; product?: undefined };
type T_Props = T_PropsCraete | T_PropsUpd;

const emptyProduct: T_AddProduct = {
  banner: null,
  brand: "",
  category: "",
  description: "",
  images: [],
  isFeatured: false,
  name: "",
  price: "0",
  slug: "",
  stock: 0,
};

export const NewProductForm = ({ type, product }: T_Props) => {
  const router = useRouter();

  const form = useForm<T_AddProduct>({
    resolver: zodResolver(insertProductsSchema),
    defaultValues: product || emptyProduct,
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex flex-col md:flex-row gap-5 items-start">
          {/* NAME */}
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter name`} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
            <FormField
              control={form.control}
              name={"slug"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="-ml-28">Slug</FormLabel>
                  <FormControl>
                    <Input placeholder={`Enter slug`} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* CATEGORY */}
          <FormField
            control={form.control}
            name={"category"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter category`} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* BRAND */}
          <FormField
            control={form.control}
            name={"brand"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter brand`} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* PRICE */}
          <FormField
            control={form.control}
            name={"price"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder={`Enter price`}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* STOCK */}
          <FormField
            control={form.control}
            name={"stock"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder={`Enter stock`}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
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
