import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ResultSearchDTO } from '@interfaces/resultSearchDTO';
import { RouterLink } from '@angular/router';
import { ApiService } from '@services/api/api-service.service';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent implements OnInit {
  protected logoSrc: string = 'assets/Logo.svg';
  protected searchTerm: string = '';
  protected searchResults: ResultSearchDTO[] = [];
  private searchSubject = new Subject<string>();
  isAuthenticated$: boolean = false;
  user$: any = null;
  isDropdown: boolean = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated$ = isAuthenticated;
      },
      error: (err) => console.error(`Erro ao verificar autenticação ${err}`),
    });
    this.authService.user$.subscribe({
      next: (user) => {
        this.user$ = user;
      },
      error: (err) => console.log(`Erro ao carrear o usuário`),
    });
    this.setupSearchListner();
  }

  protected login(): void {
    this.authService.loginWithRedirect();
  }
  protected logout(): void {
    this.authService.logout();
  }

  private setupSearchListner(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.apiService.searchVideos(query))
      )
      .subscribe({
        next: (results) => {
          this.searchResults = results;
          console.log(`Resultados atualizados: ${this.searchResults}`);
        },
        error: (err) => {
          console.error(`Erro na busca: ${err}`);
        },
      });
  }
  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    console.log('🚀 ~ HeaderComponent ~ onSearchInput ~ query:', query);

    if (query.length > 0) {
      this.searchSubject.next(query);
    } else {
      this.searchResults = [];
    }
  }
}
