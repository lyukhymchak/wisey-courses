import { Course } from './course.interface';
import { Lesson } from './lesson.interface';

export interface CourseWithLessons extends Course {
  lessons: Lesson[];
}
