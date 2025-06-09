interface Step {
  id: number;
  label: string;
  completed: boolean;
  current: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
  className?: string;
}

export function ProgressSteps({ steps, className = "" }: ProgressStepsProps) {
  const currentStep = steps.find((step) => step.current);
  const completedCount = steps.filter((s) => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="w-full">
      {/* Mobile/Tablet View: Progress Bar + Label (shown on screens smaller than lg) */}
      <div className={`lg:hidden text-center mb-2 ${className}`}>
        <p className="text-sm text-gray-400">
          Step {currentStep?.id} of {steps.length}:{" "}
          <span className="font-medium text-gray-300">
            {currentStep?.label}
          </span>
        </p>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Desktop View: Step-by-step display (shown only on lg screens and above) */}
      <ol className="hidden lg:flex items-center justify-between space-x-4">
        {steps.map((step) => (
          <li
            key={step.id}
            className={`flex-1 text-center py-2 px-3 rounded-xl text-sm font-medium transition-all ${
              step.completed
                ? "bg-blue-600 text-white"
                : step.current
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-400 bg-gray-100"
            }`}
          >
            {step.completed ? (
              <span className="text-white">✔ </span>
            ) : step.current ? (
              <span className="text-blue-500">➤ </span>
            ) : (
              <span className="invisible">✔ </span>
            )}
            {step.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
