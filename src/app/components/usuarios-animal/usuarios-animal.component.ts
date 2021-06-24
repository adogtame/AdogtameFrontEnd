import { Component, OnInit, OnDestroy} from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

//recibir parametros en las rutas del componente
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-usuarios-animal',
  templateUrl: './usuarios-animal.component.html',
  styleUrls: ['./usuarios-animal.component.css']
})
export class UsuariosAnimalComponent implements OnInit, OnDestroy {


  Animal: any = [];
  
  AnimalID: any = [];

  moment: any = [];




  //cesar Jueves
  comentario = { idUsuario: "", idAnimal: "", comentario: "", fecha: ""};


  comentarios: any = [];

  usuarioLikes: any = [];


  //
  likes: any = [];
  status = { idComentario: "", likes: "", dislikes: ""};

  toggleLike = false;  
  toggleDislike = false;
  

  //

  constructor(private usuariosService: UsuariosService, private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    
    
    this.rutaActiva.params.subscribe(routeParams => {

      
      this.AnimalID = this.rutaActiva.snapshot.params

      this.animalCargarDatos();
  


      console.log("Animal", this.AnimalID);
      
      //cesar Jueves     
      
      
      this.cargarComentarios();

      this.usuariosService.coment$.subscribe(log => {

        this.cargarComentarios();
      });



        this.cargarLikes();





      //


    });










  }


 
  
  ngOnDestroy(): void {

    this.AnimalID = [];

    this.Animal = [];

  }

  irADador(){

    this.router.navigate(['usuarios/perfil/',this.Animal.idDador]);

  }

  animalCargarDatos(){

    this.usuariosService.buscarAnimal(this.AnimalID.id).subscribe(
      res => {
        this.Animal = res
        console.log(this.Animal); 
    
      },
      err => console.log(err) 
    );

  }



  //Cesar jueves

  agregarComentario(){
    

    let date: Date = new Date();  
    console.log(date);  

    let dia = date.getUTCDate();
    let mes = date.getUTCMonth();
    mes=mes + 1;
    let ano = date.getUTCFullYear();


    console.log("Year = " + ano);  
    console.log("Month = " + mes);  
    console.log("Day = " + dia);  


    this.comentario.fecha= (`${ano}/${mes}/${dia}`);

    this.comentario.idUsuario= this.usuariosService.user.id ;

    this.comentario.idAnimal = this.AnimalID.id;

    console.log(this.comentario);

    this.usuariosService.agregarComentario(this.comentario).subscribe(

      res => {

        let result:any=res;
        console.log(result.message);
        this.comentario={ idUsuario: "", idAnimal: "", comentario: "", fecha: ""};
        this.usuariosService.coment$.emit()

      },
      err => {
        
        console.log(err.error.message);


      }

    )



	}

  cargarComentarios(){



    this.usuariosService.listarComentarios(this.AnimalID.id).subscribe(
      res => {
        this.comentarios = res;
        console.log(res);





        console.log("Este es el id del usuario", this.usuariosService.user.id)



        this.usuarioLikes=[];
        this.listarUsuariosLikes();

      },
      err => console.log(err)


    )

  }
  
