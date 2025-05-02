"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";

import { T_InsertReview } from "@/app-types-ts";
import AppFormInput from "@/components/shared/form-input";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { getReview, manageReview } from "@/lib/actions/review.actions";
import { insertReviewSchema } from "@/lib/validators";

type T_Props = {
  userId: string;
  productId: string;
  onReviewSubmitted: () => void;
};

const ratingOptions = Array.from({ length: 5 }, (_, i) => `${i + 1}`);

const ReviewForm = ({ productId, userId, onReviewSubmitted }: T_Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<T_InsertReview>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: { description: "", productId, rating: 1, title: "", userId },
  });

  const _submit: SubmitHandler<T_InsertReview> = async (values) => {
    const { message, success } = await manageReview(values);
    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
      setOpen(false);
      onReviewSubmitted();
    }
  };

  const _handleOpenForm = async () => {
    setOpen(true);
    const review = await getReview(productId);
    if (review) {
      form.setValue("title", review.title);
      form.setValue("description", review.description);
      form.setValue("rating", review.rating);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={_handleOpenForm}>Write A Review</Button>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form method="POST" onSubmit={form.handleSubmit(_submit)}>
            <DialogHeader>
              <DialogTitle>Write a review</DialogTitle>
              <DialogDescription>
                Leave a Review for This Product
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <AppFormInput control={form.control} name="title" />

              <FormField
                control={form.control}
                name={"description"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="ml-2">Description</FormLabel>
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

              <FormField
                control={form.control}
                name={"rating"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="ml-2">Rating</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {ratingOptions.map((el) => (
                          <SelectItem
                            key={el}
                            value={el}
                            className={`hover:bg-muted cursor-pointer ${
                              +field.value === +el && "pointer-events-none"
                            }`}
                          >
                            <div className="flex items-center justify-between w-12">
                              {el}{" "}
                              <StarIcon
                                className={`${
                                  +field.value >= +el &&
                                  "text-yellow-300 fill-yellow-300"
                                }`}
                              />
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && <Spinner />}
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default ReviewForm;
