export interface User {
  name: string;
  email: string;
  mobile: string;
}

export interface Booking {
  id: number;
  carId: number;
  user: User;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: Date;
  dropDate: Date;
  distance: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed';
}