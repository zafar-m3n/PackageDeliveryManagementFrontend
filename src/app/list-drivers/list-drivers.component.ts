import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DriverService, Driver } from '../services/driver.service';
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
  loading: boolean = true;
  error: string | null = null;

  constructor(private driverService: DriverService) {}

  ngOnInit() {
    this.fetchDrivers();
  }

  fetchDrivers() {
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching drivers:', err);
        this.error = 'Failed to load drivers. Please try again later.';
        this.loading = false;
      },
    });
  }
}
