import * as React from "react";

function Button({ className, variant, size, asChild = false, ...props }) {

  return (
    <button
      data-slot="button"
      className={className}
      {...props}
    />
  );
}

export { Button };
