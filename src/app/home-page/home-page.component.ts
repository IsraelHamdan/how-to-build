import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { VideoDTO } from '../../interfaces/videoDTO';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.sass',
})
export class HomePageComponent {
  videos: VideoDTO[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos() {
    this.apiService.getVideos().subscribe((data: VideoDTO[]) => {
      this.videos = data;
      console.log(this.videos);
    });
  }
}
