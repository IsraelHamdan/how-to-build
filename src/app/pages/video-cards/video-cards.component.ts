import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VideoDTO } from '@interfaces/videoDTO';
import { ApiService } from '@services/api/api-service.service';

@Component({
  selector: 'app-video-cards',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './video-cards.component.html',
  styleUrl: './video-cards.component.sass',
})
export class VideoCardsComponent implements OnInit {
  videos: VideoDTO[] | null = null;

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
