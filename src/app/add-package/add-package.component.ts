import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../services/package.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Driver, DriverService } from '../services/driver.service';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
})
export class AddPackageComponent {
  drivers: Driver[] = [];
  selectedDriverId: string = '';
  package = {
    package_title: '',
    package_weight: 0,
    package_destination: '',
    description: '',
    isAllocated: false,
    driver_id: '',
  };

  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private driverService: DriverService,
    private packageService: PackageService,
    private http: HttpClient,
    private router: Router // Inject Router here
  ) {}

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

  onSubmit() {
    // Ensure the driver_id is assigned from the selected driver
    this.package.driver_id = this.selectedDriverId;

    this.packageService.addPackage(this.package).subscribe({
      next: (response) => {
        console.log('Package added successfully', response);
        this.message = 'Package added successfully!';
        this.isSuccess = true;
        this.resetForm();
        // Redirect to list-packages after successful addition
        this.router.navigate(['/list-packages']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding package', error);
        if (error.error instanceof ErrorEvent) {
          this.message = `Error: ${error.error.message}`;
        } else {
          this.message = `Error ${error.status}: ${
            error.error.message || 'Unknown error'
          }`;
        }
        this.isSuccess = false;
      },
    });
  }

  resetForm() {
    this.package = {
      package_title: '',
      package_weight: 0,
      package_destination: '',
      description: '',
      isAllocated: false,
      driver_id: '',
    };
  }
}
