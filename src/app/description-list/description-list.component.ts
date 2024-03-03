import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListItem } from '../list-item';

@Component({
  selector: 'description-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-list.component.html'
})
export class DescriptionListComponent {
  @Input() items!: ListItem[];
}
