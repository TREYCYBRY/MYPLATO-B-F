export class Pedido {
    id: number;
    cantidadTotalPlatos: number;
    cantidadTotalBebidas: number;
    montoTotal: number;
    fecha: Date;
    idcliente: number;
    idmesa:number;
    estado: boolean=false; // True si el pedido está listo para servir, False si está en preparación
}