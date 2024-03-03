import { Injectable } from '@angular/core';
import { API_BASE_URL } from './app.constants';
import type { BorderCountries, Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  url = `${API_BASE_URL}/all`;

  async getAllCountries() {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getCountry(id: string) {
    const response = await fetch(`${API_BASE_URL}/alpha/${id}`).then((res) =>
      res.json()
    );

    return response?.[0];
  }

  async getCountryBorders(country: Country) {
    if (!country.borders) {
      return {};
    }

    const response = await fetch(
      `${API_BASE_URL}/alpha?codes=${country.borders.join()}&fields=name,cca3`
    ).then((res) => res.json());

    const countries =
      response.reduce((acc: BorderCountries, cur: Country) => {
        acc[cur.cca3] = cur.name.common;
        return acc;
      }, {}) ?? {};

    return countries;
  }
}
