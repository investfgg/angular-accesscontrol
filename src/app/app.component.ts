import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component(
{
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
} )

export class AppComponent
{
  title = 'angular-accesscontrol';

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
        Swal.fire( 'Hi!', 'We have been informed', 'error' );
      }
  }
}