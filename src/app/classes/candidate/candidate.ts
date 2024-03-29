import { User } from '../user/user';

export class Candidate {
    userId: number;
    id: number;
    name: string;
    cpf: number;
    rg: number;
    fullname: string;
    birthdate: Date;
    city: string;
    state: string;
    country: string;
    address: string;
    addressNumber: number;
    zipCode: number;
    complement: string;
    email: string;
    user: User;
}