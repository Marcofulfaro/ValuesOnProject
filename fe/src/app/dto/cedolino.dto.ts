import { User } from "./user.dto";

export interface Cedolino{
    id: number;
    date: Date;
    userId: User;
    pdfBase64: string;
}

export class DocDto{
    date: Date;
    userId: number;
    pdfBase64: String;
}