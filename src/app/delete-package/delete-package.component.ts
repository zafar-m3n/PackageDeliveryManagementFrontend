import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackageService, Package } from '../services/package.service'; // Adjust the path if necessary

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.css'],
})
export class DeletePackageComponent implements OnInit {
  packages: Package[] = [];
  selectedPackageId: string = '';

  constructor(private packageService: PackageService) {}

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

  // Delete the selected package
  deletePackage() {
    if (!this.selectedPackageId) {
      console.error('No package selected');
      return;
    }

    this.packageService.deletePackage(this.selectedPackageId).subscribe({
      next: (response) => {
        console.log('Package deleted successfully', response);
        this.packages = this.packages.filter(
          (pkg) => pkg.package_id !== this.selectedPackageId
        );
        this.selectedPackageId = ''; // Reset the selected package
      },
      error: (error) => {
        console.error('Error deleting package:', error);
      },
    });
  }
}
