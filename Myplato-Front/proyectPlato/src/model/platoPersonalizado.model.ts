import { ExtraPlatoPersonalizado } from './extraPlatoPersonalizado.model';

export class PlatoPersonalizado {
    id?: number;
    id_plato_base: number;
    nombre_personalizado: string;
    precio_total: number;
    extras_seleccionados: ExtraPlatoPersonalizado[]; 
}