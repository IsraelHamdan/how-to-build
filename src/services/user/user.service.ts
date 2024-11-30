import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '@interfaces/userDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiURL}/${id}`);
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiURL}`);
  }

  createUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiURL}`, user);
  }

  editUser(
    userId: number,
    updatedData: Partial<UserDTO>
  ): Observable<Partial<UserDTO>> {
    return this.http.put<Partial<UserDTO>>(
      `${this.apiURL}/users/${userId}`,
      updatedData
    );
  }
}
