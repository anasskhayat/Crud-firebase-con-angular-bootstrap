import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe  } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";
import { error } from 'protractor';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe={
    nombre:"",
    casa:"marvel",
    
    bio:""
   
  };

 nuevo:boolean=false;
 id:string;

  constructor(private _heroesService: HeroesService,
              private router:Router,
              private activatedRoute: ActivatedRoute ) { 

                this.activatedRoute.params
                    .subscribe(parametro => {
                      this.id = parametro['id']
                     
                      if(this.id !== "nuevo"){

                this._heroesService.getHeroe(this.id)
                                   .subscribe(data =>{
                                     this.heroe = data
                                   })
                      }
                    })
              }

  guardar(){
    console.log(this.heroe)

 //insertando
    if ( this.id == "nuevo"){
        this._heroesService.nuevoHeroe(this.heroe)
                      .subscribe(data =>{
                        this.router.navigate(['/heroe',data.name])
                      },
                      error=>console.error(error)
                    
                    )
//actualizando                  

   }else{

         this._heroesService.actualizarHeroe(this.heroe , this.id)
                            .subscribe(data=>{
                              console.log(data)
                            },
           error => console.error(error)
          )

                  }
  }
  ngOnInit() {
  }
  
  agregar( forma:NgForm ){
      this.router.navigate(['/heroe','nuevo']);
      forma.reset({
        casa: "marvel"
      });
}
}
