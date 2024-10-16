import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { PackageService, Package } from '../services/package.service';
import { CommonModule } from '@angular/common';

interface PackageWithDistance extends Package {
  distanceToMelbourne?: string; // Add optional property for distance
}

@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generative-ai.component.html',
  styleUrls: ['./generative-ai.component.css'],
})
export class GenerativeAiComponent implements OnInit {
  packages: PackageWithDistance[] = [];
  socket: any;

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();
    this.connectToSocket();
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe((data) => {
      this.packages = data.map((pkg) => ({
        ...pkg,
        distanceToMelbourne: 'N/A',
      })); // Initialize distance
    });
  }

  connectToSocket(): void {
    this.socket = io('http://localhost:8080');
    console.log('Connected to socket');
  }

  sendDestinationForDistance(pkg: PackageWithDistance): void {
    this.socket.emit('calculateDistance', {
      destination: pkg.package_destination,
    });

    this.socket.on('distanceCalculated', (distance: string) => {
      pkg.distanceToMelbourne = distance;
    });
  }
}
