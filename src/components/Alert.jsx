
function Alert({
    type = 'success',
    message,
}) {
    if (!message) return null;

    const styles = {
        success: 'bg-green-50 text-green-700 border-green-200',
        error: 'bg-red-50 text-red-700 border-red-200',
        warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        info: 'bg-blue-50 text-blue-700 border-blue-200',
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '!',
        info: 'i',
    };

    return (
        <div
            role="alert"
            className={`flex items-start gap-3 rounded-lg border p-4 text-sm
        ${styles[type] || styles.info}`}
        >
            <span className="font-bold">
                {icons[type] || icons.info}
            </span>

            <p>{message}</p>
        </div>
    );
}

export default Alert;
