"use client";
import { InputHTMLAttributes } from "react";
import { Control, ControllerRenderProps, Path } from "react-hook-form";
import { cx } from "class-variance-authority";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type T_FormValuesShape = {
  [key: string]: string | number | null | boolean | string[];
};

type T_Props<T extends T_FormValuesShape> =
  InputHTMLAttributes<HTMLInputElement> & {
    control: Control<T>;
    name: Path<T>;
    labelName?: string;
    placeHolder?: string;
    labelClassname?: string;
  };

// Used as input with react-hook-form. Only for form field string | number values!
function AppFormInput<T extends T_FormValuesShape>({
  control,
  name,
  labelName,
  placeHolder,
  labelClassname,
  ...rest
}: T_Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem className="w-full">
          <FormLabel className={cx("capitalize ml-2", labelClassname)}>
            {labelName || name}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeHolder || `Enter ${name}`}
              {...field}
              value={field.value as string}
              {...rest}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default AppFormInput;
