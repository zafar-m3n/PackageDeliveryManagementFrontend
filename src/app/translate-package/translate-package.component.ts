import { Component, OnInit } from '@angular/core';
import { PackageService, Package } from '../services/package.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-translate-package',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translate-package.component.html',
  styleUrls: ['./translate-package.component.css'],
})
export class TranslatePackageComponent implements OnInit {
  packages: Package[] = [];

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe((data) => {
      this.packages = data;
    });
  }
}
