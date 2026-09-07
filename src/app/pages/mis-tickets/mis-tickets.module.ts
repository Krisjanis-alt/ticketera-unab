import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';
import { RouterModule } from '@angular/router';
import { MisTicketsPage } from './mis-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MisTicketsPage }]),
    MisTicketsPage
  ]
})
export class MisTicketsPageModule {}
