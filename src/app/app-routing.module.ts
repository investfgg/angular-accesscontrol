import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { TbUserComponent } from './tbuser/form/tbuser.component';
import { TbUserListComponent } from './tbuser/list/tbuser-list.component';

import { TbApplicationComponent } from './tbapplication/form/tbapplication.component';
import { TbApplicationListComponent } from './tbapplication/list/tbapplication-list.component';

import { TbObjectComponent } from './tbobject/form/tbobject.component';
import { TbObjectListComponent } from './tbobject/list/tbobject-list.component';

import { TbUsertypeComponent } from './tbusertype/form/tbusertype.component';
import { TbUsertypeListComponent } from './tbusertype/list/tbusertype-list.component';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'user-list', component: TbUserListComponent }, // TBUser Page (List)
  { path: 'user', component: TbUserComponent }, // TBUser Page (Form)
  { path: 'application-list', component: TbApplicationListComponent }, // TBApplication Page (List)
  { path: 'application', component: TbApplicationComponent }, // TBApplication Page (Form)
  { path: 'object-list', component: TbObjectListComponent }, // TBObject Page (List)
  { path: 'object', component: TbObjectComponent }, // TBObject Page (Form)
  { path: 'usertype-list', component: TbUsertypeListComponent }, // TBUserType Page (List)
  { path: 'usertype', component: TbUsertypeComponent }, // TBUserType Page (Form)
  { path: 'permission-list', component: TbPermissionListComponent }, // TBPermission Page (List)
  { path: 'permission', component: TbPermissionComponent }, // TBPermission Page (Form)
  { path: 'usraccess-list', component: TbUsrAccessListComponent }, // TBUsrAccess Page (List)
  { path: 'usraccess', component: TbUsrAccessComponent }, // TBUsrAccess Page (Form)
  { path: 'usersapp-list', component: TbUsersAppListComponent }, // TBUsersApps Page (List)
  { path: 'usersapp', component: TbUsersAppComponent }, // TBUsersApps Page (Form)
  { path: 'appsobj-list', component: TbAppsObjListComponent }, // TBAppsObjs Page (List)
  { path: 'appsobj', component: TbAppsObjComponent }, // TBAppsObjs Page (Form)
  { path: 'ustypesperm-list', component: TbUstypePermListComponent }, // TBUstypesPerms Page (List)
  { path: 'ustypesperm', component: TbUstypePermComponent }, // TBUstypesPerms Page (List)
  { path: 'profile-list', component: TbProfileListComponent }, // TBProfiles Page (List)
];

@NgModule(
  {
    imports: [RouterModule.forRoot( routes )],
    exports: [RouterModule]
  }
)

export class AppRoutingModule
{
  
}