import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../services/general.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private general_service: GeneralService) {}
  async canActivate() {
    const auth = localStorage.getItem('token');
    if(auth) {
      const type = await this.general_service.getAuth('verify-type');
      if(type.data == 'admin')
        return true;
      else {
        this.router.navigate(['profiles']); 
        return false; 
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
