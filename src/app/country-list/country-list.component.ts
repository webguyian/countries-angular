import { Component, inject } from '@angular/core';
import { CountryCardComponent } from '../country-card/country-card.component';
import { WorldService } from '../world.service';
import { Country } from '../country';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'country-list',
  standalone: true,
  imports: [CommonModule, CountryCardComponent],
  templateUrl: './country-list.component.html'
})
export class CountryListComponent {
  allCountries: Country[] = [];
  countries: Country[] = [];
  page = 12;
  showMore = true;
  worldService = inject(WorldService);

  constructor() {
    this.worldService.getAllCountries().then((countries) => {
      const sortedCountries = countries
        .slice(0)
        .sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common)
        );
      this.allCountries = sortedCountries;
      this.countries = sortedCountries.slice(0, this.page);
    });
  }

  loadMore() {
    this.page = this.page * 2;
    this.countries = this.allCountries.slice(0, this.page);
  }
}
