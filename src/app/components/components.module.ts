import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { DetalleComponent } from './detalle/detalle.component';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';



@NgModule({
  entryComponents: [
    DetalleComponent
  ],
  declarations: [
    SlideshowBackdropComponent,
    DetalleComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent
  ],
  exports: [
    SlideshowBackdropComponent,
    DetalleComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
