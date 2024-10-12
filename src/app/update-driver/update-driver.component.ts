import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { DriverService, Driver } from '../services/driver.service';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css'],
})
export class UpdateDriverComponent implements OnInit {
  drivers: Driver[] = [];
  selectedDriver: Driver | null = null;

  constructor(private driverService: DriverService, private router: Router) {} // Inject Router

  ngOnInit() {
    this.fetchDrivers();
  }

  fetchDrivers() {
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
      },
      error: (error) => {
        console.error('Error fetching drivers:', error);
      },
    });
  }

  onDriverSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;
    this.selectedDriver =
      this.drivers.find((driver) => driver._id === selectedId) || null;
  }

  updateDriver() {
    if (!this.selectedDriver) return;

    const updateData = {
      id: this.selectedDriver._id,
      driver_licence: this.selectedDriver.driver_licence,
      driver_department: this.selectedDriver.driver_department,
      driver_isActive: this.selectedDriver.driver_isActive,
    };

    this.driverService.updateDriver(updateData).subscribe({
      next: (response) => {
        console.log('Driver updated successfully', response);
        // Redirect to list-drivers after successful update
        this.router.navigate(['/list-drivers']);
      },
      error: (error) => {
        console.error('Error updating driver:', error);
      },
    });
  }
}
