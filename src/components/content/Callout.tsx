import React, { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'tip' | 'info' | 'warning' | 'success';
  title?: string;
  children: ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  const config = {
    tip: {
      icon: Lightbulb,
      bg: 'bg-amber-50/70',
      border: 'border-amber-200 border-l-amber-500',
      text: 'text-amber-950',
      iconColor: 'text-amber-700',
      defaultTitle: 'Pro Tip',
    },
    info: {
      icon: Info,
      bg: 'bg-[#fdfaf8]',
      border: 'border-[#ebdccb] border-l-primary',
      text: 'text-foreground',
      iconColor: 'text-primary',
      defaultTitle: 'Important Note',
    },
    warning: {
      icon: AlertCircle,
      bg: 'bg-red-50/60',
      border: 'border-red-200 border-l-red-500',
      text: 'text-red-950',
      iconColor: 'text-destructive',
      defaultTitle: 'Caution',
    },
    success: {
      icon: CheckCircle2,
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200 border-l-emerald-600',
      text: 'text-emerald-950',
      iconColor: 'text-emerald-700',
      defaultTitle: 'Best Practice',
    },
  }[type];

  const Icon = config.icon;

  return (
    <div className={`my-5 p-4.5 rounded-lg border border-l-4 ${config.border} ${config.bg} ${config.text} text-sm`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="flex-1 space-y-1">
          <h4 className="font-semibold tracking-wide text-xs uppercase opacity-90">
            {title || config.defaultTitle}
          </h4>
          <div className="leading-relaxed opacity-95">{children}</div>
        </div>
      </div>
    </div>
  );
};
