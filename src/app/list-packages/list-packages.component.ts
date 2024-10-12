import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PackageService, Package } from '../services/package.service';
import { WeightToGramsPipe } from '../weight-to-grams.pipe';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [CommonModule, RouterModule, WeightToGramsPipe],
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css'],
})
export class ListPackagesComponent implements OnInit {
  packages: Package[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private packageService: PackageService) {}

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
}
