import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import Hls from 'hls.js';
import { Lesson } from 'src/app/interfaces/lesson.interface';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements AfterViewInit, OnInit {
  @Input() public lesson: Lesson;
  @ViewChild('video', { static: false }) video: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const video = this.video.nativeElement;

    const hls = new Hls();
    if (Hls.isSupported()) {
      hls.loadSource(this.lesson.link);
      hls.attachMedia(video);
    } else {
      console.log('Something went wrong');
    }
  }
}
