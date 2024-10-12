import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PackageService, Package } from '../services/package.service';
import { DriverService, Driver } from '../services/driver.service';
import { WeightToGramsPipe } from '../weight-to-grams.pipe';
import { CustomUppercasePipe } from '../upper-case-pipe.pipe';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [CommonModule, RouterModule, WeightToGramsPipe, CustomUppercasePipe],
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css'],
})
export class ListPackagesComponent implements OnInit {
  packages: Package[] = [];
  selectedDriver: Driver | null = null;
  selectedPackageTitle: string | null = null; // To store the package name
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private packageService: PackageService,
    private driverService: DriverService
  ) {}

  ngOnInit() {
    this.fetchPackages();
  }

  fetchPackages() {
    this.packageService.getPackages().subscribe({
      next: (data) => {
        this.packages = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching packages:', err);
        this.error = 'Failed to load packages. Please try again later.';
        this.loading = false;
      },
    });
  }

  // Fetch driver details by the driver_id and package_title
  fetchDriverDetails(driver_id: string, package_title: string) {
    this.selectedPackageTitle = package_title; // Store package title
    this.driverService.getDrivers().subscribe({
      next: (drivers) => {
        this.selectedDriver =
          drivers.find((driver) => driver._id === driver_id) || null;
      },
      error: (err) => {
        console.error('Error fetching driver details:', err);
        this.error = 'Failed to load driver details.';
      },
    });
  }
}
