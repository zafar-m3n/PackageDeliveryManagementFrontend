import { Component, OnInit } from '@angular/core';
import { PackageService } from '../services/package.service';
import { CommonModule } from '@angular/common';
import { io } from 'socket.io-client'; // Import Socket.IO
import { FormsModule } from '@angular/forms';

interface LocalPackage {
  _id?: string;
  package_id?: string;
  package_title: string;
  package_weight: number;
  package_destination: string;
  description?: string;
  isAllocated: boolean;
  driver_id: string;
  selectedLanguage?: string;
}

@Component({
  selector: 'app-translate-package',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './translate-package.component.html',
  styleUrls: ['./translate-package.component.css'],
})
export class TranslatePackageComponent implements OnInit {
  packages: LocalPackage[] = [];
  translatedPackages: {
    language: string;
    originalDescription: string;
    translatedDescription: string;
  }[] = [];
  private socket: any;

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();

    this.socket = io('http://localhost:8080');
    this.socket.on(
      'translated',
      (data: {
        language: string;
        originalDescription: string;
        translatedDescription: string;
      }) => {
        this.translatedPackages.push(data);
      }
    );
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe((data) => {
      this.packages = data.map((pkg) => ({
        ...pkg,
        selectedLanguage: 'es',
      }));
    });
  }

  translateDescription(pkg: LocalPackage): void {
    this.socket.emit('translate', {
      text: pkg.description,
      targetLanguage: pkg.selectedLanguage || 'es',
      originalDescription: pkg.description,
      language: this.getLanguageName(pkg.selectedLanguage || 'es'),
    });
  }

  getLanguageName(code: string): string {
    const languages: { [key: string]: string } = {
      es: 'Spanish',
      fr: 'French',
      de: 'German',
    };
    return languages[code] || 'Unknown';
  }
}
