import { LESSON_TEMPLATES, type LessonTemplate } from './lessonTemplates';

export interface GeneratedLesson {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  videoUrl?: string;
}

export function generateLessons(chainId?: string): GeneratedLesson[] {
  const today = new Date();
  
  return LESSON_TEMPLATES.map((template, index) => {
    const lessonDate = new Date(today);
    lessonDate.setDate(today.getDate() - (LESSON_TEMPLATES.length - index - 1));
    
    return {
      id: template.id,
      title: template.title,
      category: template.category,
      content: template.contentTemplate,
      date: lessonDate.toISOString(),
      quiz: template.quiz,
      videoUrl: template.videoUrl,
    };
  });
}

export function getLessonById(id: string): GeneratedLesson | null {
  const lessons = generateLessons();
  return lessons.find(lesson => lesson.id === id) || null;
}
