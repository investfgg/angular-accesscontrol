import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tbpermission } from './tbpermission.model';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class TbPermissionService
{

  constructor( private readonly httpClient: HttpClient )
  {
    
  }

  api = "http://localhost:8080";

  public createPermission( permission: Tbpermission ): Observable<Tbpermission>
  {
    return this.httpClient.post<Tbpermission>( `${this.api}/create/permission`, permission );
  }

  public getPermissions(): Observable<Tbpermission[]>
  {
    return this.httpClient.get<Tbpermission[]>( `${this.api}/read/permission` );
  }
}