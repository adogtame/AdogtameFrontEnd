import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

//recibir parametros en las rutas del componente
import { ActivatedRoute, Params } from '@angular/router';

//cesar jueves

import { AdminService } from '../../services/admin.service';

//Animations (Dropdown)
import {
  trigger,
  state,
  style,
  animate,
  transition,  
  
  query,
  sequence,
  stagger,
  // ...
} from '@angular/animations';
//

@Component({
  selector: 'app-usuarios-animal',

 
  templateUrl: './usuarios-animal.component.html',

  styleUrls: ['./usuarios-animal.component.css'],

  animations: [

     trigger('clickContent', [
       state('noShow', 
         style({ 
          
           display: 'none',
           height: '0px',
           opacity: 0.6

         })
       ),
       state('show', 
         style({ 
          display: 'block', 
          
          'min-height':'80px',


          // height: '260px',

          'margin-top': '32px',
          opacity: 1
          })
       ),
       transition('show => noShow', [
         animate('0s')
       ]),
       transition('noShow => show', [
         animate('0s')
       ])
     ]),


  ]
})
export class UsuariosAnimalComponent implements OnInit, OnDestroy {


  Animal: any = [];

  AnimalID: any = [];

  //Nose de q es esto de moment, mepa q es inutil, no hace nada, hay q comprobar
  moment: any = [];
  //
  
  interesados: any = [];

  interes: boolean = false;

  isOpenInteresados = false;

  cargoPagina: boolean = false;

  //cesar Jueves
  comentario = { idUsuario: "", idAnimal: "", comentario: "", fecha: "" };


  comentarios: any = [];

  usuarioLikes: any = [];


  //
  likes: any = [];
  status = { idComentario: "", likes: "", dislikes: "" };

  procesoIniciado: boolean = false;


  //




  // admin
  rol: any = "";
  //



  //Fin de lo de cesar

  constructor(

    private usuariosService: UsuariosService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    //cesar
    private adminService: AdminService
    //
  ) { }

  ngOnInit() {

    this.rutaActiva.params.subscribe(routeParams => {


      this.AnimalID = this.rutaActiva.snapshot.params



      this.funcionesEnInit();



      console.log("Animal", this.AnimalID);

      //cesar Jueves     


      this.usuariosService.coment$.subscribe(log => {

        this.cargarComentarios();
      });






      this.usuariosService.rol$.subscribe(log => {

        this.rol = this.usuariosService.rol;

        console.log("El rol del usuario es", this.usuariosService.rol);

      });
      //


    });

  }




  ngOnDestroy(): void {



    this.AnimalID = [];

    this.Animal = [];

    
    this.comentarios = [];

    this.usuarioLikes = [];

    this.likes = [];

    this.interesados = [];

    
  }


  //

  token: any = "";
  UsuarioID: any = { user: "No logueado" };
  Usuario: any = [];
  TokenJSON = { token: "" };

  sacarUsuario() {
    this.token = this.usuariosService.getToken();
    console.log(this.token);

    this.TokenJSON = { token: this.token };

    this.usuariosService.decodificarToken(this.TokenJSON).subscribe(
      res => {
        this.UsuarioID = res;
        console.log("Este es el id decodificado", this.UsuarioID);

        this.usuariosService.buscarUsuario(this.UsuarioID.user).subscribe(
          res => {
            this.Usuario = res
            console.log("Este es el id dasdasdsa", this.Usuario);
            this.usuariosService.user.id = this.Usuario.id;

            //Hay q mejorar esto, lo q hago es cargar el componente (Animal) 
            //despues de hacer este emit, porq aca es donde cargo al usuario

            this.usuariosService.cargarUserAnimal$.emit()
            //


            this.rol = this.Usuario.tipo_perfil;
            this.usuariosService.rol = this.Usuario.tipo_perfil;
            console.log("El rol del usuario es", this.usuariosService.rol);
            //Tengo q hacer el emit de los likes aca porq si estoy en animal primero cargan los comentarios y para cuando cargo el usuario cagaste
            this.usuariosService.coment$.emit()
            console.log(this.Usuario);
          },
          err => console.log(err)
        );
        console.log(this.UsuarioID.user);
      },
      err => console.log(err)
    );
  }



