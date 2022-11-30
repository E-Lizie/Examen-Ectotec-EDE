import { Component } from '@angular/core';
import { ContactoService } from './services/contacto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContactoService],
})
export class AppComponent {
  title = 'Green Leaves';
}
