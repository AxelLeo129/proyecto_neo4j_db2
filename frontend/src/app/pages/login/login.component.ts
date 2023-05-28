import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  NgxSpinnerService
} from 'ngx-spinner';
import {
  GeneralService
} from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login_form: FormGroup;

  constructor(private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) {
    this.login_form = this.createFormGroup();
  }

  ngOnInit(): void {}

  createFormGroup() {
    return new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  login() {
    this.spinner.show();
    const data = Object.assign(this.login_form.value, {
      veces: localStorage.getItem('veces') ? parseInt(localStorage.getItem('veces') !) : 0
    });
    this.general_service.post('login', data).then(res => {
      localStorage.setItem('veces', '0');
      localStorage.setItem('token', res.access_token);
      this.spinner.hide();
      this.router.navigate(['/profiles']);
    }).catch(err => {
      this.spinner.hide();
      let veces: string = localStorage.getItem('veces') ? localStorage.getItem('veces') ! : '0';
      localStorage.setItem('veces', JSON.stringify((parseInt(veces) + 1)));
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: '¡Atención!',
        showCancelButton: false,
        text: 'Credenciales Inválidas',
        confirmButtonText: 'Aceptar'
      });
    });
  }

  get email() {
    return this.login_form.get('email');
  }
  get password() {
    return this.login_form.get('password');
  }

}
