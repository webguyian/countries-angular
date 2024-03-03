import { Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { ROUTES } from './app.constants';

export const routes: Routes = [
  { path: ROUTES.detail.path, component: CountryDetailComponent },
  { path: ROUTES.home.path, component: CountryListComponent }
];
