import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TbAppObj } from '../tbappsobj.module';
import { TbAppsObjService } from '../tbappsobj.service';

@Component(
  {
    selector: 'app-tbappsobj-list',
    templateUrl: './tbappsobj-list.component.html',
    styleUrl: './tbappsobj-list.component.css'
  }
)

export class TbAppsObjListComponent implements OnInit
{
  dataSource: TbAppObj[] = [];
  displayedColumns: string[] = [ 'id', 'applications.id', 'applications.name', 'applications.title', 'applications.acronym', 'objects.id', 'objects.title' ];
  qtdeRegistros: any = 0;
  limitDescriptionWidth: number = 50;

  constructor( private readonly tbAppObjService: TbAppsObjService )
  {
    this.getAppObjsList();
  }
 
  ngOnInit(): void
  {

  }

  getAppObjsList(): void
  {
    this.tbAppObjService.getAppObjsList().subscribe(
      {
        next: ( res: TbAppObj[] ) =>
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