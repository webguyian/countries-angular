import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { REGIONS } from '../app.constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent {
  @ViewChild('dropdown') dropdown!: ElementRef<HTMLDivElement>;
  dropdownClass = 'hidden';
  expanded = false;
  regions = REGIONS;
  regionQuery?: string;
  searchQuery?: string;
  clickOutsideFn?: (event: MouseEvent) => void;

  constructor(private router: Router, private route: ActivatedRoute) {}

  handleClickOutside(event: MouseEvent) {
    const el = this.dropdown.nativeElement;
    const target = event.target as HTMLElement;

    if (this.expanded && el && !el.contains(target)) {
      this.expanded = false;
      if (typeof this.clickOutsideFn === 'function') {
        document.removeEventListener('click', this.clickOutsideFn);
      }
    }
  }

  handleSubmit(event: SubmitEvent) {
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const search = formData.get('search') as string;
    event.preventDefault();

    if (search) {
      this.searchQuery = search;
    }

    this.updateQuery();
  }

  onResetRegion() {
    this.regionQuery = undefined;
    this.onToggle();
    this.updateQuery();
  }

  onResetSearch() {
    this.searchQuery = undefined;
    this.updateQuery();
  }

  onToggle() {
    this.expanded = !this.expanded;
    this.clickOutsideFn =
      this.clickOutsideFn || this.handleClickOutside.bind(this);

    if (this.expanded) {
      document.addEventListener('click', this.clickOutsideFn);
    } else {
      document.removeEventListener('click', this.clickOutsideFn);
    }
  }

  onSelect(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const region = target.textContent?.trim();

    if (region) {
      this.regionQuery = region;
      this.updateQuery();
    }

    this.onToggle();
  }

  updateQuery() {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {
        region: this.regionQuery,
        search: this.searchQuery
      }
    });
  }
}
