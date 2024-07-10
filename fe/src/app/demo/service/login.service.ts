import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User, UserDto } from "src/app/dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  callLoginService(dto: any): Observable<any> {
    return this.httpClient.post('http://192.168.222.49:8080/doLogin', JSON.stringify(dto));
  }

  findUser(nome: string, cognome: string){
    return this.httpClient.get<User>('http://192.168.222.49:8080/findUser/' + nome + "/" + cognome )
  }

  getAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>('http://192.168.222.49:8080/impiegati')
  }

  deleteAccount(id: number): Observable<any>{
    return this.httpClient.delete<any>('http://192.168.222.49:8080/delete/' + id)
  }

  updateInfo(userDto: User): Observable<any>{
    return this.httpClient.put<any>('http://192.168.222.49:8080/updateUtente', userDto)
  }

}