import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { TbUserListComponent } from './tbuser/list/tbuser-list.component';
import { TbUserComponent } from './tbuser/form/tbuser.component';

import { TbApplicationListComponent } from './tbapplication/list/tbapplication-list.component';
import { TbApplicationComponent } from './tbapplication/form/tbapplication.component';

import { TbObjectListComponent } from './tbobject/list/tbobject-list.component';
import { TbObjectComponent } from './tbobject/form/tbobject.component';

import { TbUsertypeListComponent } from './tbusertype/list/tbusertype-list.component';
import { TbUsertypeComponent } from './tbusertype/form/tbusertype.component';

import { TbPermissionListComponent } from './tbpermission/list/tbpermission-list.component';
import { TbPermissionComponent } from './tbpermission/form/tbpermission.component';

import { TbUsrAccessListComponent } from './tbusraccess/list/tbusraccess-list.component';
import { TbUsrAccessComponent } from './tbusraccess/form/tbusraccess.component';

import { TbUsersAppListComponent } from './tbusersapp/list/tbusersapp-list.component';
import { TbUsersAppComponent } from './tbusersapp/form/tbusersapp.component';

import { TbAppsObjListComponent } from './tbappsobj/list/tbappsobj-list.component';
import { TbAppsObjComponent } from './tbappsobj/form/tbappsobj.component';

import { TbUstypePermListComponent } from './tbustypeperm/list/tbustypeperm-list.component';
import { TbUstypePermComponent } from './tbustypeperm/form/tbustypeperm.component';

import { TbProfileListComponent } from './tbprofile/list/tbprofile-list.component';

@NgModule(
  {
    declarations: [
      AppComponent,
      HeaderComponent,
      HomeComponent,
      FooterComponent,
      TbUserListComponent,
      TbUserComponent,
      TbApplicationListComponent,
      TbApplicationComponent,
      TbObjectListComponent,
      TbObjectComponent,
      TbUsertypeListComponent,
      TbUsertypeComponent,
      TbPermissionListComponent,
      TbPermissionComponent,
      TbUsrAccessListComponent,
      TbUsrAccessComponent,
      TbUsersAppListComponent,
      TbUsersAppComponent,
      TbAppsObjListComponent,
      TbAppsObjComponent,
      TbUstypePermListComponent,
      TbUstypePermComponent,
      TbProfileListComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatToolbarModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatDividerModule,
      MatButtonModule,
      MatTooltipModule,
      MatTableModule,
      SweetAlert2Module.forRoot(),
      MatDialogModule,
      NgbModule,
      NgbTooltipModule,
      MatSelectModule,
    ],
    providers: [
      provideClientHydration(),
      provideAnimationsAsync()
    ],
    bootstrap: [
      AppComponent
    ]
  }
)

export class AppModule
{
  
}