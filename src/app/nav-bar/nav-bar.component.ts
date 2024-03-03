import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styles: ``
})
export class NavBarComponent {
  toggleTheme() {
    document.documentElement.classList.toggle('dark');
  }
}
