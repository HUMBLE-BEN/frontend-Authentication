


import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function InputField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    disabled = false,
    inputMode,
    autoComplete,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="w-full space-y-2">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    inputMode={inputMode}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${name}-error` : undefined}
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition
            placeholder:text-slate-400
            focus:ring-2 focus:ring-blue-500
            disabled:cursor-not-allowed disabled:bg-slate-100
            ${isPassword ? 'pr-12' : ''}
            ${error
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-300 focus:border-blue-500'
                        }`}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 disabled:opacity-50"
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p id={`${name}-error`} className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default InputField;
