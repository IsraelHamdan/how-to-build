import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { HomePageComponent } from '@pages/home-page/home-page.component';
import { ViewComponent } from '@components/view/view.component';
import { FavoritesComponent } from '@pages/favorites/favorites.component';
import { HistoryComponent } from '@pages/history/history.component';
import { UserComponent } from '@pages/user/user.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'view/:id', component: ViewComponent },
  {
    path: 'user/:id',
    canActivate: [AuthGuard],
    children: [
      { path: 'favs', component: FavoritesComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'profile', component: UserComponent },
    ],
  },

  { path: '**', redirectTo: '/home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
