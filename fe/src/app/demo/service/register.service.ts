import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDto } from "src/app/dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {
  }

  callRegisterService(dto: any): Observable<any> {
    console.log(dto);
    return this.httpClient.post('http://192.168.222.49:8080/doRegister', JSON.stringify(dto));
  }
}