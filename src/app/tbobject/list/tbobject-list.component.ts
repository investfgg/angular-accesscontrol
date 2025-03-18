import { Component, OnInit } from '@angular/core';
import { TbObjectService } from '../tbobject.service';
import { Tbobject } from '../tbobject.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component(
  {
    selector: 'app-tbobject-list',
    templateUrl: './tbobject-list.component.html',
    styleUrl: './tbobject-list.component.css'
  }
)

export class TbObjectListComponent implements OnInit
{
  dataSource: Tbobject[] = [];
  displayedColumns: string[] = [ 'id', 'title', 'description' ];
  qtdeRegistros: any = 0;

  constructor( private readonly tbObjectService: TbObjectService )
  {
    this.getObjectsList();
  }

  ngOnInit(): void
  {
    
  }

  getObjectsList(): void
  {
    this.tbObjectService.getObjects().subscribe(
      {
        next: ( res: Tbobject[] ) =>
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