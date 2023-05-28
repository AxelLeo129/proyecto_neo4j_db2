import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GeneralService } from '../services/general.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private router: Router, private general_service: GeneralService) {}
  async canActivate() {
    const auth = localStorage.getItem('token');
    if(auth) {
      //const type = await this.general_service.getAuth('verify-type');
      // if(type.data == 'client')
      //   return true;
      // else {
      //   this.router.navigate(['admin/users']); 
      //   return false; 
      // }
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
