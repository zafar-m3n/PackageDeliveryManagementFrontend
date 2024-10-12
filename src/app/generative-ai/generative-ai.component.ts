import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { PackageService, Package } from '../services/package.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generative-ai.component.html',
  styleUrls: ['./generative-ai.component.css'],
})
export class GenerativeAiComponent implements OnInit {
  packages: Package[] = [];
  socket: any;

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();
    this.connectToSocket();
  }
  loadPackages(): void {
    this.packageService.getPackages().subscribe((data) => {
      this.packages = data;
    });
  }

  connectToSocket(): void {
    this.socket = io('http://localhost:8080');
    console.log('Connected to socket');
  }

  sendDestinationForDistance(destination: string): void {
    this.socket.emit('calculateDistance', { destination });
    this.socket.on('distanceResult', (distance: number) => {
      alert(`Distance to Melbourne: ${distance} km`);
    });
  }
}
