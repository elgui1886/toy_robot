import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { SquareCellComponent } from './components/square-cell/square-cell.component';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GameConsoleComponent } from './components/game-console/game-console.component';
import { GameTablegroundComponent } from './components/game-tableground/game-tableground.component';
import { GameConfigurationService } from './services/game.configuration.service'


const appConfigInitializer = (appConfig: GameConfigurationService) => {
  return () => {
    const appconfigpath = 'config.json';
    return appConfig.loadConfig(appconfigpath);
  };
};

export const APP_CONFIG_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: appConfigInitializer,
  multi: true,
  deps: [GameConfigurationService],
};

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
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [APP_CONFIG_INITIALIZER],
  bootstrap: [AppComponent]
})
export class AppModule { }
