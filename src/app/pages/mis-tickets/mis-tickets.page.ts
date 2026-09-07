import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonContent,
  IonFab, IonFabButton, IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, briefcaseOutline, warningOutline, ticketOutline } from 'ionicons/icons';
import { TicketService, Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-mis-tickets',
  templateUrl: './mis-tickets.page.html',
  styleUrls: ['./mis-tickets.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonContent,
    IonFab, IonFabButton, IonIcon,
    CommonModule, RouterModule
  ]
})
export class MisTicketsPage implements OnInit {
  tickets: Ticket[] = [];

  constructor(
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ add, briefcaseOutline, warningOutline, ticketOutline });
  }

  ngOnInit() {
    this.cargarTickets();
  }

  ionViewWillEnter() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.ticketService.getTickets().subscribe({
      next: (data) => { 
        console.log('Tickets recibidos desde Django:', data);
        this.tickets = data; 
        this.cdr.detectChanges();
      },
      error: (err) => { console.error('Error al cargar tickets:', err); }
    });
  }

  getColorEstado(estado: string | undefined): string {
    switch (estado) {
      case 'Abierto': return 'success';
      case 'En Proceso': return 'warning';
      case 'Cerrado': return 'medium';
      default: return 'primary';
    }
  }

  getCssPill(estado: string | undefined): string {
    const val = estado ?? '';
    return 'status-' + val.toLowerCase().replace(' ', '-');
  }
}
