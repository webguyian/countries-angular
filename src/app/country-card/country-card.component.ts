import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Country } from '../country';
import { WorldService } from '../world.service';

@Component({
  selector: 'country-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './country-card.component.html'
})
export class CountryCardComponent {
  @Input() country!: Country;
  worldService = inject(WorldService);
}
