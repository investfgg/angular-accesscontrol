import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TbuserSelect } from '../../tbuser/tbuser.model';
import { TbUserService } from '../../tbuser/tbuser.service';
import { Tbusraccess, TbusraccessFrm } from '../tbusraccess.model';
import { TbUsrAccessService } from '../tbusraccess.service';
import { HttpErrorResponse } from '@angular/common/http';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component(
  {
    selector: 'app-tbusraccess-form',
    templateUrl: './tbusraccess.component.html',
    styleUrl: './tbusraccess.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
  }
)

export class TbUsrAccessComponent implements OnInit
{
  readonly usrAcForm_username  = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );
  readonly usrAcForm_password  = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );
  readonly usrAcForm_password2 = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );
  readonly usrAcForm_tip       = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );
  readonly usrAcForm_idUsers   = new FormControl( '', [Validators.required] );

  errorMessage1 = signal( '' );
  errorMessage2 = signal( '' );
  errorMessage3 = signal( '' );
  errorMessage4 = signal( '' );
  errorMessage5 = signal( '' );
  hide          = signal( true );

  password2: string = '';
  dataSourceUser: TbuserSelect[] = [];

  tbUsrAccess: Tbusraccess =
  {
    // id: 0,                  //não é necessário incluir o campo autoincremento
    username: '',
    password: '',
    tip: '',
    users: [],
    //createdAt: new Date()   não é necessário pois o campo já está presente no Controller do Java Backend (tbUsrAccessService.createUsrAccess)
  }

  tbUsrAccessFrm: TbusraccessFrm =
  {
    // id: 0,                  //não é necessário incluir o campo autoincremento
    username: '',
    password: '',
    tip: '',
    users: '',
    //createdAt: new Date()   não é necessário pois o campo já está presente no Controller do Java Backend (tbUsrAccessService.createUsrAccess)
  }

  tbUsrAccessObj: any =
  {
    // id: 0,                  //não é necessário incluir o campo autoincremento
    username: '',
    password: '',
    tip: '',
    users: [],
    //createdAt: new Date()   não é necessário pois o campo já está presente no Controller do Java Backend (tbUsrAccessService.createUsrAccess)
  }

  tbUserObj: any =
  {
    id: 0,
  }

  constructor( private readonly usrAccessService: TbUsrAccessService, private readonly userService: TbUserService, private readonly router: Router )
  {
    merge( this.usrAcForm_username.statusChanges, this.usrAcForm_username.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrAcForm_usernameErrMess()
    );

    merge( this.usrAcForm_password.statusChanges, this.usrAcForm_password.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrAcForm_passwordErrMess()
    );

    merge( this.usrAcForm_password2.statusChanges, this.usrAcForm_password2.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrAcForm_password2ErrMess()
    );

    merge( this.usrAcForm_tip.statusChanges, this.usrAcForm_tip.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrAcForm_tipErrMess()
    );

    merge( this.usrAcForm_idUsers.statusChanges, this.usrAcForm_idUsers.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrAcForm_idUsersErrMess()
    );
  }

  ngOnInit(): void
  {
    this.readUsers();
  }

  clickEvent( event: MouseEvent )
  {
    this.hide.set( !this.hide() );
    event.stopPropagation();
  }

  readUsers(): void
  {
    this.userService.getUsersSelect().subscribe(
      {
        next: ( res: TbuserSelect[] ) =>
        {
          console.log( res );
          this.dataSourceUser = res;
        },
        error: ( err: HttpErrorResponse ) =>
        {
          console.log( err );
        }
      }
    );
  }

  saveUsrAccess( tbUsrAccess: NgForm ) : void
  {

    //if (!tbUserForm.invalid) // Significa que o formulário com "n" campos não pode(m) conter quebra de regras (invalid).

    if (this.usrAcForm_password.value!.trim() != this.usrAcForm_password2.value!.trim())
    {
      this.swalNotifications( 'errorPasswordNotification' ); // Houve quebra de regras. 
    }

    else if (this.validUsrAccessForm())
    {
      this.tbUsrAccessObj.username = this.tbUsrAccess.username;
      this.tbUsrAccessObj.password = this.tbUsrAccess.password;
      // password2 is not necessary (only the conference).
      this.tbUsrAccessObj.tip = this.tbUsrAccess.tip;
      this.tbUserObj.id = parseInt( this.usrAcForm_idUsers.value!.toString().trim() );
      this.tbUsrAccessObj.users = this.tbUserObj;

      this.usrAccessService.createUsrAccess( this.tbUsrAccessObj ).subscribe(
      {
        next: (res: TbusraccessFrm) =>
        {
          console.log( res );
          tbUsrAccess.reset();
          this.router.navigate( [ "/usraccess-list" ] );
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

  usrAcForm_usernameErrMess()
  {
    let message: string = '';

    if (this.usrAcForm_username.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.usrAcForm_username.hasValidator( Validators.minLength( 4 ) ) || this.usrAcForm_username.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage1.set( message );
  }

  usrAcForm_passwordErrMess()
  {
    let message: string = '';

    if (this.usrAcForm_password.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.usrAcForm_password.hasValidator( Validators.minLength( 4 ) ) || this.usrAcForm_password.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage2.set( message );
  }

  usrAcForm_password2ErrMess()
  {
    let message: string = '';

    if (this.usrAcForm_password2.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if ((this.usrAcForm_password2.hasValidator( Validators.minLength( 4 ) ) || this.usrAcForm_password2.value!.trim().length < 4))
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage3.set( message );
  }

  usrAcForm_tipErrMess()
  {
    let message: string = '';

    if (this.usrAcForm_tip.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.usrAcForm_tip.hasValidator( Validators.minLength( 4 ) ) || this.usrAcForm_tip.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage4.set( message );
  }

  usrAcForm_idUsersErrMess()
  {
    let message: string = '';

    if (this.usrAcForm_idUsers.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    this.errorMessage5.set( message );
  }

  validUsrAccessForm()
  {
    let bValidPassword : boolean = (this.usrAcForm_password.value!.trim().length > 4 && this.usrAcForm_password2.value!.trim().length > 4 &&
                                    this.usrAcForm_password.value!.trim() === this.usrAcForm_password2.value!.trim());

    let bValidIdUsers : boolean = (this.usrAcForm_idUsers.value?.toString().trim() != "" && this.usrAcForm_idUsers.value?.toString().trim() != undefined);

    let bValidPreenchimento : boolean = (this.usrAcForm_username.value!.trim().length > 4 && bValidPassword &&
                                         this.usrAcForm_tip.value!.trim().length > 4 && bValidIdUsers);

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
          title: 'Users Access Registration',
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
          title: 'Users Access Registration',
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