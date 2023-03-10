import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage,
    public toastCtrl: ToastController) { 
      this.cargarFavoritos();
    }

  async presentToast(mensaje: string) {

    const toast = await this.toastCtrl.create({
        message: mensaje,
        duration: 2000,
        position: 'middle',
    });

    await toast.present();

  }
  
  async guardarPelicula( pelicula: PeliculaDetalle ) {

    const peliculas = await this.storage.get('peliculas');
    console.log(peliculas);

    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas ) {
      if ( peli.id === pelicula.id ) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
      this.presentToast(mensaje);

    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
      this.presentToast(mensaje);
    }

    this.storage.set('peliculas', this.peliculas );

    return !existe;
    
  }

  async cargarFavoritos () {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula( id: any ) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );

    return (existe) ? true : false;
  }
}
