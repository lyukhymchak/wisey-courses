import { Pipe, PipeTransform } from '@angular/core';
import { Lesson } from '../interfaces/lesson.interface';

@Pipe({ name: 'lessonOrder' })
export class LessonOrderPipe implements PipeTransform {
  transform(lessons: Lesson[]): Lesson[] {
    return lessons.sort((a, b) => a.order - b.order);
  }
}
