import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { DriverService, Driver } from '../services/driver.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css'],
})
export class TextToSpeechComponent implements OnInit {
  drivers: Driver[] = [];
  socket: any;

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
    this.connectToSocket();
  }

  loadDrivers(): void {
    this.driverService.getDrivers().subscribe((data) => {
      this.drivers = data;
    });
  }

  connectToSocket(): void {
    this.socket = io('http://localhost:8080');
    console.log('Connected to socket');
  }

  sendForTextToSpeech(driverLicence: string): void {
    this.socket.emit('textToSpeech', { licence: driverLicence });
    this.socket.on('audioFile', (fileUrl: string) => {
      console.log(`Audio file available at: ${fileUrl}`);
      alert(`Audio file available at: ${fileUrl}`);
    });
  }
}
