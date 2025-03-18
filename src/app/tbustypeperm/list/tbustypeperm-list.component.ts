import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Tbustypeperm } from '../tbustypeperm.module';
import { TbUstypesPermService } from '../tbustypeperm.service';

@Component(
  {
    selector: 'app-tbustypeperm-list',
    templateUrl: './tbustypeperm-list.component.html',
    styleUrl: './tbustypeperm-list.component.css'
  }
)

export class TbUstypePermListComponent implements OnInit
{
  dataSource: Tbustypeperm[] = [];
  displayedColumns: string[] = [ 'id', 'usertypes.id', 'usertypes.title', 'usertypes.description', 'permissions.id', 'permissions.title', 'permissions.description' ];
  qtdeRegistros: any = 0;
  limitDescriptionWidth: number = 50;

  constructor( private readonly tbUstypePermService: TbUstypesPermService )
  {
    this.getUstypePermsList();
  }
 
  ngOnInit(): void
  {

  }

  getUstypePermsList(): void
  {
    this.tbUstypePermService.getUstypePermsList().subscribe(
      {
        next: ( res: Tbustypeperm[] ) =>
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