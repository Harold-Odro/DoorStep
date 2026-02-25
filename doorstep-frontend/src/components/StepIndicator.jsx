export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold font-mono
              ${i < currentStep ? 'bg-success text-bg' : i === currentStep ? 'bg-primary text-bg' : 'bg-surface-2 text-text-muted border border-border'}`}>
              {i < currentStep ? '✓' : i + 1}
            </div>
            <span className={`text-xs mt-2 font-body ${i <= currentStep ? 'text-text' : 'text-text-muted'}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-2 mb-5 ${i < currentStep ? 'bg-success' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
