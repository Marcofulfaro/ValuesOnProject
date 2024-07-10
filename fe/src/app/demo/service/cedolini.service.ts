import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cU } from '@fullcalendar/core/internal-common';
import { Observable, map } from 'rxjs';
import { Cedolino, DocDto } from 'src/app/dto/cedolino.dto';
import { User } from 'src/app/dto/user.dto';

@Injectable()
export class CedoliniService {

    
  constructor(private http: HttpClient) {}

  getCedolini(): Observable<Cedolino[]> {
      const currentUser: User = JSON.parse(localStorage.getItem('loggedUser') as string);
      return this.http.get<Cedolino[]>('http://192.168.222.49:8080/cedolini/elenco/' + currentUser.idUser);
  }

  getCedoliniForSpecificUser(userId: Number): Observable<Cedolino[]> {
    return this.http.get<Cedolino[]>('http://192.168.222.49:8080/cedolini/elenco/' + userId);
}

  insertDocumentService(formData: FormData): Observable<Object> {
    return this.http.post<Object>('http://192.168.222.49:8080/cedolini/upload', formData);
  }

  callInsertDocumentService(doc: DocDto):Observable<Object>{

      return this.http.post<Object>('http://192.168.222.49:8080/cedolini/upload', doc)
  }

  updateRecord(doc: Cedolino):Observable<any>{
    return this.http.put<any>('http://192.168.222.49:8080/cedolini/update', doc)
  }

  deleteRecord(id: Number):Observable<any>{
    return this.http.delete<any>('http://192.168.222.49:8080/cedolini/delete/'+ id)
  }
}
