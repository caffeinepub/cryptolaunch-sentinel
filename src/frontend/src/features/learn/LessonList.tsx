import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { generateLessons } from './lessonGenerator';
import LessonViewer from './LessonViewer';
import { useLessonProgress } from './learnProgress';
import { recordAnalyticsEvent } from '../analytics/analyticsEvents';

export default function LessonList() {
  const lessons = generateLessons();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const { isCompleted } = useLessonProgress();

  const handleOpenLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    recordAnalyticsEvent('lessonStart');
  };

  const categoryColors: Record<string, string> = {
    basics: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    defi: 'bg-green-500/10 text-green-700 dark:text-green-400',
    nft: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    security: 'bg-red-500/10 text-red-700 dark:text-red-400',
    advanced: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {lessons.map((lesson) => {
          const completed = isCompleted(lesson.id);
          const lessonDate = new Date(lesson.date);

          return (
            <Card key={lesson.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className={categoryColors[lesson.category]}>
                        {lesson.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        {lessonDate.toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  {completed && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant={completed ? 'outline' : 'default'}
                  className="w-full"
                  onClick={() => handleOpenLesson(lesson.id)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {completed ? 'Review Lesson' : 'Start Lesson'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedLessonId && (
        <LessonViewer
          lessonId={selectedLessonId}
          open={!!selectedLessonId}
          onOpenChange={(open) => !open && setSelectedLessonId(null)}
        />
      )}
    </>
  );
}
