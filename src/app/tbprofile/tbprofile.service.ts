import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tbprofile } from './tbprofile.module';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbProfileService
{

  constructor( private readonly httpClient: HttpClient )
  {

  }

  api = "http://localhost:8080";

  public createProfile( profile: Tbprofile ): Observable<Tbprofile>
  {
    return this.httpClient.post<Tbprofile>( `${this.api}/create/profile`, profile );
  }

  public getProfiles(): Observable<Tbprofile[]>
  {
    return this.httpClient.get<Tbprofile[]>( `${this.api}/read/profile` );
  }
}