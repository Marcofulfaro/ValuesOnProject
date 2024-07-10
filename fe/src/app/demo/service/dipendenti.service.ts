import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cU } from '@fullcalendar/core/internal-common';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/dto/user.dto';

@Injectable()
export class DipendentiService {

    
  constructor(private http: HttpClient) {}

  getDipendenti(): Observable<User[]> {
      return this.http.get<User[]>('http://192.168.222.49:8080/impiegati');
  }
}

    