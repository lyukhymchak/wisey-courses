import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { CourseWithLessons } from 'src/app/interfaces/course-with-lessons.interface';
import { LoaderService } from 'src/app/services/loader.service';

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
    private coursesService: CoursesService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.id = this.activatedroute.snapshot.paramMap.get('id')!;
    if (this.activatedroute.snapshot.paramMap.get('id')) {
      this.course$ = this.coursesService.getCourseById(
        this.activatedroute.snapshot.paramMap.get('id')!
      );
    }
    this.loaderService.hide();
  }
}
