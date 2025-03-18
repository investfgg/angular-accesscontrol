import { Component, OnInit } from '@angular/core';
import { TbUserService } from '../tbuser.service';
import { Tbuser } from '../tbuser.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component(
  {
    selector: 'app-tb-user-list',
    templateUrl: './tbuser-list.component.html',
    styleUrl: './tbuser-list.component.css',
  }
)

export class TbUserListComponent implements OnInit
{
  dataSource: Tbuser[] = [];
  displayedColumns: string[] = [ 'id', 'name', 'email', 'description' ];
  qtdeRegistros: any = 0;

  constructor( private readonly tbUserService: TbUserService )
  {
    this.getUsersList();
  }

  ngOnInit(): void
  {
    
  }

  getUsersList(): void
  {
    this.tbUserService.getUsers().subscribe(
      {
        next: ( res: Tbuser[] ) =>
        {
          console.log( res );
          this.dataSource = res;
          this.qtdeRegistros = res.length;
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