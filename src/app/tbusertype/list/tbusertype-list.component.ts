import { Component, OnInit } from '@angular/core';
import { TbusertypeService } from '../../tbusertype/tbusertype.service';
import { Tbusertype } from '../tbusertype.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component(
  {
    selector: 'app-tbusertype-list',
    templateUrl: './tbusertype-list.component.html',
    styleUrl: './tbusertype-list.component.css'
  }
)

export class TbUsertypeListComponent implements OnInit
{
  dataSource: Tbusertype[] = [];
  displayedColumns: string[] = [ 'id', 'title', 'description' ];
  qtdeRegistros: any = 0;

  constructor( private readonly tbUserTypeService: TbusertypeService )
  {
    this.getObjectsList();
  }

  ngOnInit(): void
  {
    
  }

  getObjectsList(): void
  {
    this.tbUserTypeService.getUserTypes().subscribe(
      {
        next: ( res: Tbusertype[] ) =>
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