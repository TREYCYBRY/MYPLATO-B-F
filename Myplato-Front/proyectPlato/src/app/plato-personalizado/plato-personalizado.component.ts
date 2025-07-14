import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service'; // Ajusta la ruta si es necesario
import { Plato } from '../../model/plato.model';       // Ajusta la ruta si es necesario
import { categoriaExtra } from '../../model/categoriaExtra.model'; // Ajusta la ruta si es necesario
import { extra } from '../../model/extra.model';       // Ajusta la ruta si es necesario
// Importa el modelo para el plato personalizado que guardarás
import { PlatoPersonalizado } from '../../model/platoPersonalizado.model'; // Necesitarás crear este modelo
import { ExtraPlatoPersonalizado } from '../../model/extraPlatoPersonalizado.model'; // Necesitarás crear este modelo

@Component({
  selector: 'app-plato-personalizado',
  standalone: false,
  templateUrl: './plato-personalizado.component.html',
  styleUrls: ['./plato-personalizado.component.css'], // Usaremos este archivo CSS
  providers: [ApiService] // Asegúrate de que el ApiService esté disponible
})
export class PlatoPersonalizadoComponent implements OnInit {

  platoSeleccionado: Plato | null = null; // El plato que el usuario ha elegido personalizar
  categoriasExtra: categoriaExtra[] = [];
  selectedCategoriaExtra: categoriaExtra | null = null;
  allExtras: extra[] = []; // Todos los extras cargados desde la API
  filteredExtras: extra[] = []; // Extras filtrados por la categoría seleccionada

