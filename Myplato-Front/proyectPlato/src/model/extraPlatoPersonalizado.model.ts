export class ExtraPlatoPersonalizado {
    id?: number; // Si Django lo generará para la relación
    id_extra: number; // ID del extra original
    cantidad: number;
    // Puedes añadir más campos si los necesitas en la relación, e.g.:
    // precio_por_porcion?: number;
    // nombre_extra?: string;
}