import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { LinkbuttonComponent } from "../../shared/components/linkbutton/linkbutton.component";
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-impressum',
  imports: [
    MatExpansionModule,
    MatIcon,
    MatButtonModule,
    LinkbuttonComponent,
    MatDivider
],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {
  
}
