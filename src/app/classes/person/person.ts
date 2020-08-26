import { PersonAddress } from './person-addres';
import { User } from '../user/user';

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
    photo: string
    personAddress: PersonAddress;
    user: User;
}