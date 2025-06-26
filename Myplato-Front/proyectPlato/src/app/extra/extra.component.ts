import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { extra } from '../../model/extra.model';
import { categoriaExtra } from '../../model/categoriaExtra.model';

@Component({
  selector: 'app-extra',
  standalone: false,
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.css',
  providers: [ApiService]
})
export class ExtraComponent {
  
}
