import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorldService } from '../world.service';
import { BorderCountries, Country, Currency } from '../country';
import { CommonModule } from '@angular/common';
import { DescriptionListComponent } from '../description-list/description-list.component';

@Component({
  selector: 'country-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DescriptionListComponent],
  templateUrl: './country-detail.component.html'
})
export class CountryDetailComponent implements OnInit {
  borderCountries?: BorderCountries;
  borderKeys: string[] = [];
  buttonClasses =
    'py-2 px-6 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700';
  capital?: string;
  country?: Country;
  currencies?: string;
  domains?: string;
  languages?: string;
  population = 0;

  constructor(
    private route: ActivatedRoute,
    private worldService: WorldService
  ) {
    const id = this.route.snapshot.params['id'];
    this.updateCountry(id);
  }

  ngOnInit() {
    window.scrollTo({ top: 0 });

    this.route.params.subscribe((routeParams) => {
      this.updateCountry(routeParams['id']);
    });
  }

  updateCountry(id: string) {
    this.worldService.getCountry(id).then((country) => {
      this.country = country;
      this.capital = country.capital?.[0] ?? 'N/A';
      this.currencies = Object.values(country.currencies ?? {})
        .map((c: unknown) => (c as Currency).name)
        .join(', ');
      this.domains = country.tld?.join(', ');
      this.languages = Object.values(country.languages ?? {}).join(', ');
      this.population = country.population.toLocaleString('en-us');

      this.worldService.getCountryBorders(country).then((borderCountries) => {
        this.borderCountries = borderCountries;
        this.borderKeys = Object.keys(borderCountries);
      });
    });
  }
}
