import {Component, EventEmitter, Output} from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarRow,
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() toggle = new EventEmitter<void>();
}
