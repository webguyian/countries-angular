import { Injectable } from '@angular/core';
import { API_BASE_URL } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  url = `${API_BASE_URL}/all`;

  async getAllCountries() {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}
