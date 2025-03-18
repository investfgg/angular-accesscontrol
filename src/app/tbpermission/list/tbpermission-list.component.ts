import { Component, OnInit } from '@angular/core';
import { TbPermissionService } from '../tbpermission.service';
import { Tbpermission } from '../tbpermission.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component(
  {
    selector: 'app-tbpermission-list',
    templateUrl: './tbpermission-list.component.html',
    styleUrl: './tbpermission-list.component.css'
  }
)

export class TbPermissionListComponent implements OnInit
{
  dataSource: Tbpermission[] = [];
  displayedColumns: string[] = [ 'id', 'title', 'description' ];
  qtdeRegistros: any = 0;

  constructor( private readonly tbPermissionService: TbPermissionService )
  {
    this.getPermissionsList();
  }

  ngOnInit(): void
  {
    
  }

  getPermissionsList(): void
  {
    this.tbPermissionService.getPermissions().subscribe(
      {
        next: ( res: Tbpermission[] ) =>
        {
          console.log( res );
          this.qtdeRegistros = res.length;
          this.dataSource = res;
        },
        error: ( err: HttpErrorResponse ) =>
        {
          console.log( err );
        }
      }
    );
  }

  zerosLeft( num: number, size: number ): string
  {
    let s = num + "";

    while (s.length < size)
    {
      s = "0" + s;
    }

    return s;
  }
}