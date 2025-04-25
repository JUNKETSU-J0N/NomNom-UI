import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-linkbutton',
  imports: [
    MatButtonModule
  ],
  templateUrl: './linkbutton.component.html',
  styleUrl: './linkbutton.component.scss'
})
export class LinkbuttonComponent {

  //kann man bestimmt noch erweitern. hatte nur keine lust den immer wieder zu definieren
  text = input.required<string>();
  link = input.required<string>();
}
