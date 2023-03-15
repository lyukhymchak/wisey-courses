import { Meta } from './meta.interface';

export interface Course {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  meta: Meta;
  containsLockedLessons: boolean;
  lessonsCount?: number;
}
