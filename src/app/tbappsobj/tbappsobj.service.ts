import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TbAppObj } from './tbappsobj.module'

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbAppsObjService
{

  constructor( private readonly httpClient: HttpClient )
  {
    
  }

  api = "http://localhost:8080";

  public createAppObj( appobj: TbAppObj ): Observable<TbAppObj>
  {
    return this.httpClient.post<TbAppObj>( `${this.api}/create/appobj`, appobj );
  }

  public getAppObjsList(): Observable<TbAppObj[]>
  {
    return this.httpClient.get<TbAppObj[]>( `${this.api}/read/appobj` );
  }
}