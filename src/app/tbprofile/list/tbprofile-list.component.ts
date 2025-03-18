import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { TbProfileService } from '../tbprofile.service';
import { Tbprofile } from '../tbprofile.module';
import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component(
  {
    selector: 'app-tbprofile-list',
    templateUrl: './tbprofile-list.component.html',
    styleUrl: './tbprofile-list.component.css',
    changeDetection: ChangeDetectionStrategy.Default,
  }
)

export class TbProfileListComponent implements OnInit
{
  displayedColumns: string[] = [ 'id', 'appsobjs.id', 'usersapps.id', 'ustypeperms.id', 'usersapps.applications.id', 'appsobjs.objects.id',
                                 'usersapps.usrsAccesses.id', 'ustypeperms.usertypes.id', 'ustypeperms.permissions.id', 'operations' ];

  qtdeRegistros: any = 0;
  limitDescriptionWidth: number = 50;
  dataSource!: Tbprofile[];
  stringifiedData: any;  
  parsedJson: any;
  profileApplicationInfo: string = '';
  profileObjectInfo: string      = '';
  profileUserAccessInfo: string  = '';
  profileUserTypeInfo: string    = '';
  profilePermissionInfo: string  = '';
  getProfilesListSubscription!: Subscription;

  constructor( private readonly tbProfile: TbProfileService )
  {

  }
 
  ngOnInit()
  {
    this.getProfilesList();
  }

  funProfileApplicationDialog( app: any )
  {
    this.profileApplicationInfo = '<strong>ID: </strong>' + this.zerosLeft( app.id, 4 ) + '<BR>' +
                                  '<strong>NAME: </strong>' + app.name + '<BR>' +
                                  '<strong>TITLE: </strong>' + app.title + '<BR>' +
                                  '<strong>ACRONYM: </strong>' + app.acronym + '<BR>';

    this.openDialog( "Application's Info", this.profileApplicationInfo );
  }

  funProfileUserAccessDialog( uac: any )
  {
    this.profileUserAccessInfo = '<strong>ID: </strong>' + this.zerosLeft( uac.id, 4 ) + '<BR>' +
                                 '<strong>USERNAME: </strong>' + uac.username + '<BR>';

    this.openDialog( "User Access' Info", this.profileUserAccessInfo );
  }

  funProfileObjectDialog( obj: any )
  {
    this.profileObjectInfo = '<strong>ID: </strong>' + this.zerosLeft( obj.id, 4 ) + '<BR>' +
                             '<strong>TITLE: </strong>' + obj.title + '<BR>' +
                             '<strong>DESCRIPTION: </strong>' + obj.description + '<BR>';

    this.openDialog( "Object's Info", this.profileObjectInfo );
  }

  funProfileUserTypeDialog( ust: any )
  {
    this.profileUserTypeInfo = '<strong>ID: </strong>' + this.zerosLeft( ust.id, 4 ) + '<BR>' +
                               '<strong>TITLE: </strong>' + ust.title + '<BR>' +
                               '<strong>DESCRIPTION: </strong>' + ust.description + '<BR>';

    this.openDialog( "User Type' Info", this.profileUserTypeInfo );
  }

  funProfilePermissionDialog( per: any )
  {
    this.profilePermissionInfo = '<strong>ID: </strong>' + this.zerosLeft( per.id, 4 ) + '<BR>' +
                                 '<strong>TITLE: </strong>' + per.title + '<BR>' +
                                 '<strong>DESCRIPTION: </strong>' + per.title + '<BR>';

    this.openDialog( "Permission' Info", this.profilePermissionInfo );
  }

  readonly dialog = inject( MatDialog );

  openDialog( strTitle: any, strInfo: any )
  {
    const dialog = this.dialog.open( DialogElementsExampleDialog, {
      data: { title: strTitle, info: strInfo, disableClose: true }
    } );

    dialog.afterClosed().subscribe(
      result => console.log('Dialog result', result)
    );
  }

  getProfilesList(): void
  {
    this.getProfilesListSubscription = this.tbProfile.getProfiles().subscribe(
      ( data ) =>
      {
        this.stringifiedData = JSON.stringify( data );
        this.parsedJson = JSON.parse( this.stringifiedData );
        this.dataSource = this.parsedJson;
        this.qtdeRegistros = data.length;
      },
      ( error ) =>
      {
        console.log( error );
      },
      () =>
      {
        console.log('lista de Profiles completada!');
      }
    );
  }

  ngOnDestroy()
  {
    this.getProfilesListSubscription.unsubscribe();
    console.log('lista de Profiles unsubscribe!');
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

  showTooltipRelship( fieldInfo: any, obj: any ): string
  {
    let strReturn: string  = '<strong>ID: </strong>' + this.zerosLeft( obj.id, 4 ) + '<BR>';

    if (fieldInfo == 'app')
    {
      this.profileApplicationInfo = '<strong>NAME: </strong>' + obj.name + '<BR>' +
                                    '<strong>TITLE: </strong>' + obj.title + '<BR>' +
                                    '<strong>ACRONYM: </strong>' + obj.acronym + '<BR>';

      strReturn += this.profileApplicationInfo;
    }

    return strReturn;
  }
}

@Component(
  {
    standalone: true,
    selector: 'dialog-elements-example-dialog',
    templateUrl: 'tbprofile-list-info.html',
    styleUrl: './tbprofile-list.component.css',
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  }
)

export class DialogElementsExampleDialog
{
  constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private readonly dialogRef: MatDialogRef<DialogElementsExampleDialog> )
  {
    dialogRef.disableClose = true;
  }
}