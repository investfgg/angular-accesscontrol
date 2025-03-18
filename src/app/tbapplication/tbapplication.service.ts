import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TbApplication, TbApplicationSelect } from './tbapplication.model';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbApplicationService
{

  constructor( private readonly httpClient: HttpClient )
  {
    
  }

  api = "http://localhost:8080";

  public createApplication( application: TbApplication ): Observable<TbApplication>
  {
    return this.httpClient.post<TbApplication>( `${this.api}/create/application`, application );
  }

  public getApplications(): Observable<TbApplication[]>
  {
    return this.httpClient.get<TbApplication[]>( `${this.api}/read/application` );
  }

  public getApplicationsSelect(): Observable<TbApplicationSelect[]>
  {
    return this.httpClient.get<TbApplicationSelect[]>( `${this.api}/read/application` );
  }
}