import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const ProgressBar = ({ currentStep, onStepClick }: ProgressBarProps) => {
  const steps = [
    { number: 1, title: 'Projet', icon: 'fa-rocket' },
    { number: 2, title: 'Équipe', icon: 'fa-users' },
    { number: 3, title: 'Confirmation', icon: 'fa-check-circle' },
  ];

  const getProgressPercentage = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Track */}
      <div className="relative mb-8">
        <div className="progress-neural">
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: `${getProgressPercentage()}%`,
              background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
              boxShadow: '0 0 20px hsl(var(--primary-glow))'
            }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between absolute -top-3 w-full">
          {steps.map((step) => (
            <button
              key={step.number}
              onClick={() => onStepClick(step.number)}
              className={`
                relative w-8 h-8 rounded-full border-2 transition-all duration-300 cursor-pointer
                ${step.number <= currentStep 
                  ? 'bg-primary border-primary text-primary-foreground shadow-glow-pulse' 
                  : 'bg-muted border-border text-muted-foreground hover:border-primary/50'
                }
              `}
              style={{
                animation: step.number === currentStep ? 'progress-glow 2s ease-in-out infinite' : 'none'
              }}
            >
              <i className={`fas ${step.icon} text-sm`} />
              
              {/* Particle effect for active step */}
              {step.number === currentStep && (
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="particle"
                      style={{
                        left: '50%',
                        top: '50%',
                        animationDelay: `${i * 0.2}s`,
                        transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between text-center">
        {steps.map((step) => (
          <div key={step.number} className="flex-1">
            <div className={`
              font-medium transition-colors duration-300
              ${step.number <= currentStep ? 'text-primary' : 'text-muted-foreground'}
            `}>
              {step.title}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {step.number === 1 && '33%'}
              {step.number === 2 && '66%'}
              {step.number === 3 && '100%'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;