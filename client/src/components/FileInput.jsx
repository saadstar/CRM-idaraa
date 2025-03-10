import clsx from 'clsx';
import React from 'react';

const FileInput = React.forwardRef(
  ({  label, className, register, name, error }, ref) => {
    return (
      <div className='w-full flex flex-col gap-1'>
        {label && (
          <label htmlFor={name} className='text-slate-800 text-right'>
            {label}
          </label>
        )}

        <div>
          <input
            type={"file"}
            accept="application/pdf"  
            name={name}            
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-gold-dark                     file:cursor-pointer                   hover:file:bg-blue-100",
              className
            )}
          />
        </div>
        {error && (
          <span className='text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
        )}
      </div>
    );
  }
);
export default FileInput;