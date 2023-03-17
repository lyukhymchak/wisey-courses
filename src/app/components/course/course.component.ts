import { Component, Input } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @Input() public course!: Course;
}
