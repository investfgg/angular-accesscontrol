import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Tbuser } from '../tbuser.model';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TbUserService } from '../tbuser.service';
import { HttpErrorResponse } from '@angular/common/http';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

declare function clearUserForm(): void;

@Component(
  {
    selector: 'app-tbuser',
    templateUrl: './tbuser.component.html',
    styleUrl: './tbuser.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
  }
)

export class TbUserComponent implements OnInit
{
  readonly usrForm_name        = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );
  readonly usrForm_email       = new FormControl( '', [Validators.required, Validators.email] );
  readonly usrForm_description = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );

  errorMessage1 = signal( '' );
  errorMessage2 = signal( '' );
  errorMessage3 = signal( '' );

  tbUser: Tbuser =
  {
    //id: 0,                  //não é necessário incluir o campo autoincremento
    name: '',
    email: '',
    description: ''
    //createdAt: new Date()   não é necessário pois o campo já está presente no Controller do Java Backend (tbUserService.createUser)
  } as Tbuser;

  constructor( private readonly userService: TbUserService, private readonly router: Router )
  {
    merge( this.usrForm_name.statusChanges, this.usrForm_name.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrForm_nameErrMess()
    );

    merge( this.usrForm_email.statusChanges, this.usrForm_email.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrForm_emailErrMess()
    );

    merge( this.usrForm_description.statusChanges, this.usrForm_description.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.usrForm_descriptionErrMess()
    );
  }

  ngOnInit(): void
  {

  }

  saveUser( tbUserForm: NgForm ): void
  {

    //if (!tbUserForm.invalid) // Significa que o formulário com "n" campos não pode(m) conter quebra de regras (invalid).
    if (this.validUserForm())
    {
      this.userService.createUser( this.tbUser ).subscribe(
      {
        next: (res: Tbuser) =>
        {
          console.log( res );
          tbUserForm.reset();
          this.router.navigate( [ "/user-list" ] );
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

  usrForm_nameErrMess()
  {
    let message: string = '';

    if (this.usrForm_name.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.usrForm_name.hasValidator( Validators.minLength( 4 ) ) || this.usrForm_name.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage1.set( message );
  }

  usrForm_emailErrMess()
  {
    let message: string = '';

    if (this.usrForm_email.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.usrForm_email.hasError( 'email' ))
    {
      message = 'Not a valid email!';
    }

    this.errorMessage2.set( message );
  }

  usrForm_descriptionErrMess()
  {
    let message: string = '';

    if (this.usrForm_description.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.usrForm_description.hasValidator( Validators.minLength( 4 ) ) || this.usrForm_description.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage3.set( message );
  }

  errorMsgUser( value: string ) : any
  {

    if (value.trim() == "")
    {
      return 'Você tem de preencher o campo!';
    }

    else if (value.trim().length < 4)
    {
      return 'Não pode conter menos que 3 caracteres!';
    }

    else if (this.usrForm_email.hasError( 'email' ) && value.trim() != "")
    {
      return 'Not a valid email!';
    }
  
    else
    {
      return '';
    }
  }

  validUserForm()
  {
    let bPreenchimento : boolean = (this.usrForm_name.value!.trim().length > 4 && !this.usrForm_email.hasError( 'email' ) && this.usrForm_description.value!.trim().length > 4);

    return bPreenchimento;
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

    if (option == 'errorNotification')
    {
      Swal.fire(
        {
          title: 'Users Registration',
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