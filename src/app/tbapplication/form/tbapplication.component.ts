import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { TbApplication } from '../tbapplication.model';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TbApplicationService } from '../tbapplication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component(
  {
    selector: 'app-tbapplication',
    templateUrl: './tbapplication.component.html',
    styleUrl: './tbapplication.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
  }
)

export class TbApplicationComponent implements OnInit
{
  readonly appForm_name        = new FormControl( '', [ Validators.minLength( 4 ), Validators.required ] );
  readonly appForm_title       = new FormControl( '', [ Validators.minLength( 4 ), Validators.required ] );
  readonly appForm_acronym     = new FormControl( '', [ Validators.minLength( 4 ), Validators.required ] );
  readonly appForm_description = new FormControl( '', [ Validators.minLength( 4 ), Validators.required ] );

  errorMessage1 = signal( '' );
  errorMessage2 = signal( '' );
  errorMessage3 = signal( '' );
  errorMessage4 = signal( '' );

  tbApplication : TbApplication =
  {
    //id: 0,                  //não é necessário incluir o campo autoincremento
    name: '',
    title: '',
    acronym: '',
    description: ''
    //createdAt: new Date()   não é necessário pois o campo já está presente no Controller do Java Backend (tbApplicationService.createApplication)
  } as TbApplication;

  constructor( private readonly applicationService: TbApplicationService, private readonly router: Router )
  {
    merge( this.appForm_name.statusChanges, this.appForm_name.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.appForm_nameErrMess()
    );

    merge( this.appForm_title.statusChanges, this.appForm_title.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.appForm_titleErrMess()
    );

    merge( this.appForm_acronym.statusChanges, this.appForm_acronym.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.appForm_acronymErrMess()
    );

    merge( this.appForm_description.statusChanges, this.appForm_description.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.appForm_descriptionErrMess()
    );
  }

  ngOnInit(): void
  {

  }

  saveApplication( tbApplicationForm: NgForm ): void
  {

    //if (!tbApplicationForm.invalid) // Significa que o formulário com "n" campos não pode(m) conter quebra de regras (invalid).
    if (this.validApplicationForm())
    {
      this.applicationService.createApplication( this.tbApplication ).subscribe(
      {
        next: (res: TbApplication) =>
        {
          console.log( res );
          tbApplicationForm.reset();
          this.router.navigate( [ "/application-list" ] );
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

  appForm_nameErrMess()
  {
    let message: string = '';

    if (this.appForm_name.hasError( 'required' ) || this.appForm_name.value!.trim() == '')
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.appForm_name.hasValidator( Validators.minLength( 4 ) ) || this.appForm_name.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage1.set( message );
  }

  appForm_titleErrMess()
  {
    let message: string = '';

    if (this.appForm_title.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.appForm_title.hasValidator( Validators.minLength( 4 ) ) || this.appForm_title.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }
  
    this.errorMessage2.set( message );
  }

  appForm_acronymErrMess()
  {
    let message: string = '';

    if (this.appForm_acronym.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.appForm_acronym.hasValidator( Validators.minLength( 4 ) ) || this.appForm_acronym.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }
  
    this.errorMessage3.set( message );
  }

  appForm_descriptionErrMess()
  {
    let message: string = '';

    if (this.appForm_description.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.appForm_description.hasValidator( Validators.minLength( 4 ) ) || this.appForm_description.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage4.set( message );
  }

  validApplicationForm()
  {
    let bPreenchimento: boolean = (this.appForm_name.value!.trim().length > 4 && this.appForm_title.value!.trim().length > 4 &&
                                   this.appForm_acronym.value!.trim().length > 4 && this.appForm_description.value!.trim().length > 4);

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
          title: 'Applications Registration',
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