  // Objeto para almacenar las cantidades de extras seleccionados: { extraId: cantidad }
  selectedExtras: { [key: number]: number } = {};

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    // Aquí puedes cargar un plato por defecto o recibirlo a través de un servicio
    // o de parámetros de ruta si vienes de una página de selección de platos.
    // Por ahora, simularemos la carga de un plato.
    this.loadInitialData();
  }

  loadInitialData(): void {
    // Simula la carga de un plato (en un caso real, podrías obtenerlo de un servicio
    // o pasarlo como Input desde un componente padre).
    // Usaremos un plato de ejemplo o el primero de tu API de platos.
    this.api.getPlatos().subscribe({
      next: (platos) => {
        if (platos && platos.length > 0) {
          this.platoSeleccionado = platos[0]; // Selecciona el primer plato para este ejemplo
          // Puedes buscar el plato específico por ID si viene de un ruteo
          // this.platoSeleccionado = platos.find(p => p.id === somePlatoId);
        } else {
          console.warn('No hay platos disponibles para seleccionar.');
        }
      },
      error: (err) => console.error('Error al cargar platos:', err)
    });

    this.api.getCategoriasExtras().subscribe({
      next: (categorias) => {
        this.categoriasExtra = categorias;
        // Opcional: seleccionar la primera categoría por defecto al cargar
        // if (this.categoriasExtra.length > 0) {
        //   this.selectCategoriaExtra(this.categoriasExtra[0]);
        // }
      },
      error: (err) => console.error('Error al cargar categorías de extras:', err)
    });

    this.api.getExtra().subscribe({
      next: (extras) => {
        this.allExtras = extras;
        // Filtrar extras si ya hay una categoría seleccionada al cargar
        if (this.selectedCategoriaExtra) {
          this.filterExtrasByCategory();
        }
      },
      error: (err) => console.error('Error al cargar extras:', err)
    });
  }

  /**
   * Maneja la selección de una categoría de extra.
   * @param categoria La categoría de extra seleccionada.
   */
  selectCategoriaExtra(categoria: categoriaExtra): void {
    this.selectedCategoriaExtra = categoria;
    this.filterExtrasByCategory();
  }

  /**
   * Filtra los extras basados en la categoría de extra seleccionada.
   */
  filterExtrasByCategory(): void {
    if (this.selectedCategoriaExtra) {
      this.filteredExtras = this.allExtras.filter(
        extra => extra.idcategoria_extra === this.selectedCategoriaExtra!.id
      );
    } else {
      this.filteredExtras = []; // Si no hay categoría seleccionada, no mostrar extras
    }
  }

  /**
   * Actualiza la cantidad de un extra seleccionado.
   * @param extra El objeto extra cuya cantidad se va a actualizar.
   * @param change El cambio en la cantidad (-1 para decrementar, 1 para incrementar).
   */
  updateExtraQuantity(extra: extra, change: number): void {
    const currentQuantity = this.selectedExtras[extra.id] || 0;
    const newQuantity = currentQuantity + change;

    // Obtener el límite de cantidad de la categoría de este extra
    const categoriaDelExtra = this.categoriasExtra.find(cat => cat.id === extra.idcategoria_extra);
    const limit = categoriaDelExtra ? categoriaDelExtra.cantidadLimite : Infinity;

    if (newQuantity >= 0 && newQuantity <= limit) {
      this.selectedExtras[extra.id] = newQuantity;
    } else if (newQuantity > limit) {
      alert('Límite de ${limit} unidades para la categoría "${categoriaDelExtra?.nombre}" alcanzado.');
    }
    // Si newQuantity < 0, no hacemos nada (evita cantidades negativas)
  }

  /**
   * Se llama cuando el usuario confirma la selección del plato principal.
   * Puedes usar esto para habilitar la sección de extras, si no lo haces por defecto.
   */
  onPlatoListo(): void {
    if (this.platoSeleccionado) {
      console.log('Plato principal seleccionado:', this.platoSeleccionado.nombre);
      // Aquí podrías, por ejemplo, desplazarte a la sección de extras
      // o deshabilitar la selección de plato si solo se permite una vez
    }
  }

  /**
   * Maneja el error de carga de imagen.
   * @param event El evento de error.
   */
  onImageError(event: any): void {
    event.target.src = 'https://placehold.co/150x150/cccccc/ffffff?text=No+Image'; // Placeholder para imágenes rotas
  }

  /**
   * Guarda el plato personalizado en la base de datos a través del servicio API.
   * Esto implicará crear un nuevo modelo de datos para el plato personalizado
   * y sus extras asociados, y luego enviarlo a Django.
   */
  guardarPlatoPersonalizado(): void {
    if (!this.platoSeleccionado) {
      alert('Por favor, selecciona un plato antes de guardar.');
      return;
    }

    // Preparar el objeto para enviar a la API de Django
    // Esto dependerá de cómo esperes recibirlo en tu backend.
    // Asumo que tienes un modelo 'PlatoPersonalizado' y 'ExtraPlatoPersonalizado' en Django.

    const extrasParaGuardar: ExtraPlatoPersonalizado[] = [];
    for (const extraId in this.selectedExtras) {
      const quantity = this.selectedExtras[extraId];
      if (quantity > 0) {
        // Busca el objeto extra completo por su ID
        const extraItem = this.allExtras.find(e => e.id === parseInt(extraId));
        if (extraItem) {
          extrasParaGuardar.push({
            id_extra: extraItem.id,
            cantidad: quantity
            // Si tu modelo Django tiene otros campos como precio o nombre aquí, añádelos
            // precio_por_porcion: extraItem.precioporPorcion,
            // nombre_extra: extraItem.nombre
          });
        }
      }
    }

    const nuevoPlatoPersonalizado: PlatoPersonalizado = {
      // Si tu modelo PlatoPersonalizado tiene un ID autoincremental, no lo incluyas aquí
      id_plato_base: this.platoSeleccionado.id, // ID del plato base original
      nombre_personalizado: this.platoSeleccionado.nombre + ' Personalizado', // Un nombre para el plato personalizado
      precio_total: this.calculateTotalPrice(), // Calcular el precio total
      extras_seleccionados: extrasParaGuardar, // Lista de extras seleccionados y sus cantidades
      // Otros campos que tu modelo Django de PlatoPersonalizado pueda requerir
      // Por ejemplo, id_cliente, id_pedido, etc.
    };

    console.log('Enviando a guardar:', nuevoPlatoPersonalizado);

    // Aquí llamarías a tu ApiService para guardar este objeto.
    // Necesitarás una nueva función en ApiService para esto, por ejemplo:
    // this.api.postPlatoPersonalizado(nuevoPlatoPersonalizado).subscribe({
    //   next: (response) => {
    //     console.log('Plato personalizado guardado con éxito:', response);
    //     alert('Plato personalizado guardado con éxito!');
    //     // Opcional: Navegar a otra página o resetear el componente
    //   },
    //   error: (err) => {
    //     console.error('Error al guardar el plato personalizado:', err);
    //     alert('Error al guardar el plato personalizado. Consulta la consola.');
    //   }
    // });
    // Por ahora, solo simularé el guardado con un alert.
    alert('Simulación: Plato personalizado listo para guardar. Revisa la consola.');
  }

  /**
   * Calcula el precio total del plato personalizado (plato base + extras).
   */
  calculateTotalPrice(): number {
    let totalPrice = this.platoSeleccionado ? this.platoSeleccionado.precio : 0;
    for (const extraId in this.selectedExtras) {
      const quantity = this.selectedExtras[extraId];
      if (quantity > 0) {
        const extraItem = this.allExtras.find(e => e.id === parseInt(extraId));
        if (extraItem) {
          totalPrice += extraItem.precioporPorcion * quantity;
        }
      }
    }
    return totalPrice;
  }
}