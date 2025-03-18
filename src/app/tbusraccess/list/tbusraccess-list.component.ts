import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TbUsrAccessService } from '../tbusraccess.service';
import { Tbusraccess } from '../tbusraccess.model';

@Component(
  {
    selector: 'app-tbusraccess-list',
    templateUrl: './tbusraccess-list.component.html',
    styleUrl: './tbusraccess-list.component.css'
  }
)

export class TbUsrAccessListComponent implements OnInit
{
  dataSource: Tbusraccess[] = [];
  displayedColumns: string[] = [ 'id', 'username', 'password', 'tip', 'users.name', 'users.email' ];
  qtdeRegistros: any = 0;

  constructor( private readonly tbUsrAccessService: TbUsrAccessService )
  {
    this.getUsrsAccessList();
  }

  ngOnInit(): void
  {
    
  }

  getUsrsAccessList(): void
  {
    this.tbUsrAccessService.getUsrsAccess().subscribe(
      {
        next: ( res: Tbusraccess[] ) =>
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

  asterisks( field: string ): string
  {
    let nPos: number = 0;
    let astk: string = "";

    while (nPos <= field.length)
    {
      astk += "*";
      nPos += 1;
    }

    return astk;
  }
}