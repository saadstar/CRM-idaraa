import React from "react";
import clsx from "clsx";

const CheckBox = React.forwardRef(
  ({  label, className,name, register, error }, ref) => {
    return (
      <div className='w-full flex flex-col gap-1'>    
        <div className="flex items-center mb-4">
          <input
            type={"checkbox"}
            name={name}
            ref={ref}
            {...register(name)}
            className={clsx(
              "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
              className
                    )}
                    id={label}
                />
                {label &&<label htmlFor={label} class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>}
        </div>
        {error && (
          <span className='text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
        )}
      </div>
    );
  }
);
export default CheckBox;