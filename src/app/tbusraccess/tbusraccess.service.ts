import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tbusraccess, TbusraccessFrm, TbUsrAccessSelect } from './tbusraccess.model';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbUsrAccessService
{

  constructor( private readonly httpClient: HttpClient )
  {
    
  }

  api = "http://localhost:8080";

  public createUsrAccess( usraccess: TbusraccessFrm ): Observable<TbusraccessFrm>
  {
    return this.httpClient.post<TbusraccessFrm>( `${this.api}/create/usraccess`, usraccess );
  }

  public getUsrsAccess(): Observable<Tbusraccess[]>
  {
    return this.httpClient.get<Tbusraccess[]>( `${this.api}/read/usraccess` );
  }

  public getUsrsAccessSelect(): Observable<TbUsrAccessSelect[]>
  {
    return this.httpClient.get<TbUsrAccessSelect[]>( `${this.api}/read/usraccess` );
  }
}