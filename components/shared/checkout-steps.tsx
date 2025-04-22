import React from "react";

const steps = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
] as const;

function CheckoutSteps({ current = 0 }) {
  return (
    <div className="flex-between flex-col md:flex-row mb-10">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div
            className={`p-2 w-48 rounded-full text-center text-sm border ${
              i === current && "bg-muted"
            }`}
          >
            {step}
          </div>
          {step !== steps.at(-1) && (
            <hr className="hidden grow border-t border-gray-300 md:block" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
export default CheckoutSteps;
