import { Component, OnInit } from '@angular/core';
import { TbApplicationService } from '../tbapplication.service';
import { TbApplication } from '../tbapplication.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component(
  {
    selector: 'app-tbapplication-list',
    templateUrl: './tbapplication-list.component.html',
    styleUrl: './tbapplication-list.component.css'
  }
)

export class TbApplicationListComponent implements OnInit
{
  dataSource: TbApplication[] = [];
  displayedColumns: string[] = [ 'id', 'name', 'title', 'acronym', 'description' ];
  qtdeRegistros: any = 0;

  constructor( private readonly tbApplicationService: TbApplicationService )
  {
    this.getApplicationsList();
  }

  ngOnInit(): void
  {
    
  }

  getApplicationsList(): void
  {
    this.tbApplicationService.getApplications().subscribe(
      {
        next: ( res: TbApplication[] ) =>
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