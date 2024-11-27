import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewComponent } from './view/view.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'view', component: ViewComponent },
  { path: 'favs', component: FavoritesComponent },
  { path: '**', component: NotFoundPageComponent },
  { path: '', component: NotFoundPageComponent },
];
