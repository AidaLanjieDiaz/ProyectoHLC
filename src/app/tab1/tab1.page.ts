import { Component, OnInit } from '@angular/core';
import { TabsCustomEvent } from '@ionic/angular';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
 /*  peliculas: any[] = Array(0); */
  carteleras: any[] = Array(0);
  populares: any[] = Array(0); 

  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];
  
  constructor( private moviesService : MoviesService) {

  }

  ngOnInit() {

    this.moviesService.getFeature()
    .subscribe ( (resp) => {
      console.log('Resp', resp);
      this.peliculasRecientes = resp.results;
    } );

    this.moviesService.getPopulares()
    .subscribe ( resp => {
      console.log(resp);
      this.peliculasPopulares = resp['results'];
    });

   /* for (let i=1; i<=20; i++) {
      this.peliculas.push(`Pelicula ${i}`);
    }
 */
    for (let i=1; i<=20; i++) {
      this.carteleras.push(`Cartelera ${i}`);
    }

    for (let i=1; i<=10; i++) {
      this.populares.push(`Popular ${i}`);
    } 
  }

  
  
}
