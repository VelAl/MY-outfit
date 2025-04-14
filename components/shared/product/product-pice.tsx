import { FC } from "react";

import { cn } from "@/lib/utils";

type I_Props = {
  value: number;
  className?: string;
};

const ProductPice: FC<I_Props> = ({ value, className }) => {
  const [intVal, floatVal] = value.toFixed(2).split(".");

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {intVal}
      <span className="text-xs align-super">{floatVal}</span>
    </p>
  );
};
export default ProductPice;
