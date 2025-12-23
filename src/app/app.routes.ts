import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'cars/:id', loadComponent: () => import('./features/cars/car-detail/car-detail.component').then(m => m.CarDetailComponent) },
  { path: 'bookings', loadComponent: () => import('./features/bookings/bookings.component').then(m => m.BookingsComponent) },
  { path: '**', loadComponent: () => import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
