"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef((props, ref) => {
  const { className, containerClassName, ...rest } = props;
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...rest}
    />
  );
});
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={cn("flex items-center", className)} {...rest} />
  );
});
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef((props, ref) => {
  const { index, className, ...rest } = props;
  const inputOTPContext = React.useContext(OTPInputContext);

  if (!inputOTPContext || !inputOTPContext.slots || !inputOTPContext.slots[index]) {
    return null;
  }

  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y-2 border-y-black border-r-2  border-input text-sm shadow-lg transition-all first:rounded-l-md first:border-2 first:border-l-black  last:rounded-r-md  last:border-r-black ",
        isActive && "z-10 ring-2 ring-black",
        className
      )}
      {...rest}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} role="separator" {...props}>
      <Minus />
    </div>
  );
});
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };