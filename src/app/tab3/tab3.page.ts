import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];

  generos: Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(private dataLocal: DataLocalService, 
    private modalCtrl: ModalController,
    private moviesService: MoviesService) {

  }

  async  ngOnInit() {
   /*  this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero( this.generos, this.peliculas ); */
  }

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero( this.generos, this.peliculas );
  }
  
  pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[] ) {
    this.favoritoGenero = [];

    generos.forEach( genero => {
      generos.forEach( genero => {
        this.favoritoGenero.push({
          genero: genero.name,
          pelis: peliculas.filter( peli => {
            return peli.genres.find( genre => genre.id === genero.id );
          })
        });
    });

  });
}

  async verDetalle( id: string ) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.onDidDismiss().then(()=> {
      this.ionViewWillEnter()
    })
    modal.present();

  }
}
