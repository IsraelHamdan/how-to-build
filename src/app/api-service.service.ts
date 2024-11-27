import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { VideoDTO } from '../interfaces/videoDTO';
import { UserDTO } from '../interfaces/userDTO';
import { FavoriteDTO } from '../interfaces/favoritesDTO';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getVideos(): Observable<VideoDTO[]> {
    return this.http.get<VideoDTO[]>(`${this.api}/videos`);
  }

  getVideo(id: number): Observable<VideoDTO> {
    return this.http.get<VideoDTO>(`${this.api}/videos/${id}`);
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.api}/users`);
  }

  getUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.api}/users/${id}`);
  }

  getFavorites(): Observable<FavoriteDTO[]> {
    return this.http.get<FavoriteDTO[]>(`${this.api}/favorites`);
  }
}