  listarUsuariosLikes(){

    this.usuariosService.listarUsuariosLikes(this.usuariosService.user.id).subscribe(
      res => {

        this.usuarioLikes = res;

        let like;
  
        let dislike;         
        
        if(this.usuarioLikes.length>0){


          for (var i = 0, len = this.usuarioLikes.length; i < len; i++) {
          
            
  
            if(this.usuarioLikes[i].like_dislike == "like"){
  
              like=true;
              dislike=false;
              
            }
            else
            {
  
  
                like=false;
                dislike=true;
    
                 
  
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
  
              if(this.likes[y].idComentario==this.comentarios[i].id){
  
  
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
              else
              {  
                   
  
  
                console.log("Comentariossssss false",this.comentarios[i]);
                    
  
              }
              
            }
  
  
            console.log("Esto se tendria q repetir 2 veces", i, this.comentarios[i]);
  
  
          }







        }
        else
        {


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
                         


       


      },
      err => console.log(err)

      
    )





  }



  cargarLikes(){
    this.usuariosService.listarComentarios(this.AnimalID.id).subscribe(
      res => {


        let comentarios: any = res;


        for (var i = 0, len = comentarios.length; i < len; i++) {
			
          this.comentarios[i].likes = comentarios[i].likes;
    
          this.comentarios[i].dislikes = comentarios[i].dislikes; 
          
          
        }

      },
      err => console.log(err)
    )
  }




  like(idComentario: any, like:any, dislike:any){

    console.log("this.comentarios", this.comentarios);

    if(like == true){



      let usuario={ idUsuario:"", idComentario:"", like_dislike:""}
      usuario.idUsuario=this.usuariosService.user.id ;
      usuario.idComentario=idComentario;
      usuario.like_dislike="quitarLike";

      console.log("Entro aca al like==true");

      this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
        res => {
          console.log(res);

          for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {
  
            if(this.comentarios[i].id==idComentario){
              this.comentarios[i].like = false;
              this.comentarios[i].dislike = false;
            }
 
          }
    
        
          this.cargarLikes();
        },
        err => console.log(err)
      )


    }
    else{


      if(dislike == true){


        let usuario={ idUsuario:"", idComentario:"", like_dislike:""}
        usuario.idUsuario=this.usuariosService.user.id ;
        usuario.idComentario=idComentario;
        usuario.like_dislike="quitarDislike";
  
  
        console.log("Entro aca al dislike==true");
  
        this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
          res => {
            console.log(res);  
      
          },
          err => console.log(err)
        )



        usuario.like_dislike="like";

        this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
          res => {
          console.log(res);

          for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {
  
            if(this.comentarios[i].id==idComentario){
              this.comentarios[i].like = true;
              this.comentarios[i].dislike = false;
            }
 
          }
          this.cargarLikes();
          },
          err => console.log(err)
        )
      
      }
      else
      {
        
      let usuario={ idUsuario:"", idComentario:"", like_dislike:""}
      usuario.idUsuario=this.usuariosService.user.id ;
      usuario.idComentario=idComentario;
      usuario.like_dislike="like";

  
      console.log("Entro aca al false");

      this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
        res => {
          console.log(res);

         
          for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {
  
            if(this.comentarios[i].id==idComentario){
              this.comentarios[i].like = true;
              this.comentarios[i].dislike = false;
            }
 
          }

          this.cargarLikes();
          


        },
        err => console.log(err)
      )
      

      }




    }

  }

  dislike(idComentario: any, dislike:any, like:any){



    if(dislike == true){


      let usuario={ idUsuario:"", idComentario:"", like_dislike:""}
      usuario.idUsuario=this.usuariosService.user.id ;
      usuario.idComentario=idComentario;
      usuario.like_dislike="quitarDislike";



      this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
        res => {
          console.log(res);

          for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {
  
           if(this.comentarios[i].id==idComentario){
             this.comentarios[i].dislike = false;
             this.comentarios[i].like = false;
            }

          }
    
          this.cargarLikes();
        },
        err => console.log(err)
      )

    }






    else{


      if(like == true){




        let usuario={ idUsuario:"", idComentario:"", like_dislike:""}
        usuario.idUsuario=this.usuariosService.user.id ;
        usuario.idComentario=idComentario;
        usuario.like_dislike="quitarLike";
  
        this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
          res => {
            console.log(res);
  
      
          },
          err => console.log(err)
        )
  
        usuario.like_dislike="dislike";
  
        this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
          res => {
            console.log(res);
  
            for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {
  
              if(this.comentarios[i].id==idComentario)
              {
                this.comentarios[i].dislike = true;
                this.comentarios[i].like = false;
              }
   
            }

      
            this.cargarLikes();
          },
          err => console.log(err)
        )



      }
      else
      {

        
      let usuario={ idUsuario:"", idComentario:"", like_dislike:""}
      usuario.idUsuario=this.usuariosService.user.id ;
      usuario.idComentario=idComentario;
      usuario.like_dislike="dislike";

      this.usuariosService.actualizarComentarioLikeDislike(idComentario, usuario).subscribe(
        res => {
          console.log(res);

          for (var i = 0, len1 = this.comentarios.length; i < len1; i++) {
  
            if(this.comentarios[i].id==idComentario)
            {
              this.comentarios[i].dislike = true;
              this.comentarios[i].like = false;
            }
 
          }
    
    
          this.cargarLikes();
        },
        err => console.log(err)
      )



      }

    }


  }








//











}