  funcionesEnInit() {

    this.sacarUsuario();

    this.usuariosService.cargarUserAnimal$.subscribe(log => {

      this.animalCargarDatos();

    });

    this.usuariosService.cargarAnimal1$.subscribe(log => {

      if(this.Animal.idDador==this.usuariosService.user.id){

        //si sos el dador
        this.cargarInteresados();

        console.log("interesados",this.interesados);
      }
      else
      {

        this.cargarInteres();

      }


      

    });


    this.usuariosService.cargarAnimal2$.subscribe(log => {


      this.cargarComentarios();



    });


    this.usuariosService.cargarAnimal3$.subscribe(log => {


      this.cargarLikes();


    });



    this.usuariosService.cargarAnimal4$.subscribe(log => {


      this.listarUsuariosLikes();

    });



    this.usuariosService.cargarAnimal5$.subscribe(log => {

      setTimeout(()=>{ this.cargoPagina=true }, 2000)


      console.log("interesados",this.interesados);
    });




  }



  irADador() {

    this.router.navigate(['usuarios/perfil/', this.Animal.idDador]);

  } 

  irAInteresado(id: number){
    
    console.log("El id ",id)
    const url = this.router.serializeUrl(this.router.createUrlTree(['usuarios/perfil/',id]));
    window.open(url, '_blank');
    //this.router.navigate(['usuarios/perfil/',id])
  }

  comenzarChat(id: number){
    
    console.log("El id ",id)
  }

  animalCargarDatos() {

    this.usuariosService.buscarAnimal(this.AnimalID.id).subscribe(
      res => {
        this.Animal = res
        console.log(this.Animal);

        this.usuariosService.cargarAnimal1$.emit()
      },
      err => console.log(err)
    );



  }


  //si sos el dador
  cargarInteresados() {


    console.log("El id del usuario es este de aca (dador)", this.usuariosService.user.id);


    this.usuariosService.cargarInteresados(this.AnimalID.id).subscribe(
      res => {

        console.log("Resultado del cargar interesados", res);

        this.interesados=res;

        console.log("Interesados del animal", this.interesados);

        this.usuariosService.cargarAnimal2$.emit()
      },
      err => console.log(err)
    );



  }


  //si sos un interesado
  cargarInteres() {


    console.log("El id del usuario es este de aca (interes)", this.usuariosService.user.id);


    this.usuariosService.cargarInteres(this.AnimalID.id, { idUsuario: this.usuariosService.user.id }).subscribe(
      res => {

        console.log("Resultado del cargar interes", res);



        if (res == 0 || res == null || res == undefined) {

          this.interes = false;
        }
        else {

          this.interes = true;
        }


        this.usuariosService.cargarAnimal2$.emit()
      },
      err => console.log(err)
    );



  }

  mostrarInteres() {

    if (this.interes == true) {

      this.usuariosService.quitarInteres(this.AnimalID.id, { idInteresado: this.usuariosService.user.id }).subscribe(
        res => {

          this.interes = false;
          console.log("Resultado", res);

        },
        err => console.log(err)
      );

      console.log("interes quitado");

    }
    else {

      this.usuariosService.mostrarInteres(this.AnimalID.id, { idInteresado: this.usuariosService.user.id }).subscribe(
        res => {

          this.interes = true;
          console.log("Resultado", res);

        },
        err => console.log(err)
      );

      console.log("interes enviado");

    }







  }





  //Cesar jueves

  agregarComentario() {


    let date: Date = new Date();
    console.log(date);

    let dia = date.getUTCDate();
    let mes = date.getUTCMonth();
    mes = mes + 1;
    let ano = date.getUTCFullYear();


    console.log("Year = " + ano);
    console.log("Month = " + mes);
    console.log("Day = " + dia);


    this.comentario.fecha = (`${ano}/${mes}/${dia}`);

    this.comentario.idUsuario = this.usuariosService.user.id;

    this.comentario.idAnimal = this.AnimalID.id;

    console.log(this.comentario);

    this.usuariosService.agregarComentario(this.comentario).subscribe(

      res => {

        let result: any = res;
        console.log(result.message);
        this.comentario = { idUsuario: "", idAnimal: "", comentario: "", fecha: "" };
        this.usuariosService.coment$.emit()

      },
      err => {

        console.log(err.error.message);


      }

    )



  }

  cargarComentarios() {



    this.usuariosService.listarComentarios(this.AnimalID.id).subscribe(
      res => {



        this.usuariosService.rol$.emit()

        this.usuariosService.cargarAnimal3$.emit()
        this.comentarios = res;
        console.log(res);





        console.log("Este es el id del usuario", this.usuariosService.user.id)



        this.usuarioLikes = [];

        this.usuariosService.cargarAnimal4$.emit()


      },
      err => console.log(err)


    )

  }

