import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { CourseWithLessons } from 'src/app/interfaces/course-with-lessons.interface';
import { LoaderService } from 'src/app/services/loader.service';
import { LessonStatus } from 'src/app/enums/lesson-status.enum';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  private courseId: string;

  public course$: Observable<CourseWithLessons>;
  public lessonStatus = LessonStatus;
  public expandedIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();

    this.courseId = this.activatedRoute.snapshot.paramMap.get('id')!;
    if (this.courseId) {
      this.course$ = this.coursesService.getCourseById(this.courseId);
    }

    this.loaderService.hide();
  }
}
