import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DriverService, Driver } from '../services/driver.service';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
})
export class AddDriverComponent {
  driver: Omit<Driver, '_id' | 'driver_id' | 'driver_createdAt'> = {
    driver_name: '',
    driver_department: 'food',
    driver_licence: '',
    driver_isActive: true,
  };

  constructor(private driverService: DriverService) {}

  onSubmit() {
    this.driverService.addDriver(this.driver).subscribe({
      next: (response) => {
        console.log('Driver added successfully', response);
        // Reset the form
        this.driver = {
          driver_name: '',
          driver_department: 'food',
          driver_licence: '',
          driver_isActive: true,
        };
      },
      error: (error) => {
        console.error('Error adding driver', error);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }
}
