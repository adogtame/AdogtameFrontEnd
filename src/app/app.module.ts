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
//
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    SpinnerModule,
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
