import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Ticket {
  id?: number;
  folio?: string;
  titulo: string;
  descripcion: string;
  area: string;
  estado?: string;
  prioridad: string;
  fecha_creacion?: string;
}

export interface Comentario {
  id?: number;
  ticket?: number;
  autor: string;
  contenido: string;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = `${environment.apiUrl}tickets/`;

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}${id}/`);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  getComentarios(ticketId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}${ticketId}/comentarios/`);
  }

  addComentario(ticketId: number, comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}${ticketId}/comentarios/`, comentario);
  }
}
