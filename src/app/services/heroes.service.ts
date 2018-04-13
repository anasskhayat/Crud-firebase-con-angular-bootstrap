import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Heroe } from '../interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  heroesUrl = "https://hereosapp-f202b.firebaseio.com/hereos.json";
  heroeUrl = "https://hereosapp-f202b.firebaseio.com/hereos/";

  constructor( private http:Http) { }

  nuevoHeroe(hereo:Heroe){

    let body = JSON.stringify(hereo);
    let headers=new Headers({
      'Content-Type':'aplication/json'
    });

    return this.http.post(this.heroesUrl , body, { headers})
                .map(res=>{
                    console.log(res.json());
                    return res.json();
                }
              )
  }

  actualizarHeroe(heroe:Heroe , key$:string){

    let body=JSON.stringify(heroe);
    let headers=new Headers({
      'Content-Type': 'aplication/json'
    })

    let url =`${ this.heroeUrl }/${ key$ }.json`;

    return this.http.put( url , body, { headers })
                    .map(res=>{
                      console.log(res.json());
                      return res.json();
                    })
}

getHeroe( key$:string){

  let url = `${this.heroeUrl}/${key$}.json`;
  return this.http.get(url)
                  .map(res=>{
                    console.log(res.json());
                  return res.json();
                                 })

}
getHeroes(){

  return this.http.get(this.heroesUrl)
             .map(res=>{
               console.log(res.json());
               return res.json();
             })
}

  borrar(key$: string){

    let url=`${ this.heroeUrl }/${key$}.json`;  
    return this.http.delete(url)
             .map(res=>res.json())
  }

}