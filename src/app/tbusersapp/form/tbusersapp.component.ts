import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TbApplicationSelect } from '../../tbapplication/tbapplication.model';
import { TbApplicationService } from '../../tbapplication/tbapplication.service';
import { TbUsrAccessSelect } from '../../tbusraccess/tbusraccess.model';
import { TbUsrAccessService } from '../../tbusraccess/tbusraccess.service';
import { TbuserSelect } from '../../tbuser/tbuser.model';
import { TbUserService } from '../../tbuser/tbuser.service';
import { Tbuserapp, TbuserappFrm } from '../tbuserapp.model';
import { TbUserAppService } from '../tbuserapp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component(
  {
    selector: 'app-tbuserapp',
    templateUrl: './tbusersapp.component.html',
    styleUrl: './tbusersapp.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
  }
)

export class TbUsersAppComponent implements OnInit
{
  readonly usrAppForm_idApplications = new FormControl( '', [Validators.required] );
  readonly usrAppForm_idUsrsAccess   = new FormControl( '', [Validators.required] );

  errorMessage1 = signal( '' );
  errorMessage2 = signal( '' );

  dataSourceApplication: TbApplicationSelect[] = [];
  dataSourceUserAccess: TbUsrAccessSelect[] = [];
  dataSourceUser: TbuserSelect[] = [];

  tbUserApp: Tbuserapp =
  {
    applications: [],
    usrsAccesses: []
  }

  tbUserAppFrm: TbuserappFrm =
  {
    applications: '',
    usrsAccesses: ''
  }

  tbUserAppObj: any =
  {
    applications: [],
    usrsAccesses: []
  }

  tbApplicationObj: any =
  {
    id: 0,
  }

  tbUsrAccessObj: any =
  {
    id: 0,
  }

  constructor( private readonly userAppService: TbUserAppService, private readonly tbApplicationService: TbApplicationService,
               private readonly tbUsrAccessService: TbUsrAccessService, private readonly tbUserService: TbUserService,
               private readonly router: Router )
  {
    merge( this.usrAppForm_idApplications.statusChanges, this.usrAppForm_idApplications.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrAppForm_idApplicationsErrMess()
    );

    merge( this.usrAppForm_idUsrsAccess.statusChanges, this.usrAppForm_idUsrsAccess.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrAppForm_idUsrsAccessErrMess()
    );
  }

  ngOnInit(): void
  {
    this.readApplications();
    this.readUsrsAccess();
    this.readUsers();
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

  readUsrsAccess(): void
  {
    this.tbUsrAccessService.getUsrsAccessSelect().subscribe(
      {
        next: ( res: TbUsrAccessSelect[] ) =>
        {
          console.log( res );
          this.dataSourceUserAccess = res;
        },
        error: ( err: HttpErrorResponse ) =>
        {
          console.log( err );
        }
      }
    );
  }

  readUsers(): void
  {
    this.tbUserService.getUsersSelect().subscribe(
      {
        next: ( res: TbuserSelect[] ) =>
        {
          this.dataSourceUser = res;
        },
        error: ( err: HttpErrorResponse ) =>
        {
          console.log( err );
        }
      }
    );
  }

  optionSelectUsrsAccess( idUser: any ) : string
  {
    let strResult = '';

    for (let index = 0; index <= this.dataSourceUser.length  -1; index ++)
    {
      if (idUser[ index ].id === this.dataSourceUser[ index ].id)
      {
        strResult = this.dataSourceUser[ index ].name.trim();
        break;
      }
    }

    return (strResult == '') ? 'NOT FOUND' : strResult;
  }

  saveUserApp( tbUsersApp: NgForm ) : void
  {

    //if (!tbUserForm.invalid) // Significa que o formulário com "n" campos não pode(m) conter quebra de regras (invalid).

    if (this.validUserAppForm())
    {
      this.tbApplicationObj.id = parseInt( this.usrAppForm_idApplications.value!.toString().trim() );
      this.tbUsrAccessObj.id = parseInt( this.usrAppForm_idUsrsAccess.value!.toString().trim() );
      this.tbUserAppObj.applications = this.tbApplicationObj;
      this.tbUserAppObj.usrsAccesses = this.tbUsrAccessObj;

      this.userAppService.createUserApp( this.tbUserAppObj ).subscribe(
      {
        next: (res: TbuserappFrm) =>
        {
          console.log( res );
          tbUsersApp.reset();
          this.router.navigate( [ "/usersapp-list" ] );
        },

        error: (err: HttpErrorResponse) =>
        {
          console.log( err );
          this.swalNotifications( 'errorNotification' ); // Melhorar a janela de erro
        }
      } );
    }

    else
    {
      this.swalNotifications( 'errorNotification' ); // Houve quebra de regras. 
    }
  }

  usrAppForm_idApplicationsErrMess()
  {
    let message: string = '';

    if (this.usrAppForm_idApplications.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    this.errorMessage1.set( message );
  }

  usrAppForm_idUsrsAccessErrMess()
  {
    let message: string = '';

    if (this.usrAppForm_idUsrsAccess.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    this.errorMessage2.set( message );
  }

  validUserAppForm()
  {
    let bValidIdApplications : boolean = (this.usrAppForm_idApplications.value?.toString().trim() != "" && this.usrAppForm_idApplications.value?.toString().trim() != undefined);
    let bValidIdUsrsAccess   : boolean = (this.usrAppForm_idUsrsAccess.value?.toString().trim() != "" && this.usrAppForm_idUsrsAccess.value?.toString().trim() != undefined);
    let bValidPreenchimento  : boolean = (bValidIdApplications && bValidIdUsrsAccess);

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
          title: 'Users Access by Applications Registration',
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
          title: 'Users Access by Applications Registration',
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