  listarUsuariosLikes() {

    this.usuariosService.listarUsuariosLikes(this.usuariosService.user.id).subscribe(
      res => {

        

        this.usuarioLikes = res;

        let like;

        let dislike;

        if (this.usuarioLikes.length > 0) {


          for (var i = 0, len = this.usuarioLikes.length; i < len; i++) {



            if (this.usuarioLikes[i].like_dislike == "like") {

              like = true;
              dislike = false;

            }
            else {


              like = false;
              dislike = true;



            }

            this.likes.push({

              "idComentario": this.usuarioLikes[i].idComentario,
              "like": like,
              "dislike": dislike,

            });





          }

          console.log("Los likes", this.likes)



          console.log("Comentarios todos", this.comentarios);

          for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {




            for (var y = 0, len2 = this.likes.length; y < len2; y++) {

              if (this.likes[y].idComentario == this.comentarios[i].id) {


                console.log("id like", this.likes[y].idComentario, "id comentario", this.comentarios[i].id);



                this.comentarios[i] = {

                  id: this.comentarios[i].id,
                  idUsuario: this.comentarios[i].idUsuario,
                  idAnimal: this.comentarios[i].idAnimal,
                  comentario: this.comentarios[i].comentario,
                  fecha: this.comentarios[i].fecha,
                  likes: this.comentarios[i].likes,
                  dislikes: this.comentarios[i].dislikes,
                  like: this.likes[y].like,
                  dislike: this.likes[y].dislike
                }

                console.log("Comentarios true", this.comentarios[i]);


              }
              else {



                console.log("Comentariossssss false", this.comentarios[i]);


              }

            }


            console.log("Esto se tendria q repetir 2 veces", i, this.comentarios[i]);


          }






        }
        else {


          for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {
            this.comentarios[i] = {
              id: this.comentarios[i].id,
              idUsuario: this.comentarios[i].idUsuario,
              idAnimal: this.comentarios[i].idAnimal,
              comentario: this.comentarios[i].comentario,
              fecha: this.comentarios[i].fecha,
              likes: this.comentarios[i].likes,
              dislikes: this.comentarios[i].dislikes,
              like: false,
              dislike: false
            }

          }


          console.log("likes user vacio")

        }




        this.usuariosService.cargarAnimal5$.emit()

      },
      err => console.log(err)


    )





  }



  cargarLikes() {
    this.usuariosService.listarComentarios(this.AnimalID.id).subscribe(
      res => {


        let comentarios: any = res;


        for (var i = 0, len = comentarios.length; i < len; i++) {

          this.comentarios[i].likes = comentarios[i].likes;

          this.comentarios[i].dislikes = comentarios[i].dislikes;


        }


        console.log("Q onda q me cambia el orden", this.comentarios)


      },
      err => console.log(err)
    )
  }




