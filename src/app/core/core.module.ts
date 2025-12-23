import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
export interface Car {
  id: number;
  model: string;
  pricePerDay: number;
  imageUrl: string;
  // Add more: year, fuelType, etc.
}