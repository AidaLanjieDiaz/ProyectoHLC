import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { Cast, PeliculaDetalle } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';
import { DataLocalService } from '../../services/data-local.service';
import { start } from 'repl';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  @Input() id: any;

  pelicula: PeliculaDetalle = {poster_path: '', id: ''};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private dataLocal: DataLocalService) { }

  async ngOnInit() {
    // console.log('ID', this.id );


    let existe = await this.dataLocal.existePelicula ( this.id );

    if ( await existe) {
      this.estrella = 'star'
    } else {
      this.estrella = 'start.outline'
    }
    
    this.moviesService.getPeliculaDetalle( this.id )
        .subscribe( resp => {
          console.log( resp );
          this.pelicula = resp;
        });

    this.moviesService.getActoresPelicula( this.id )
        .subscribe( resp => {
          console.log( resp );
          this.actores = resp.cast;
        });

  }

  async star(id:string){
    const existe = await this.dataLocal.existePelicula ( this.id);
    if( await existe) {
      this.estrella  = 'star'
    } else {
      this.estrella = 'star-outline'
    }
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async favorito() {
    const existe = this.dataLocal.guardarPelicula( this.pelicula );
    this.estrella = await (existe) ? 'star' : 'star-outline';
  }

 
 
}