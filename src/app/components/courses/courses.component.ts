import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  switchMap,
  map,
  combineLatest,
} from 'rxjs';
import { Course } from 'src/app/interfaces/course.interface';
import { CoursesService } from 'src/app/services/courses.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public courses$: Observable<Course[]> = new Observable<Course[]>();
  public page$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public itemsPerPage$: BehaviorSubject<number> = new BehaviorSubject<number>(
    10
  );
  public hasPreviousData: boolean = false;
  public hasNextData: boolean = true;

  constructor(
    private coursesService: CoursesService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.courses$ = combineLatest([this.page$, this.itemsPerPage$]).pipe(
      switchMap(([page, itemsPerPage]) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return this.coursesService.getCourses().pipe(
          map((data) => {
            this.hasPreviousData = startIndex > 0;
            this.hasNextData = endIndex < data.length;
            return data.slice(startIndex, endIndex);
          })
        );
      })
    );
    this.loaderService.hide();
  }

  public prevPage() {
    if (this.page$.value > 1) {
      this.page$.next(this.page$.value - 1);
    }
  }

  public nextPage() {
    this.page$.next(this.page$.value + 1);
  }
}
