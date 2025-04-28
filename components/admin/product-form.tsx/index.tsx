"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { toast } from "sonner";

import { T_AddProduct, T_Message, T_Product } from "@/app-types-ts";
import AppFormInput from "@/components/shared/form-input";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { UploadButton } from "@/lib/uploadthing";
import { insertProductsSchema } from "@/lib/validators";

import { emptyProduct } from "./helpers";

type T_Props =
  | { type: "Update"; product: T_Product }
  | { type: "Create"; product?: undefined };

export const NewProductForm = ({ type, product }: T_Props) => {
  const router = useRouter();

  const form = useForm<T_AddProduct>({
    resolver: zodResolver(insertProductsSchema),
    defaultValues: product || emptyProduct,
  });

  const images = form.watch("images");

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
          <AppFormInput control={form.control} name="price" />

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

          <FormField
            control={form.control}
            name={"images"}
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card className="rounded-sm p-0">
                  <CardContent className="space-y-2 mt-2 min-h-28 relative">
                    <div className="flex-start space-x-2">
                      {images.map((image) => (
                        <Image
                          className="w-20 h-20 object-cover object-center rounded-sm"
                          alt="product img"
                          key={image}
                          src={image}
                          width={100}
                          height={100}
                        />
                      ))}

                      <FormControl className="absolute right-4 bottom-2">
                        <UploadButton
                          className="bg-secondary rounded-sm px-2 pb-2"
                          endpoint="imageUploader"
                          onClientUploadComplete={([{ url }]: {
                            url: string;
                          }[]) => {
                            form.setValue("images", [...images, url]);
                            form.trigger("images");
                          }}
                          onUploadError={(err) => {
                            toast.error(err.message);
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>

                <FormMessage />
              </FormItem>
            )}
          />
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
