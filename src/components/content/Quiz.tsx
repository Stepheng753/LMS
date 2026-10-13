import React, { createContext, useContext, useEffect, useId, useState } from 'react';
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react';

/* ---------- Shared pieces ---------- */

// correct: true/false = answered, null = registered but unanswered, undefined = unmounted
type Report = (id: string, correct: boolean | null | undefined) => void;
const QuizSetContext = createContext<Report | null>(null);

// Lets a quiz report its result (null = unanswered) to an enclosing <QuizSet>.
function useReport(correct: boolean | null) {
  const id = useId();
  const report = useContext(QuizSetContext);
  useEffect(() => {
    report?.(id, correct);
  }, [correct, id, report]);
  useEffect(() => () => report?.(id, undefined), [id, report]);
}

const QuizCard: React.FC<{ question: string; hint?: string; children: React.ReactNode }> = ({
  question,
  hint,
  children,
}) => (
  <div className="my-8 p-6 rounded-xl border border-border bg-card shadow-sm">
    <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-wider uppercase text-primary">
      <HelpCircle className="w-4 h-4" />
      <span>Knowledge Check</span>
    </div>
    <h3 className="text-base font-semibold text-foreground mb-1 font-sans">{question}</h3>
    {hint && <p className="text-xs text-muted-foreground mb-4">{hint}</p>}
    {!hint && <div className="mb-3" />}
    {children}
  </div>
);

const ResultPanel: React.FC<{ correct: boolean; explanation?: string; onReset: () => void }> = ({
  correct,
  explanation,
  onReset,
}) => (
  <div className="w-full space-y-3">
    <div
      className={`flex items-start gap-3 p-3.5 rounded-lg border-l-4 ${
        correct ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-red-500 bg-red-50 text-red-950'
      }`}
    >
      {correct ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      )}
      <div className="text-sm">
        <p className="font-semibold">{correct ? 'Correct!' : 'Not quite.'}</p>
        {explanation && <p className="mt-1 opacity-90">{explanation}</p>}
      </div>
    </div>
    <button onClick={onReset} className="text-xs font-medium text-primary hover:underline">
      Try Again
    </button>
  </div>
);

