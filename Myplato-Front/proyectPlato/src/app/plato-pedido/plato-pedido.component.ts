import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-plato-pedido',
  standalone: false,
  templateUrl: './plato-pedido.component.html',
  styleUrl: './plato-pedido.component.css',
  providers: [ApiService]
})
export class PlatoPedidoComponent {

}