  like(idComentario: any, like: any, dislike: any) {



    //por aca empieza el proceso
    if (this.procesoIniciado == false) {












      console.log("this.comentarios", this.comentarios);

      if (like == true) {


        if (this.procesoIniciado == false) {

          this.procesoIniciado = true;


          console.log("El proceso comenzo 1 ", this.procesoIniciado);




          let usuario = { idUsuario: "", idComentario: "", like_dislike: "" }
          usuario.idUsuario = this.usuariosService.user.id;
          usuario.idComentario = idComentario;
          usuario.like_dislike = "quitarLike";

          console.log("Entro aca al like==true");

          this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
            res => {
              console.log(res);

              for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {

                if (this.comentarios[i].id == idComentario) {
                  this.comentarios[i].like = false;
                  this.comentarios[i].dislike = false;
                }

              }


              this.cargarLikes();


              //por aca termina el proceso

              this.procesoIniciado = false;


            },
            err => console.log(err)
          )



        }
        else {


          console.log("El proceso de like o dislike esta inciado, espere a q termine este proceso");

        }

      }
      else {


        if (dislike == true) {



          if (this.procesoIniciado == false) {

            this.procesoIniciado = true;


            console.log("El proceso comenzo 2 ", this.procesoIniciado);

            let usuario = { idUsuario: "", idComentario: "", like_dislike: "" }
            usuario.idUsuario = this.usuariosService.user.id;
            usuario.idComentario = idComentario;
            usuario.like_dislike = "quitarDislike";


            console.log("Entro aca al dislike==true");

            this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
              res => {
                console.log(res);

              },
              err => console.log(err)
            )



            usuario.like_dislike = "like";

            this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
              res => {
                console.log(res);

                for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {

                  if (this.comentarios[i].id == idComentario) {
                    this.comentarios[i].like = true;
                    this.comentarios[i].dislike = false;
                  }

                }
                this.cargarLikes();

                //por aca termina el proceso

                this.procesoIniciado = false;

              },
              err => console.log(err)
            )


          }
          else {


            console.log("El proceso de like o dislike esta inciado, espere a q termine este proceso");

          }

        }
        else {




          if (this.procesoIniciado == false) {

            this.procesoIniciado = true;


            console.log("El proceso comenzo 3 ", this.procesoIniciado);


            let usuario = { idUsuario: "", idComentario: "", like_dislike: "" }
            usuario.idUsuario = this.usuariosService.user.id;
            usuario.idComentario = idComentario;
            usuario.like_dislike = "like";


            console.log("Entro aca al false");

            this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
              res => {
                console.log(res);


                for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {

                  if (this.comentarios[i].id == idComentario) {
                    this.comentarios[i].like = true;
                    this.comentarios[i].dislike = false;
                  }

                }

                this.cargarLikes();



                //por aca termina el proceso

                this.procesoIniciado = false;

              },
              err => console.log(err)
            )



          }
          else {


            console.log("El proceso de like o dislike esta inciado, espere a q termine este proceso");

          }




        }







      }







      console.log("El proceso termino", this.procesoIniciado);


    }
    else {



      console.log("El proceso de like o dislike esta inciado, espere a q termine este proceso");

    }



  }

  dislike(idComentario: any, dislike: any, like: any) {



    //por aca empieza el proceso
    if (this.procesoIniciado == false) {






      if (dislike == true) {



        if (this.procesoIniciado == false) {

          this.procesoIniciado = true;


          let usuario = { idUsuario: "", idComentario: "", like_dislike: "" }
          usuario.idUsuario = this.usuariosService.user.id;
          usuario.idComentario = idComentario;
          usuario.like_dislike = "quitarDislike";



          this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
            res => {
              console.log(res);

              for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {

                if (this.comentarios[i].id == idComentario) {
                  this.comentarios[i].dislike = false;
                  this.comentarios[i].like = false;
                }

              }

              this.cargarLikes();





              //por aca termina el proceso

              this.procesoIniciado = false;

            },
            err => console.log(err)
          )



        }
        else {



          console.log("El proceso de like o dislike esta inciado, espere a q termine este proceso");

        }




      }






      else {


        if (like == true) {



          if (this.procesoIniciado == false) {

            this.procesoIniciado = true;


            let usuario = { idUsuario: "", idComentario: "", like_dislike: "" }
            usuario.idUsuario = this.usuariosService.user.id;
            usuario.idComentario = idComentario;
            usuario.like_dislike = "quitarLike";

            this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
              res => {
                console.log(res);


              },
              err => console.log(err)
            )

            usuario.like_dislike = "dislike";

            this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
              res => {
                console.log(res);

                for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {

                  if (this.comentarios[i].id == idComentario) {
                    this.comentarios[i].dislike = true;
                    this.comentarios[i].like = false;
                  }

                }


                this.cargarLikes();




                //por aca termina el proceso

                this.procesoIniciado = false;

              },
              err => console.log(err)
            )



          }
          else {



            console.log("El proceso de like o dislike esta inciado, espere a q termine este proceso");

          }




        }
        else {






          if (this.procesoIniciado == false) {

            this.procesoIniciado = true;

            let usuario = { idUsuario: "", idComentario: "", like_dislike: "" }
            usuario.idUsuario = this.usuariosService.user.id;
            usuario.idComentario = idComentario;
            usuario.like_dislike = "dislike";

            this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
              res => {
                console.log(res);

                for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {

                  if (this.comentarios[i].id == idComentario) {
                    this.comentarios[i].dislike = true;
                    this.comentarios[i].like = false;
                  }

                }


                this.cargarLikes();




                //por aca termina el proceso

                this.procesoIniciado = false;

              },
              err => console.log(err)
            )


          }
          else {



            console.log("El proceso de like o dislike esta inciado, espere a q termine este proceso");

          }

        }

      }






      console.log("El proceso termino", this.procesoIniciado);



    }
    else {


      console.log("El proceso de like o dislike esta inciado, espere a q termine este proceso");

    }



  }








  //




  eliminarComentario(comentario: any) {

    console.log(comentario);

    this.usuariosService.eliminarComentario(comentario).subscribe(
      res => {

        console.log(res);

        this.usuariosService.coment$.emit()

      },
      err => {

        console.log(err.error.message);

      }
    )


  }












}
