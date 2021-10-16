import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsuariosIngresarComponent } from './components/usuarios-ingresar/usuarios-ingresar.component';
import { UsuariosRegistrarComponent } from './components/usuarios-registrar/usuarios-registrar.component';
import { UsuariosListarComponent } from './components/usuarios-listar/usuarios-listar.component';
import {UsuariosService} from './services/usuarios.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { UsuariosPrincipalComponent } from './components/usuarios-principal/usuarios-principal.component';
import { UsuariosHomeComponent } from './components/usuarios-home/usuarios-home.component';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { UsuariosBuscadorAvanzadoComponent } from './components/usuarios-buscador-avanzado/usuarios-buscador-avanzado.component';
import { UsuariosPerfilComponent } from './components/usuarios-perfil/usuarios-perfil.component';
import { UsuariosAnimalComponent } from './components/usuarios-animal/usuarios-animal.component';
import { FilterPipe } from '../app/components/pipes/filter.pipe';
import { UsuariosVerificandoComponent } from './components/usuarios-verificando/usuarios-verificando.component';
import { UsuariosVerificarComponent } from './components/usuarios-verificar/usuarios-verificar.component';
import { UsuariosVerificadoComponent } from './components/usuarios-verificado/usuarios-verificado.component';
import { UsuariosVerificacionfallidaComponent } from './components/usuarios-verificacionfallida/usuarios-verificacionfallida.component';

//Spinner de carga
import { SpinnerModule } from './shared/components/spinner/spinner.module';
//
//Agregado para probar si funca
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//El tipo del video puso @shared no ./
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';

//Subir a firebase
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';

// Modulos de firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { InformesComponent } from './components/informes/informes.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';

//
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UsuariosIngresarComponent,
    UsuariosRegistrarComponent,
    UsuariosListarComponent,
    UsuariosPrincipalComponent,
    UsuariosHomeComponent,
    UsuariosBuscadorAvanzadoComponent,
    UsuariosPerfilComponent,
    UsuariosAnimalComponent,
    FilterPipe,
    UsuariosVerificandoComponent,
    UsuariosVerificarComponent,
    UsuariosVerificadoComponent,
    UsuariosVerificacionfallidaComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    InformesComponent,
    PasswordRecoveryComponent,
    NewPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ChartsModule
  ],
  providers: [
    UsuariosService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    },
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
