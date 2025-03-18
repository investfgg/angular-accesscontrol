import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tbusertype } from './tbusertype.model';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbusertypeService
{
  constructor( private readonly httpClient: HttpClient )
  {
    
  }

  api = "http://localhost:8080";

  public createUserType( userType: Tbusertype ): Observable<Tbusertype>
  {
    return this.httpClient.post<Tbusertype>( `${this.api}/create/usertype`, userType );
  }

  public getUserTypes(): Observable<Tbusertype[]>
  {
    return this.httpClient.get<Tbusertype[]>( `${this.api}/read/usertype` );
  }
}