import React from 'react'
import clsx from 'clsx'




const Input = (
    {
        label,
        id,
        type,
        required,
        register,
        error,
        disabled
    }
) => {
    return (
        <div className='my-4'>
            <label htmlFor={id}
                className='block text-lg font-medium loading-6 text-[#00BD9B] text-left'>
                {label}
            </label>
            <div className='mt-2'>
                <input type={type} id={id} autoComplete={id} disabled={disabled} {...register(id, { required })} className={
                    clsx(`form-input bg-transparent block w-full rounded-md border-0 py-1.5 text-[#00BD9B] shadow-sm ring-1 ring-inset ring-[#00BD9B] placeholder:text-[#00BD9B] focus:ring-2 focus:ring-inset focus:bg-transparent focus:ring-sky-600 sm:text-lg sm:leading-6`,
                        error[id] && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )
                } />
            </div>
        </div>
    )
}

export default Input
