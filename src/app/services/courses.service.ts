import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Course } from '../interfaces/course.interface';
import { Courses } from '../interfaces/courses.interface';
import { CourseWithLessons } from '../interfaces/course-with-lessons.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  public getCourses(): Observable<Course[]> {
    return this.http
      .get<Courses>(`/core/preview-courses`)
      .pipe(map((data: Courses) => data.courses.reverse()));
  }

  public getCourseById(courseId: string): Observable<CourseWithLessons> {
    return this.http.get<CourseWithLessons>(
      `/core/preview-courses/${courseId}`
    );
  }
}
