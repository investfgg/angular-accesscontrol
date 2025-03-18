import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TbUserAppService } from '../tbuserapp.service';
import { Tbuserapp } from '../tbuserapp.model';

@Component(
  {
    selector: 'app-tbusersapp-list',
    templateUrl: './tbusersapp-list.component.html',
    styleUrl: './tbusersapp-list.component.css'
  }
)

export class TbUsersAppListComponent implements OnInit
{
  dataSource: Tbuserapp[] = [];
  displayedColumns: string[] = [ 'id', 'applications.id', 'applications.name', 'applications.title', 'applications.acronym', 'usrsAccesses.id', 'usrsAccesses.username' ];
  qtdeRegistros: any = 0;
  limitDescriptionWidth: number = 50;

  constructor( private readonly tbUserAppService: TbUserAppService )
  {
    this.getUserAppsList();
  }
 
  ngOnInit(): void
  {

  }

  getUserAppsList(): void
  {
    this.tbUserAppService.getUserAppsList().subscribe(
      {
        next: ( res: Tbuserapp[] ) =>
        {
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

  limitCharsDescription( descr: string, size: number ): string
  {
    let strReturn = descr;

    if (descr.trim().length > size)
    {
      strReturn = descr.substring( 0, size ) + "...";
    }

    return strReturn;
  }

  showTooltipDescription( descr: string ): string
  {
    return (descr.trim().length > this.limitDescriptionWidth) ? descr.trim() : "";
  }
}