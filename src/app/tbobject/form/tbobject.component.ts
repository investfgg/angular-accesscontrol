import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Tbobject } from '../tbobject.model';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TbObjectService } from '../tbobject.service';
import { HttpErrorResponse } from '@angular/common/http';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

declare function clearUserForm(): void;

@Component(
  {
    selector: 'app-tbobject',
    templateUrl: './tbobject.component.html',
    styleUrl: './tbobject.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
  }
)

export class TbObjectComponent implements OnInit
{
  readonly objForm_title       = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );
  readonly objForm_description = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );

  errorMessage1 = signal( '' );
  errorMessage2 = signal( '' );

  tbObject : Tbobject =
  {
    //id: 0,                  //não é necessário incluir o campo autoincremento
    title: '',
    description: ''
    //createdAt: new Date()   não é necessário pois o campo já está presente no Controller do Java Backend (tbObjectService.createObject)
  } as Tbobject;

  constructor( private readonly objectService: TbObjectService, private readonly router: Router )
  {
    merge( this.objForm_title.statusChanges, this.objForm_title.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.objForm_titleErrMess()
    );

    merge( this.objForm_description.statusChanges, this.objForm_description.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.objForm_descriptionErrMess()
    );
  }

  ngOnInit(): void
  {

  }

  saveObject( tbObjectForm: NgForm ): void
  {

    //if (!tbObjectForm.invalid) // Significa que o formulário com "n" campos não pode(m) conter quebra de regras (invalid).
    if (this.validObjectForm())
    {
      this.objectService.createObject( this.tbObject ).subscribe(
      {
        next: (res: Tbobject) =>
        {
          console.log( res );
          tbObjectForm.reset();
          this.router.navigate( [ "/object-list" ] );
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

  objForm_titleErrMess()
  {
    let message: string = '';

    if (this.objForm_title.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.objForm_title.hasValidator( Validators.minLength( 4 ) ) || this.objForm_title.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }
  
    this.errorMessage1.set( message );
  }

  objForm_descriptionErrMess()
  {
    let message: string = '';

    if (this.objForm_description.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.objForm_description.hasValidator( Validators.minLength( 4 ) ) || this.objForm_description.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage2.set( message );
  }

  // Tag Mat-Error
  errorMsgObject( value: string ) : any
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

  validObjectForm()
  {
    let bPreenchimento: boolean = (this.objForm_title.value!.trim().length > 4 && this.objForm_description.value!.trim().length > 4);

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
          title: 'Objects Registration',
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