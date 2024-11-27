import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api-service.service';
import { VideoDTO } from '../../interfaces/videoDTO';
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.sass',
})
export class ViewComponent {
  video: VideoDTO | null = null;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.api.getVideo(id).subscribe({
        next: (video) => (this.video = video),
        error: (err) => console.error(`Erro ao carregar video: ${err}`),
      });
    }
  }
}
