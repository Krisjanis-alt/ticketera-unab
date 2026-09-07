import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'mis-tickets',
    pathMatch: 'full'
  },
  {
    path: 'mis-tickets',
    loadComponent: () => import('./pages/mis-tickets/mis-tickets.page').then(m => m.MisTicketsPage)
  },
  {
    path: 'nuevo-ticket',
    loadComponent: () => import('./pages/nuevo-ticket/nuevo-ticket.page').then(m => m.NuevoTicketPage)
  },
  {
    path: 'ticket/:id',
    loadComponent: () => import('./pages/detalle-ticket/detalle-ticket.page').then(m => m.DetalleTicketPage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
