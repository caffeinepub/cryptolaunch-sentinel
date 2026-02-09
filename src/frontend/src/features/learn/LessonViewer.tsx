import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle } from 'lucide-react';
import { getLessonById } from './lessonGenerator';
import QuizRunner from './QuizRunner';
import { useLessonProgress } from './learnProgress';
import { cacheLessonContent } from './lessonCache';

interface LessonViewerProps {
  lessonId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LessonViewer({ lessonId, open, onOpenChange }: LessonViewerProps) {
  const lesson = getLessonById(lessonId);
  const [showQuiz, setShowQuiz] = useState(false);
  const { markCompleted, isCompleted } = useLessonProgress();
  const completed = isCompleted(lessonId);

  useEffect(() => {
    if (lesson && open) {
      cacheLessonContent(lesson);
    }
  }, [lesson, open]);

  if (!lesson) return null;

  const handleComplete = () => {
    markCompleted(lessonId);
    if (lesson.quiz) {
      setShowQuiz(true);
    } else {
      onOpenChange(false);
    }
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    onOpenChange(false);
  };

  // Convert markdown-style content to simple formatted text
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold mt-6 mb-3">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-semibold mt-5 mb-2">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
        }
        // Bold text
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-semibold mt-3 mb-1">{line.slice(2, -2)}</p>;
        }
        // List items
        if (line.match(/^\d+\./)) {
          return <li key={index} className="ml-6 mb-1">{line.slice(line.indexOf('.') + 1).trim()}</li>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-6 mb-1 list-disc">{line.slice(2)}</li>;
        }
        // Empty lines
        if (line.trim() === '') {
          return <div key={index} className="h-2" />;
        }
        // Regular paragraphs
        return <p key={index} className="mb-2 text-sm text-muted-foreground leading-relaxed">{line}</p>;
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {lesson.title}
            {completed && <CheckCircle className="h-5 w-5 text-green-600" />}
          </DialogTitle>
          <DialogDescription>
            Category: {lesson.category}
          </DialogDescription>
        </DialogHeader>

        {!showQuiz ? (
          <>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-1">
                {formatContent(lesson.content)}
              </div>
            </ScrollArea>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              {!completed && (
                <Button onClick={handleComplete}>
                  {lesson.quiz ? 'Take Quiz' : 'Mark Complete'}
                </Button>
              )}
            </div>
          </>
        ) : (
          lesson.quiz && (
            <QuizRunner
              quiz={lesson.quiz}
              lessonId={lessonId}
              onComplete={handleQuizComplete}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
