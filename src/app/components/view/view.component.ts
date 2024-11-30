import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api/api-service.service';
import { VideoDTO } from '@interfaces/videoDTO';
import { YouTubePlayerModule } from '@angular/youtube-player';

import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [YouTubePlayerModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.sass',
})
export class ViewComponent implements OnInit {
  video: VideoDTO | null = null;
  safeUri: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.api.getVideo(id).subscribe({
        next: (video) => {
          this.video = video;
        },
        error: (err) => console.error(`Erro ao carregar video: ${err}`),
      });
    }
  }

  getYoutubeEmbedUrl(): SafeResourceUrl {
    const videoId = this.video?.url.split('v=')[1]?.split('&')[0];

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }
}
