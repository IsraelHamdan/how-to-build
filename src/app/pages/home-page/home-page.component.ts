import { Component, OnInit } from '@angular/core';
import { VideoDTO } from '@interfaces/videoDTO';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { ApiService } from '@services/api/api-service.service';
import { VideoCardsComponent } from '@pages/video-cards/video-cards.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [VideoCardsComponent, SidebarComponent],
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
