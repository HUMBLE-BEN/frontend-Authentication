
function Button({
    children,
    type = 'button',
    onClick,
    disabled = false,
    loading = false,
    variant = 'primary',
}) {
    const styles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium transition
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${styles[variant] || styles.primary}`}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
}

export default Button;
