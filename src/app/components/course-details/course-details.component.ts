import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { CourseWithLessons } from 'src/app/interfaces/course-with-lessons.interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  public course$: Observable<CourseWithLessons>;
  public id: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id')!;
    if (this.activatedroute.snapshot.paramMap.get('id')) {
      this.course$ = this.coursesService.getCourseById(
        this.activatedroute.snapshot.paramMap.get('id')!
      );
    }
  }
}
