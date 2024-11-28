import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { HomePageComponent } from '@pages/home-page/home-page.component';
import { ViewComponent } from '@components/view/view.component';
import { FavoritesComponent } from '@pages/favorites/favorites.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'favs', component: FavoritesComponent },
  { path: '**', redirectTo: '/home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
