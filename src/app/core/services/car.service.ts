import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class CarService {
  private cars: Car[] = [
    {
      id: 1,
      name: 'Tesla Model 3',
      model: 'Model 3',
      year: 2023,
      pricePerDay: 100,
      image: 'https://cdn.pixabay.com/photo/2016/06/20/22/41/mercedes-benz-1470152_960_720.jpg',
      description: 'Electric sedan with autopilot.',
      features: ['Autopilot', 'Supercharger', 'Premium Audio'],
      available: true
    },
    {
      id: 2,
      name: 'BMW X5',
      model: 'X5',
      year: 2022,
      pricePerDay: 150,
      image: 'https://tse3.mm.bing.net/th/id/OIP.O6harYH3hBrxHwSmglgrBAHaE8?cb=ucfimg2&ucfimg=1&w=1200&h=800&rs=1&pid=ImgDetMain&o=7&rm=3',
      description: 'Luxury SUV with advanced tech.',
      features: ['All-Wheel Drive', 'Leather Seats', 'Navigation'],
      available: true
    },
    {
      id: 3,
      name: 'Honda Civic',
      model: 'Civic',
      year: 2021,
      pricePerDay: 50,
      image: 'https://wallup.net/wp-content/uploads/2019/09/1014673-mercedes-piecha-amg-gt-rsr-cars-blue-modified.jpg',
      description: 'Reliable compact car.',
      features: ['Fuel Efficient', 'Bluetooth', 'Backup Camera'],
      available: true
    }
  ];

  constructor() {}

  getCars(): Observable<Car[]> {
    return of(this.cars);
  }

  getCarById(id: number): Observable<Car | undefined> {
    const car = this.cars.find(c => c.id === id);
    return of(car);
  }
}