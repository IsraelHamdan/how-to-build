import { VideoDTO } from './videoDTO';

export interface ResultSearchDTO {
  id: number;
  title: string;
  videos: VideoDTO[];
}
