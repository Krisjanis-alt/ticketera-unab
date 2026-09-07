import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonSpinner, IonIcon
} from '@ionic/angular';
import { TicketService, Ticket, Comentario } from '../../services/ticket.service';
import { addIcons } from 'ionicons';
import {
  alertCircle, briefcaseOutline, warningOutline,
  calendarOutline, pricetagOutline, chatbubbleOutline, sendOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-detalle-ticket',
  templateUrl: './detalle-ticket.page.html',
  styleUrls: ['./detalle-ticket.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton,
    IonSpinner, IonIcon
  ]
})
export class DetalleTicketPage implements OnInit {
  ticket: Ticket | null = null;
  comentarios: Comentario[] = [];
  cargando = true;
  error = false;

  nuevoAutor = '';
  nuevoContenido = '';
  enviando = false;

  private ticketId!: number;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ alertCircle, briefcaseOutline, warningOutline, calendarOutline, pricetagOutline, chatbubbleOutline, sendOutline });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.ticketId = parseInt(idParam, 10);
      this.cargarTicket(this.ticketId);
      this.cargarComentarios(this.ticketId);
    }
  }

  cargarTicket(id: number) {
    this.ticketService.getTicket(id).subscribe({
      next: (data) => {
        this.ticket = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar ticket:', err);
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarComentarios(id: number) {
    this.ticketService.getComentarios(id).subscribe({
      next: (data) => {
        this.comentarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar comentarios:', err)
    });
  }

  enviarComentario() {
    if (!this.nuevoContenido.trim() || !this.nuevoAutor.trim()) return;
    this.enviando = true;
    const nuevo: Comentario = { autor: this.nuevoAutor, contenido: this.nuevoContenido };
    this.ticketService.addComentario(this.ticketId, nuevo).subscribe({
      next: (c) => {
        this.comentarios = [...this.comentarios, c];
        this.nuevoContenido = '';
        this.enviando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al enviar comentario:', err);
        this.enviando = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCssEstado(estado: string | undefined): string {
    const val = estado ?? '';
    return 'status-' + val.toLowerCase().replace(' ', '-');
  }
}
