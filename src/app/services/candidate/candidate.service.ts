import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Candidate } from 'src/app/classes/candidate/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private api: ApiService) { }


  async getCandidateDetails() {
    let candidate = new Candidate();
    await this.api.get('candidate/get', { Authorization: localStorage.getItem('token') })
      .then(data => {
        candidate.id = data['id'];
        candidate.name = data['name'];
        candidate.cpf = data['cpf'];
        candidate.rg = data['rg'];
        candidate.full_name = data['full_name'];
        candidate.birth_date = new Date(data['birth_date']);
        candidate.city = data['city'];
        candidate.state = data['state'];
        candidate.country = data['country'];
        candidate.address = data['address'];
        candidate.address_number = data['address_number'];
        candidate.cep = data['cep'];
        candidate.complement = data['complement'];
        candidate.email = data['email'];
      });

    return candidate
  }

  async updateCandidateDetails(candidate: Candidate) {
    await this.api.postTokenHeader('candidate/update', candidate);
  }

}