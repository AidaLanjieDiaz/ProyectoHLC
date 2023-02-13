import { Component } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['John Wick', 'El niño y la bestia', 'Mi vecino Totoro', 'La princesa prometida', 'Willow'];

  constructor(private MoviesService: MoviesService,
    private modalCtrl: ModalController) { }

  buscar( event: any ) {
    const valor: string = event.detail.value;

    if ( valor.length === 0 ) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    console.log(valor);
    this.buscando = true;

  this.MoviesService.getBuscarPeliculas(valor)
  .subscribe ( resp => {
    console.log(resp);
    this.peliculas = resp['results'];
  });

  }

  async verDetalle( id: string ) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }
  

  

}
