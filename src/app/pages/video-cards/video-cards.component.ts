import { Component, ModelSignal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  private video: VideoDTO | null = null;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos() {
    this.apiService.getVideos().subscribe((data: VideoDTO[]) => {
      this.videos = data;
    });
  }

  detectVideo(id: number, event: MouseEvent) {
    event.preventDefault();

    const video = () => {
      this.apiService.getVideo(id).subscribe({
        next: (video: VideoDTO) => {
          this.video = video;
          console.log(this.video);
        },
        error: (err) => console.error('Erro ao encontrar o video', err),
      });
    };
    video();
  }
}
