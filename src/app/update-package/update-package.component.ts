import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { PackageService, Package } from '../services/package.service'; // Adjust the path if necessary

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.css'],
})
export class UpdatePackageComponent implements OnInit {
  packages: Package[] = [];
  selectedPackage: Package | null = null;

  constructor(private packageService: PackageService, private router: Router) {} // Inject Router

  ngOnInit() {
    this.fetchPackages();
  }

  // Fetch all packages
  fetchPackages() {
    this.packageService.getPackages().subscribe({
      next: (data) => {
        this.packages = data;
      },
      error: (error) => {
        console.error('Error fetching packages:', error);
      },
    });
  }

  // Handle package selection
  onPackageSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;
    this.selectedPackage =
      this.packages.find((pkg) => pkg._id === selectedId) || null;
  }

  // Update package data
  updatePackage() {
    if (!this.selectedPackage) return;

    const updateData = {
      package_id: this.selectedPackage.package_id,
      package_destination: this.selectedPackage.package_destination,
      package_weight: this.selectedPackage.package_weight,
      isAllocated: this.selectedPackage.isAllocated,
    };

    this.packageService.updatePackage(updateData).subscribe({
      next: (response) => {
        console.log('Package updated successfully', response);
        this.router.navigate(['/list-packages']); 
      },
      error: (error) => {
        console.error('Error updating package:', error);
      },
    });
  }
}
