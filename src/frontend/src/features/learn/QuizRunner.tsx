import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';
import { recordAnalyticsEvent } from '../analytics/analyticsEvents';

interface QuizRunnerProps {
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  lessonId: string;
  onComplete: () => void;
}

export default function QuizRunner({ quiz, lessonId, onComplete }: QuizRunnerProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setSubmitted(true);
    recordAnalyticsEvent('quizSubmit');
  };

  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>
        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => setSelectedAnswer(parseInt(value))}
          disabled={submitted}
        >
          <div className="space-y-3">
            {quiz.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className={`flex-1 cursor-pointer ${
                    submitted && index === quiz.correctAnswer
                      ? 'text-green-600 font-medium'
                      : submitted && index === selectedAnswer
                      ? 'text-red-600'
                      : ''
                  }`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {submitted && (
        <Alert variant={isCorrect ? 'default' : 'destructive'}>
          {isCorrect ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertDescription>
            <p className="font-medium mb-1">
              {isCorrect ? 'Correct!' : 'Not quite right.'}
            </p>
            <p className="text-sm">{quiz.explanation}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end gap-2">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={onComplete}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
