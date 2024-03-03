import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { REGION_KEY, SEARCH_KEY } from '../app.constants';
import { Country } from '../country';
import { CountryCardComponent } from '../country-card/country-card.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { WorldService } from '../world.service';

@Component({
  selector: 'country-list',
  standalone: true,
  imports: [CommonModule, CountryCardComponent, SearchFilterComponent],
  templateUrl: './country-list.component.html'
})
export class CountryListComponent implements OnInit {
  allCountries: Country[] = [];
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  page = 12;
  regionQuery?: string;
  searchQuery?: string;

  constructor(
    private route: ActivatedRoute,
    private worldService: WorldService
  ) {
    this.worldService.getAllCountries().then((countries) => {
      const sortedCountries = countries
        .slice(0)
        .sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common)
        );
      this.allCountries = sortedCountries;
      this.filterCountries();
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.regionQuery = queryParams[REGION_KEY];
      this.searchQuery = queryParams[SEARCH_KEY];
      this.filterCountries();
    });
  }

  filterCountries() {
    this.filteredCountries = this.allCountries
      .filter((country: Country) => {
        return this.regionQuery ? country.region === this.regionQuery : country;
      })
      .filter((country: Country) => {
        const search = this.searchQuery;
        return search
          ? country.name.common.toLowerCase().startsWith(search.toLowerCase())
          : country;
      });

    this.countries = this.filteredCountries.slice(0, this.page);
  }

  loadMore() {
    this.page = this.page * 2;
    this.filterCountries();
  }

  get showMore() {
    return this.filteredCountries.length > this.countries.length;
  }
}
