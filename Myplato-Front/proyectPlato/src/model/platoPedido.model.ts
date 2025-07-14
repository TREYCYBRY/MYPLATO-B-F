import { Plato } from "./plato.model";

export class PlatoPedido {
  id?: number;
  idpedido: number;
  idplato: number;
  precioBasePlato: number;
  precioFinalPlato: number;
  tipoPedido: string;
  cantidad?: number; // Añadido para manejar la cantidad
  plato?:Plato
}