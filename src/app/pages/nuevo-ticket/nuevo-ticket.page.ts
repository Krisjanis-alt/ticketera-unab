import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonContent,
  IonInput, IonTextarea, IonSelect, IonSelectOption,
  ToastController, NavController
} from '@ionic/angular';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.page.html',
  styleUrls: ['./nuevo-ticket.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonButtons, IonBackButton,
    IonTitle, IonContent,
    IonInput, IonTextarea, IonSelect, IonSelectOption,
    CommonModule, ReactiveFormsModule
  ]
})
export class NuevoTicketPage implements OnInit {
  ticketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    this.ticketForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      area: ['Sistemas', Validators.required],
      prioridad: ['Media', Validators.required]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.ticketForm.valid) {
      this.ticketService.createTicket(this.ticketForm.value).subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: 'Ticket creado exitosamente.',
            duration: 2000,
            color: 'success',
            position: 'top'
          });
          await toast.present();
          this.ticketForm.reset({ area: 'Sistemas', prioridad: 'Media' });
          this.navCtrl.navigateBack('/mis-tickets');
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: 'Ocurrió un error al crear el ticket.',
            duration: 3000,
            color: 'danger',
            position: 'top'
          });
          await toast.present();
          console.error(err);
        }
      });
    }
  }
}
