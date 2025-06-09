interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  error,
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`text-center p-8 ${className}`}>
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-300 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-300 mb-4">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
