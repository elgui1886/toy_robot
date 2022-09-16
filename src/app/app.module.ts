import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SquareCellComponent } from './components/square-cell/square-cell.component';

import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { GameConsoleComponent } from './components/game-console/game-console.component';
import { GameTablegroundComponent } from './components/game-tableground/game-tableground.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    SquareCellComponent,
    GameConsoleComponent,
    GameTablegroundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // Materials
    MatInputModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
