import { bebida } from "./bebida.model";

export class bebidaPedido {
  id: number;
  id_bebida: number;
  id_pedido: number;
  cantidad: number;
  precioFinal: number;
  bebida?: bebida; // <- este campo te permitirá acceder a nombre, imagen, etc.
}