import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private api: ApiService) { }

  private states = [];

  async getStates() {
    await this.api.getFromExternal('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then ((res: any) => {
        res.array.forEach(element => {
          this.states.push(element.nome);
        });
      });
    return this.states;
  }
}
