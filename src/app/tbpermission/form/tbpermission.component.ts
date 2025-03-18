import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Tbpermission } from '../tbpermission.model';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TbPermissionService } from '../tbpermission.service';
import { HttpErrorResponse } from '@angular/common/http';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

declare function clearUserForm(): void;

@Component(
  {
    selector: 'app-tbpermission',
    templateUrl: './tbpermission.component.html',
    styleUrl: './tbpermission.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
  }
)

export class TbPermissionComponent implements OnInit
{
  readonly perForm_title       = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );
  readonly perForm_description = new FormControl( '', [Validators.minLength( 4 ), Validators.required] );

  errorMessage1 = signal( '' );
  errorMessage2 = signal( '' );

  tbPermission : Tbpermission =
  {
    //id: 0,                  //não é necessário incluir o campo autoincremento
    title: '',
    description: ''
    //createdAt: new Date()   não é necessário pois o campo já está presente no Controller do Java Backend (tbObjectService.createObject)
  } as Tbpermission;

  constructor( private readonly permissionService: TbPermissionService, private readonly router: Router )
  {
    merge( this.perForm_title.statusChanges, this.perForm_title.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.perForm_titleErrMess()
    );

    merge( this.perForm_description.statusChanges, this.perForm_description.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.perForm_descriptionErrMess()
    );
  }

  ngOnInit(): void
  {

  }

  savePermission( tbPermissionForm: NgForm ): void
  {

    //if (!tbPermissionForm.invalid) // Significa que o formulário com "n" campos não pode(m) conter quebra de regras (invalid).
    if (this.validPermissionForm())
    {
      this.permissionService.createPermission( this.tbPermission ).subscribe(
      {
        next: (res: Tbpermission) =>
        {
          console.log( res );
          tbPermissionForm.reset();
          this.router.navigate( [ "/permission-list" ] );
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

  perForm_titleErrMess()
  {
    let message: string = '';

    if (this.perForm_title.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.perForm_title.hasValidator( Validators.minLength( 4 ) ) || this.perForm_title.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }
  
    this.errorMessage1.set( message );
  }

  perForm_descriptionErrMess()
  {
    let message: string = '';

    if (this.perForm_description.hasError( 'required' ))
    {
      message = 'Você tem de preencher o campo!';
    }

    else if (this.perForm_description.hasValidator( Validators.minLength( 4 ) ) || this.perForm_description.value!.trim().length < 4)
    {
      message = 'Não pode conter menos que 3 caracteres!';
    }

    this.errorMessage2.set( message );
  }

  // Tag Mat-Error
  errorMsgPermission( value: string ) : any
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

  validPermissionForm()
  {
    let bPreenchimento: boolean = (this.perForm_title.value!.trim().length > 4 && this.perForm_description.value!.trim().length > 4);

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
          title: 'Permissions Registration',
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