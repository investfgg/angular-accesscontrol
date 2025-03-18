import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tbustypeperm } from './tbustypeperm.module'

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbUstypesPermService
{

  constructor( private readonly httpClient: HttpClient )
  {
    
  }

  api = "http://localhost:8080";

  public createUstypePerm( ustypeperm: Tbustypeperm ): Observable<Tbustypeperm>
  {
    return this.httpClient.post<Tbustypeperm>( `${this.api}/create/ustypeperm`, ustypeperm );
  }

  public getUstypePermsList(): Observable<Tbustypeperm[]>
  {
    return this.httpClient.get<Tbustypeperm[]>( `${this.api}/read/ustypeperm` );
  }
}