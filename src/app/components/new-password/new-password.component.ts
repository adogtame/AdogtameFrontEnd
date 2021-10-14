import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

    token: string = "";
	UsuarioID: any;
	reintentar: boolean = false;
	mensaje: string = "";
	TokenJSON = { token: "" };
    password: string = "";
    repassword: string = "";
    errrorPassword = 0;
    errorRePassrword = 0;
    enviado: boolean = false;

  constructor(private usuariosService: UsuariosService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

    newPassword() {
        console.log('Cliente -> verificando');

        //Obtengo el token desde el parametro de la URL que es enviada por email
        let token = this.router.snapshot.params.token;
        console.log('Cliente token => ', token);

        this.usuariosService.newPassword(token, this.password).subscribe(
            res => {
                let result: any = res;
                
                console.log('Cliente res desde metodo verificar => ', result.message);
                if(result.message > 0){
                    //this.route.navigate(['usuarios/verificado']);
                    console.log('inside true');
                    this.enviado = true;
                } else {
                    //this.route.navigate(['usuarios/verificacionfallida']);
                }
            },
            err => {
                console.log(err);
            }
        );

        //Paso el token a una variable de tipo objeto para que jwt no me lo rechace y se produzca un error 500
        this.TokenJSON = { token : token };
        //Decodifico el token para obtener el id del usuario
        this.usuariosService.decodificarToken(this.TokenJSON).subscribe(
            res => {
                this.UsuarioID = res;
                console.log("Este es el id decodificado by Chris", this.UsuarioID);
                console.log(this.UsuarioID.user);
            },
            err => console.log(err)
        );
    }

    //[A-Z][A-Za-z0-9]
    verificarPassword(password: any): number {
        const patron = /^[A-Za-z0-9]{6,20}$/;
        if (password.length == 0)
            return 1;
        if (password.length > 20)
            return 2;
        if (password.length < 6)
            return 3;
        if (!patron.test(password))
            return 4;
        return 0;
    }

    verificarRePassword(password: any, repassword: any): number {
        if (password != repassword) {
            return 1;
        }
        return 0;
    }

    verificarPasswords(): boolean {
        this.errrorPassword = this.verificarPassword(this.password);
        this.errorRePassrword = this.verificarRePassword(this.password, this.repassword);
        if ((this.errrorPassword + this.errorRePassrword) > 0) {
            return false;
        }
        return true;
    }

    limpiarPassword() {
        if (this.errrorPassword > 0) {
            console.log("Limpiar password");
            this.password = "";
            this.errrorPassword = 0;
        }
    }

    limpiarRePassword() {
        if (this.errorRePassrword > 0) {
            console.log("Limpiar repassword");
            this.repassword = "";
            this.errorRePassrword = 0;
        }

    }
}
