import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { LinkbuttonComponent } from "../../shared/components/linkbutton/linkbutton.component";

@Component({
  selector: 'app-impressum',
  imports: [
    MatExpansionModule,
    MatIcon,
    MatButtonModule,
    LinkbuttonComponent
],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {
  
}
