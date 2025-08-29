import * as React from "react";

import { cn } from "../../lib/utils";

export interface InputProps extends Omit<React.ComponentProps<"input">, 'prefix'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, ...props }, ref) => {
    // if (prefix || suffix) {
    return (
      <div className="flex items-center w-full rounded-md border border-input bg-white dark:bg-gray-800 shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring focus-within:border-primary z-0">
        {/* Prefix (optional) */}
        {prefix && (
          <div className="flex items-center px-3 text-muted-foreground dark:text-gray-400">
            {prefix}
          </div>
        )}

        {/* Input */}
        <input
          type={type}
          className={cn(
            "flex-1 bg-transparent px-3 py-2 text-base transition-colors text-gray-900 dark:text-gray-100 placeholder:text-muted-foreground dark:placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            prefix && "pl-0", // avoid double padding if prefix exists
            suffix && "pr-0", // avoid double padding if suffix exists
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Suffix (optional) */}
        {suffix && (
          <div className="flex items-center px-3 text-muted-foreground dark:text-gray-400">
            {suffix}
          </div>
        )}
      </div>

    );
    // }

    // return (
    //   <div className="flex items-center w-full rounded-md border border-input bg-background shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring">
    //     <input
    //       type={type}
    //       className={cn(
    //         "flex-1 bg-transparent px-3 py-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    //         className
    //       )}
    //       ref={ref}
    //       {...props}
    //     />
    //   </div>
    // );
  }
);
Input.displayName = "Input";

export { Input };
