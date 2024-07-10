export class UserDto {
    idUser: number;
    username: string;
    mail: string;
}

export interface User{
    idUser: number
    nome: string
    cognome: string
    mail: string
    password: string
}

export interface News{
    idNews: number,
    title: string,
    description: string,
    image: string,
    date: Date
}

export class NewsDto{
    title?: string
    description?: string
    image?: string
}

export interface UserReg{
    nome: string
    cognome: string
    mail: string
    password: string
}
