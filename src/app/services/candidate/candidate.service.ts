import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Candidate } from 'src/app/classes/candidate/candidate';
import { PersonAddress } from 'src/app/classes/person/person-addres';
import { Person } from 'src/app/classes/person/person';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private api: ApiService) { }


  async getPersonDetails() {
    let person = new Person();
    await this.api.get('person/get', { Authorization: localStorage.getItem('token') })
      .then((data: any) => {
        person.id = data.payload.id;
        person.name = data.payload.name;
        person.fullname = data.payload.fullname;
        person.cpf = data.payload.cpf;
        person.rg = data.payload.rg;
        person.birthdate = new Date(data.payload.birthdate);
        person.city = data.payload.city;
        person.state = data.payload.state;
        person.country = data.payload.country;
        person.photo = data.payload.photo;

        person.personAddress = new PersonAddress();
        person.personAddress.address = data.payload.person_addres.address;
        person.personAddress.number = data.payload.person_addres.number;
        person.personAddress.complement = data.payload.person_addres.complement;
        person.personAddress.cep = data.payload.person_addres.cep;

      });


    return person;
  }

  async updatePersonDetails(person: Person) {
    await this.api.postTokenHeader('person/update', person);
  }

}