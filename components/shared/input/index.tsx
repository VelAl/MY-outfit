import { InputHTMLAttributes } from "react";
import { cx } from "class-variance-authority";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type I_Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  id: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

const AppInput = ({
  label,
  name,
  inputClassName,
  labelClassName,
  wrapperClassName,
  ...rest
}: I_Props) => {
  return (
    <div className={wrapperClassName}>
      <Label className={cx(labelClassName, "capitalize ml-1")} htmlFor={name}>
        {label || name}
      </Label>
      <Input
        name={name}
        className={inputClassName}
        type={rest.type || "text"}
        {...rest}
      />
    </div>
  );
};

export default AppInput;
