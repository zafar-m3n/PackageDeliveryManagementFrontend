import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { DriverService, Driver } from '../services/driver.service';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css'],
})
export class DeleteDriverComponent implements OnInit {
  drivers: Driver[] = [];
  selectedDriverId: string = '';

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

  deleteDriver() {
    if (!this.selectedDriverId) {
      console.error('No driver selected');
      return;
    }

    this.driverService.deleteDriver(this.selectedDriverId).subscribe({
      next: (response) => {
        console.log('Driver deleted successfully', response);
        this.drivers = this.drivers.filter(
          (driver) => driver.driver_id !== this.selectedDriverId
        );
        this.selectedDriverId = '';
        // Redirect to list-drivers after successful deletion
        this.router.navigate(['/list-drivers']);
      },
      error: (error) => {
        console.error('Error deleting driver:', error);
      },
    });
  }
}
