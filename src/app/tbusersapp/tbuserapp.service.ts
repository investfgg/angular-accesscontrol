import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tbuserapp, TbuserappFrm } from './tbuserapp.model'

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbUserAppService
{

  constructor( private readonly httpClient: HttpClient )
  {
    
  }

  api = "http://localhost:8080";

  public createUserApp( userapp: TbuserappFrm ): Observable<TbuserappFrm>
  {
    return this.httpClient.post<TbuserappFrm>( `${this.api}/create/userapp`, userapp );
  }

  public getUserAppsList(): Observable<Tbuserapp[]>
  {
    return this.httpClient.get<Tbuserapp[]>( `${this.api}/read/userapp` );
  }
}