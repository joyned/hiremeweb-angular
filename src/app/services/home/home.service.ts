import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private api: ApiService) { }

  private states = [];

  async getStates(){
    await this.api.getResult('https://servicodados.ibge.gov.br/api/v1/localidades/estados', {})
      .then((res: any) => {
        for(var i = 0; i < res.length; i++){
          this.states.push(res[i]["nome"]);
        }
      });
    return this.states;
  }
}
