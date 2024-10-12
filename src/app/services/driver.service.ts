import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Driver {
  _id: string;
  driver_id: string;
  driver_name: string;
  driver_department: string;
  driver_licence: string;
  driver_isActive: boolean;
  driver_createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private apiUrl = 'http://localhost:8080/34082115/Durgka/api/v1/drivers';

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  addDriver(
    driver: Omit<Driver, '_id' | 'driver_id' | 'driver_createdAt'>
  ): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver);
  }

  updateDriver(updateData: {
    id: string;
    driver_licence: string;
    driver_department: string;
    driver_isActive: boolean;
  }): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, updateData);
  }

  deleteDriver(driverId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${driverId}`);
  }
}
