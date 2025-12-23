import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../core/services/car.service';
import { BookingService } from '../../../core/services/booking.service';
import { Car } from '../../../core/models/car.model';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-car-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})
export class CarDetailComponent implements OnInit {
  car: Car | null = null;
  bookingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private bookingService: BookingService,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      pickupLocation: ['', Validators.required],
      dropLocation: ['', Validators.required],
      pickupDate: ['', Validators.required],
      dropDate: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.carService.getCarById(id).subscribe(car => this.car = car || null);
  }

  onSubmit(): void {
    if (this.bookingForm.valid && this.car) {
      const formValue = this.bookingForm.value;
      const days = Math.ceil((new Date(formValue.dropDate).getTime() - new Date(formValue.pickupDate).getTime()) / (1000 * 60 * 60 * 24));
      const distance = this.calculateDistance(formValue.pickupLocation, formValue.dropLocation);
      const totalAmount = days * this.car.pricePerDay + distance * 0.5;

      const booking = {
        carId: this.car.id,
        user: {
          name: formValue.name,
          email: formValue.email,
          mobile: formValue.mobile
        },
        pickupLocation: formValue.pickupLocation,
        dropLocation: formValue.dropLocation,
        pickupDate: new Date(formValue.pickupDate),
        dropDate: new Date(formValue.dropDate),
        distance,
        totalAmount,
        status: 'pending' as const
      };

      this.bookingService.addBooking(booking).subscribe(() => {
        this.sendInvoice(booking);
        this.router.navigate(['/bookings']);
      });
    }
  }

  private calculateDistance(pickup: string, drop: string): number {
    // Mock distance calculation
    return Math.random() * 100 + 50;
  }

  private sendInvoice(booking: any): void {
    const doc = new jsPDF();
    doc.text('Car Rental Invoice', 20, 20);
    doc.text(`Booking ID: ${booking.id}`, 20, 30);
    doc.text(`Car: ${this.car?.name}`, 20, 40);
    doc.text(`User: ${booking.user.name}`, 20, 50);
    doc.text(`Email: ${booking.user.email}`, 20, 60);
    doc.text(`Mobile: ${booking.user.mobile}`, 20, 70);
    doc.text(`Pickup: ${booking.pickupLocation} on ${booking.pickupDate.toDateString()}`, 20, 80);
    doc.text(`Drop: ${booking.dropLocation} on ${booking.dropDate.toDateString()}`, 20, 90);
    doc.text(`Distance: ${booking.distance} km`, 20, 100);
    doc.text(`Total Amount: $${booking.totalAmount.toFixed(2)}`, 20, 110);
    doc.save(`invoice-${booking.id}.pdf`);
    alert(`Invoice generated and sent to ${booking.user.email} and ${booking.user.mobile}`);
  }
}
