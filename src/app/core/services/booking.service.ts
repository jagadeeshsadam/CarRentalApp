import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [];
  private readonly STORAGE_KEY = 'car-rental-bookings';

  constructor() {
    this.loadBookings();
  }

  private loadBookings(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.bookings = JSON.parse(stored).map((b: any) => ({
        ...b,
        pickupDate: new Date(b.pickupDate),
        dropDate: new Date(b.dropDate)
      }));
    }
  }

  private saveBookings(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.bookings));
  }

  getBookings(): Observable<Booking[]> {
    return of(this.bookings);
  }

  addBooking(booking: Omit<Booking, 'id'>): Observable<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: Date.now() // Simple ID generation
    };
    this.bookings.push(newBooking);
    this.saveBookings();
    return of(newBooking);
  }

  updateBooking(id: number, updates: Partial<Booking>): Observable<Booking | null> {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...updates };
      this.saveBookings();
      return of(this.bookings[index]);
    }
    return of(null);
  }
}
