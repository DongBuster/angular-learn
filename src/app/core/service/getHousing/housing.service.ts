import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Housinglocation } from '../../models/housinglocation';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) {}
  getAllHousingLocations(): Observable<Housinglocation[]> {
    return this.http.get<Housinglocation[]>(this.url);
  }

  getHousingLocationById(id: number): Observable<Housinglocation> {
    return this.http.get<Housinglocation>(`${this.url}/${id}`);
  }
}