const SubmitButton: React.FC<{ disabled: boolean; onClick: () => void; label?: string }> = ({
  disabled,
  onClick,
  label = 'Submit Answer',
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-5 py-2 rounded-md border border-primary bg-transparent text-primary font-medium text-xs tracking-wide uppercase disabled:opacity-40 transition-colors hover:bg-primary/10 disabled:hover:bg-transparent"
  >
    {label}
  </button>
);

const optionStyle = (state: 'idle' | 'selected' | 'correct' | 'wrong' | 'dim') =>
  ({
    idle: 'border-border bg-background hover:border-primary/50 text-foreground',
    selected: 'border-primary ring-1 ring-primary bg-accent/40 text-foreground font-medium',
    correct: 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium',
    wrong: 'border-red-400 bg-red-50 text-red-950',
    dim: 'border-border opacity-50 bg-background',
  })[state];

/* ---------- Single choice ---------- */

interface QuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export const Quiz: React.FC<QuizProps> = ({ question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === correctIndex;
  useReport(submitted ? isCorrect : null);

  return (
    <QuizCard question={question}>
      <div className="space-y-2.5 mb-5">
        {options.map((option, idx) => {
          let state: Parameters<typeof optionStyle>[0] = selected === idx ? 'selected' : 'idle';
          if (submitted) state = idx === correctIndex ? 'correct' : selected === idx ? 'wrong' : 'dim';
          return (
            <button
              key={idx}
              onClick={() => !submitted && setSelected(idx)}
              disabled={submitted}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center justify-between ${optionStyle(state)}`}
            >
              <span>{option}</span>
              {submitted && idx === correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
              {submitted && selected === idx && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <SubmitButton disabled={selected === null} onClick={() => setSubmitted(true)} />
      ) : (
        <ResultPanel
          correct={isCorrect}
          explanation={explanation}
          onReset={() => {
            setSelected(null);
            setSubmitted(false);
          }}
        />
      )}
    </QuizCard>
  );
};

/* ---------- Multiple choice (select all that apply) ---------- */

interface MultiSelectQuizProps {
  question: string;
  options: string[];
  correctIndexes: number[];
  explanation?: string;
}

export const MultiSelectQuiz: React.FC<MultiSelectQuizProps> = ({
  question,
  options,
  correctIndexes,
  explanation,
}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect =
    selected.length === correctIndexes.length && correctIndexes.every((i) => selected.includes(i));
  useReport(submitted ? isCorrect : null);

  const toggle = (idx: number) => {
    if (submitted) return;
    setSelected((s) => (s.includes(idx) ? s.filter((i) => i !== idx) : [...s, idx]));
  };

  return (
    <QuizCard question={question} hint="Select all that apply.">
      <div className="space-y-2.5 mb-5">
        {options.map((option, idx) => {
          const isSel = selected.includes(idx);
          const isRight = correctIndexes.includes(idx);
          let state: Parameters<typeof optionStyle>[0] = isSel ? 'selected' : 'idle';
          if (submitted) state = isRight ? 'correct' : isSel ? 'wrong' : 'dim';
          return (
            <button
              key={idx}
              onClick={() => toggle(idx)}
              disabled={submitted}
              role="checkbox"
              aria-checked={isSel}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center gap-3 ${optionStyle(state)}`}
            >
              <span
                className={`flex items-center justify-center w-4 h-4 rounded border shrink-0 ${
                  isSel ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/50'
                }`}
              >
                {isSel && <span className="text-[10px] leading-none">✓</span>}
              </span>
              <span className="flex-1">{option}</span>
              {submitted && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {submitted && isSel && !isRight && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <SubmitButton disabled={selected.length === 0} onClick={() => setSubmitted(true)} />
      ) : (
        <ResultPanel
          correct={isCorrect}
          explanation={explanation}
          onReset={() => {
            setSelected([]);
            setSubmitted(false);
          }}
        />
      )}
    </QuizCard>
  );
};

/* ---------- Fill in the blank ---------- */

interface FillInQuizProps {
  question: string;
  /** One or more accepted answers. */
  answer: string | string[];
  placeholder?: string;
  explanation?: string;
  caseSensitive?: boolean;
}

export const FillInQuiz: React.FC<FillInQuizProps> = ({
  question,
  answer,
  placeholder = 'Type your answer…',
  explanation,
  caseSensitive = false,
}) => {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const norm = (s: string) => (caseSensitive ? s.trim() : s.trim().toLowerCase());
  const accepted = (Array.isArray(answer) ? answer : [answer]).map(norm);
  const isCorrect = accepted.includes(norm(value));
  useReport(submitted ? isCorrect : null);

  const submit = () => value.trim() && setSubmitted(true);

  return (
    <QuizCard question={question}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !submitted && submit()}
        disabled={submitted}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        className={`w-full mb-5 px-4 py-3 rounded-lg border text-sm font-mono bg-background outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
          submitted ? (isCorrect ? 'border-emerald-600 bg-emerald-50' : 'border-red-400 bg-red-50') : 'border-border'
        }`}
      />
      {!submitted ? (
        <SubmitButton disabled={!value.trim()} onClick={submit} />
      ) : (
        <ResultPanel
          correct={isCorrect}
          explanation={
            isCorrect
              ? explanation
              : `Accepted answer: ${Array.isArray(answer) ? answer[0] : answer}. ${explanation ?? ''}`
          }
          onReset={() => {
            setValue('');
            setSubmitted(false);
          }}
        />
      )}
    </QuizCard>
  );
};

/* ---------- Quiz set with combined score ---------- */

export const QuizSet: React.FC<{ title?: string; children: React.ReactNode }> = ({
  title = 'Check Your Understanding',
  children,
}) => {
  const [results, setResults] = useState<Record<string, boolean | null>>({});

  const report: Report = React.useCallback((id, correct) => {
    setResults((r) => {
      if (correct === undefined) {
        if (!(id in r)) return r;
        const rest = { ...r };
        delete rest[id];
        return rest;
      }
      return r[id] === correct ? r : { ...r, [id]: correct };
    });
  }, []);

  const total = Object.keys(results).length;
  const answered = Object.values(results).filter((v) => v !== null).length;
  const score = Object.values(results).filter((v) => v === true).length;
  const done = total > 0 && answered === total;

  return (
    <QuizSetContext.Provider value={report}>
      <section className="my-8">
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-border">
          <h3 className="font-serif text-xl font-bold text-foreground">{title}</h3>
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${done ? 'text-emerald-700' : 'text-muted-foreground'}`}
          >
            {done ? `Score: ${score} / ${total}` : `${answered} of ${total || '…'} answered`}
          </span>
        </div>
        {children}
      </section>
    </QuizSetContext.Provider>
  );
};
