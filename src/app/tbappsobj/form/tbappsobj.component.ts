import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TbApplicationSelect } from '../../tbapplication/tbapplication.model';
import { TbObjectSelect } from '../../tbobject/tbobject.model';

import { HttpErrorResponse } from '@angular/common/http';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TbAppObj, TbAppObjFrm } from '../tbappsobj.module';
import { TbAppsObjService } from '../tbappsobj.service';
import { TbApplicationService } from '../../tbapplication/tbapplication.service';
import { TbObjectService } from '../../tbobject/tbobject.service';

@Component(
  {
    selector: 'app-tbappsobj',
    templateUrl: './tbappsobj.component.html',
    styleUrl: './tbappsobj.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
  }
)

export class TbAppsObjComponent implements OnInit
{
  readonly appObjForm_idApplications = new FormControl( '', [Validators.required] );
  readonly appObjForm_idObjects      = new FormControl( '', [Validators.required] );

  errorMessage1 = signal( '' );
  errorMessage2 = signal( '' );

  dataSourceApplication: TbApplicationSelect[] = [];
  dataSourceObject: TbObjectSelect[] = [];

  tbAppObj: TbAppObj =
  {
    applications: [],
    objects: []
  }

  tbAppObjFrm: TbAppObjFrm =
  {
    applications: '',
    objects: '',
  }

  tbAppObj_Obj: any =
  {
    applications: [],
    objects: [],
  }

  tbApplicationObj: any =
  {
    id: 0,
  }

  tbObjectObj: any =
  {
    id: 0,
  }

  constructor( private readonly appObjService: TbAppsObjService, private readonly tbApplicationService: TbApplicationService,
               private readonly tbObjectService: TbObjectService, private readonly router: Router )
  {
    merge( this.appObjForm_idApplications.statusChanges, this.appObjForm_idApplications.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.appObjForm_idApplicationsErrMess()
    );

    merge( this.appObjForm_idObjects.statusChanges, this.appObjForm_idObjects.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.appObjForm_idObjectsErrMess()
    );
  }

  ngOnInit(): void
  {
    this.readApplications();
    this.readObjects();
  }

  readApplications(): void
  {
    this.tbApplicationService.getApplicationsSelect().subscribe(
      {
        next: ( res: TbApplicationSelect[] ) =>
        {
          console.log( res );
          this.dataSourceApplication = res;
        },
        error: ( err: HttpErrorResponse ) =>
        {
          console.log( err );
        }
      }
    );
  }

  readObjects(): void
  {
    this.tbObjectService.getObjectsSelect().subscribe(
      {
        next: ( res: TbObjectSelect[] ) =>
        {
          console.log( res );
          this.dataSourceObject = res;
        },
        error: ( err: HttpErrorResponse ) =>
        {
          console.log( err );
        }
      }
    );
  }

  saveAppObj( tbAppObj: NgForm ): void
  {
    if (this.validAppObjForm())
    {
      this.tbApplicationObj.id       = parseInt( this.appObjForm_idApplications.value!.toString().trim() );
      this.tbObjectObj.id            = parseInt( this.appObjForm_idObjects.value!.toString().trim() );
      this.tbAppObj_Obj.applications = this.tbApplicationObj;
      this.tbAppObj_Obj.objects      = this.tbObjectObj;

      this.appObjService.createAppObj( this.tbAppObj_Obj ).subscribe(
      {
        next: (res: TbAppObj) =>
        {
          console.log( res );
          tbAppObj.reset();
          this.router.navigate( [ "/appsobj-list" ] );
        },

        error: (err: HttpErrorResponse) =>
        {
          console.log( err );
          this.swalNotifications( 'errorNotification' ); // Melhorar a janela de erro
        }
      } );
    }
  }

  appObjForm_idApplicationsErrMess()
  {
    let message: string = '';

    if (this.appObjForm_idApplications.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    this.errorMessage1.set( message );
  }

  appObjForm_idObjectsErrMess()
  {
    let message: string = '';

    if (this.appObjForm_idObjects.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    this.errorMessage2.set( message );
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

  validAppObjForm()
  {
    let bValidIdApplications : boolean = (this.appObjForm_idApplications.value?.toString().trim() != "" && this.appObjForm_idApplications.value?.toString().trim() != undefined);
    let bValidIdObjects      : boolean = (this.appObjForm_idObjects.value?.toString().trim() != "" && this.appObjForm_idObjects.value?.toString().trim() != undefined);
    let bValidPreenchimento  : boolean = (bValidIdApplications && bValidIdObjects);

    return bValidPreenchimento;
  }

  swalNotifications( option: any )
  {

    if (option == 'simpleNotification')
    {
      Swal.fire( 'Simple Notification' );
    }

    if (option == 'successNotification')
    {
      Swal.fire( 'Hi!', 'We have been informed', 'success' );
    }

    if (option == 'errorPasswordNotification')
    {
      Swal.fire(
        {
          title: 'Applications by Objects Registration',
          html: 'As senhas não se conferem!<br>Corrija-os antes de prosseguir.',
          customClass:
          {
            title: "<h2>Teste</h2>",
            popup: "swal2-border-radius-red"
          },
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: "#ff3232"
        }
      );
    }
  
    if (option == 'errorNotification')
    {
      Swal.fire(
        {
          title: 'Applications by Objects Registration',
          html: 'Há algum(ns) campo(s) em tom vermelho!<br>Corrija-os antes de prosseguir.',
          customClass:
          {
            title: "<h2>Teste</h2>",
            popup: "swal2-border-radius-red"
          },
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: "#ff3232"
        }
      );
    }
  }
}