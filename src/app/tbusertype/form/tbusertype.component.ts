import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Tbusertype } from '../tbusertype.model';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TbusertypeService } from '../tbusertype.service';
import { HttpErrorResponse } from '@angular/common/http';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

declare function clearUserForm(): void;

@Component(
  {
    selector: 'app-tbusertype',
    templateUrl: './tbusertype.component.html',
    styleUrl: './tbusertype.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
  }
)

export class TbUsertypeComponent implements OnInit
{
  readonly ustForm_title       = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );
  readonly ustForm_description = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );

  errorMessage1 = signal( '' );
  errorMessage2 = signal( '' );

  tbUserType : Tbusertype =
  {
    //id: 0,                  //não é necessário incluir o campo autoincremento
    title: '',
    description: ''
    //createdAt: new Date()   não é necessário pois o campo já está presente no Controller do Java Backend (tbObjectService.createObject)
  } as Tbusertype;

  constructor( private readonly usertypeService: TbusertypeService, private readonly router: Router )
  {
    merge( this.ustForm_title.statusChanges, this.ustForm_title.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.ustForm_titleErrMess()
    );

    merge( this.ustForm_description.statusChanges, this.ustForm_description.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.ustForm_descriptionErrMess()
    );
  }

  ngOnInit(): void
  {

  }

  saveUserType( tbUserTpeForm: NgForm ): void
  {

    //if (!tbUserTypeForm.invalid) // Significa que o formulário com "n" campos não pode(m) conter quebra de regras (invalid).
    if (this.validUserTypeForm())
    {
      this.usertypeService.createUserType( this.tbUserType ).subscribe(
      {
        next: (res: Tbusertype) =>
        {
          console.log( res );
          tbUserTpeForm.reset();
          this.router.navigate( [ "/usertype-list" ] );
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

  ustForm_titleErrMess()
  {
    let message: string = '';

    if (this.ustForm_title.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.ustForm_title.hasValidator( Validators.minLength( 4 ) ) || this.ustForm_title.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }
  
    this.errorMessage1.set( message );
  }

  ustForm_descriptionErrMess()
  {
    let message: string = '';

    if (this.ustForm_description.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.ustForm_description.hasValidator( Validators.minLength( 4 ) ) || this.ustForm_description.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage2.set( message );
  }

  // Tag Mat-Error
  errorMsgUserType( value: string ) : any
  {
    if (value.trim() == "")
    {
      return 'Você tem de preencher o campo!';
    }

    else if (value.trim().length < 4)
    {
      return 'Não pode conter menos que 3 caracteres!';
    }

    else
    {
      return '';
    }
  }

  validUserTypeForm()
  {
    let bPreenchimento: boolean = (this.ustForm_title.value!.trim().length > 4 && this.ustForm_description.value!.trim().length > 4);

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
          title: 'User Types Registration',
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