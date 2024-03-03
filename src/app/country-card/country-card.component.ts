import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Country } from '../country';

@Component({
  selector: 'country-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './country-card.component.html'
})
export class CountryCardComponent implements OnInit {
  @Input() country!: Country;
  capital?: string;
  flagUrl?: string;
  name?: string;
  population?: string;

  ngOnInit() {
    this.name = this.country.name.common;
    this.flagUrl = `url(${this.country.flags.svg})`;
    this.capital = this.country.capital?.[0] ?? 'N/A';
    this.population = this.country.population.toLocaleString('en-us');
  }
}
