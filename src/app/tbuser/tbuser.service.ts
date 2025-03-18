import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tbuser, TbuserSelect } from './tbuser.model';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbUserService
{

  constructor( private readonly httpClient: HttpClient )
  {
    
  }

  api = "http://localhost:8080";

  public createUser( user: Tbuser ): Observable<Tbuser>
  {
    return this.httpClient.post<Tbuser>( `${this.api}/create/user`, user );
  }

  public getUsers(): Observable<Tbuser[]>
  {
    return this.httpClient.get<Tbuser[]>( `${this.api}/read/user` );
  }

  public getUsersSelect(): Observable<TbuserSelect[]>
  {
    return this.httpClient.get<TbuserSelect[]>( `${this.api}/read/user` );
  }
}