import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
    selector: 'app-password-recovery',
    templateUrl: './password-recovery.component.html',
    styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

    userEmail = "";
    errorEmail = 0;
    mensaje: string = "Vacio";
    enviado: boolean = false;
    constructor(private usuariosService: UsuariosService) { }

    ngOnInit(): void {
    }

    recoverPassword() {
        
        console.log('recovering...');
        console.log('Cliente this.email => ', this.userEmail);

        this.usuariosService.recoverPassword(this.userEmail).subscribe(
            //TO DO: Modificar para que no redireccione, ni almacene el token
            res => {
                let result: any = res;
                console.log('Cliente result.message => ', result.message);
                this.enviado = true;
                this.mensaje = '¡Todo listo! Por favor, revisa tu casilla de correo y sigue las instrucciones para restablecer tu contraseña'
            },
            err => {
                console.log('Cliente error.message => ', err.error.message);
                this.mensaje = err.error.message;
            }
        );
    }

    verificarEmail(email: any): number {
        const patron = /^[a-z0-9]{1,20}@[a-z0-9]{1,10}\.[a-z]{2,3}$/;
        if (email.length == 0)
            return 1;
        if (email.length > 33)
            return 2;
        if (!patron.test(email))
            return 3;
        return 0;
    }

    limpiarEmail() {
        if (this.errorEmail > 0) {
            console.log("Limpiar email");
            this.errorEmail = 0;
        }
    }
}
