import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DriverService, Driver } from '../services/driver.service';
import { PackageService, Package } from '../services/package.service';
import { CustomUppercasePipe } from '../upper-case-pipe.pipe';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [CommonModule, RouterModule, CustomUppercasePipe],
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css'],
})
export class ListDriversComponent implements OnInit {
  drivers: Driver[] = [];
  packages: Package[] = [];
  filteredPackages: Package[] = [];
  loading: boolean = true;
  error: string | null = null;
  selectedDriverId: string | null = null;
  selectedDriverName: string | null = null;

  driversLoaded: boolean = false;
  packagesLoaded: boolean = false;

  constructor(
    private driverService: DriverService,
    private packageService: PackageService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.driversLoaded = true;
        this.checkIfDataIsLoaded();
      },
      error: (err) => {
        console.error('Error fetching drivers:', err);
        this.error = 'Failed to load drivers. Please try again later.';
        this.driversLoaded = true;
        this.checkIfDataIsLoaded();
      },
    });

    this.packageService.getPackages().subscribe({
      next: (data) => {
        this.packages = data;
        this.packagesLoaded = true;
        this.checkIfDataIsLoaded();
      },
      error: (err) => {
        console.error('Error fetching packages:', err);
        this.error = 'Failed to load packages. Please try again later.';
        this.packagesLoaded = true;
        this.checkIfDataIsLoaded();
      },
    });
  }

  checkIfDataIsLoaded() {
    if (this.driversLoaded && this.packagesLoaded) {
      this.loading = false;
    }
  }

  filterPackagesByDriver(driver_id: string, driver_name: string) {
    this.selectedDriverId = driver_id;
    this.selectedDriverName = driver_name;
    this.filteredPackages = this.packages.filter(
      (pkg) => pkg.driver_id === driver_id
    );
  }
}
