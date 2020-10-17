import { Injectable } from '@angular/core';
import { Person } from 'src/app/classes/person/person';
import { PersonAddress } from 'src/app/classes/person/person-addres';
import { ApiService } from '../api/api.service';
import { User } from 'src/app/classes/user/user';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private api: ApiService) { }

  async updatePersonDetails(person: Person) {
    await this.api.postTokenHeader('person/update', person);
  }

}
