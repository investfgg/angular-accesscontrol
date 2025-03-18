import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tbobject, TbObjectSelect } from './tbobject.model';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbObjectService
{

  constructor( private readonly httpClient: HttpClient )
  {
    
  }

  api = "http://localhost:8080";

  public createObject( object: Tbobject ): Observable<Tbobject>
  {
    return this.httpClient.post<Tbobject>( `${this.api}/create/object`, object );
  }

  public getObjects(): Observable<Tbobject[]>
  {
    return this.httpClient.get<Tbobject[]>( `${this.api}/read/object` );
  }

  public getObjectsSelect(): Observable<TbObjectSelect[]>
  {
    return this.httpClient.get<TbObjectSelect[]>( `${this.api}/read/object` );
  }
}