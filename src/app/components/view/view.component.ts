import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api/api-service.service';
import { VideoDTO } from '@interfaces/videoDTO';
import { SafeUrlPipe } from './pipeUrl';
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './view.component.html',
  styleUrl: './view.component.sass',
})
export class ViewComponent {
  video: VideoDTO | null = null;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('🚀 ~ ViewComponent ~ Recebi o id do video', id);
    if (id) {
      this.api.getVideo(id).subscribe({
        next: (video) => {
          this.video = video;
          console.log('🚀 ~ ViewComponent ~ achei o video ~ video:', video);
        },
        error: (err) => console.error(`Erro ao carregar video: ${err}`),
      });
    }
  }

  getYoutubeEmbedUrl(): string {
    const videoId = this.video?.url.split('v=')[1]?.split('&')[0];
    console.log('🚀 ~ ViewComponent ~ getYoutubeEmbedUrl ~ videoId:', videoId);
    return `https://www.youtube.com/embed/${videoId}`;
  }
}
