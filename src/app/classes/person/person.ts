import { PersonAddress } from './person-addres';
import { User } from '../user/user';
import { ProfessionalHistory } from '../candidate/professional-history';

export class Person {
    id: number;
    name: string;
    fullname: string;
    cpf: number;
    rg: number;
    birthdate: Date;
    city: string;
    state: string;
    country: string;
    photo: string;
    personAddress: PersonAddress;
    user: User;
    professionalHistory: ProfessionalHistory[];
}
