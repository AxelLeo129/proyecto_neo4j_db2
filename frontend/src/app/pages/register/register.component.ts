import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public register_form: FormGroup;
  private pattern : any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) {
    this.register_form = this.createFormGroup();
  }

  ngOnInit(): void { }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      nombre: new FormControl('', [Validators.required]),
      tipo_suscripcion: new FormControl('', [Validators.required]),
    });
  }

  formatDate(date: Date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return (
      date.getFullYear() +
      '/' +
      (month.toString().length == 1 ? '0' + month : month) +
      '/' +
      (day.toString().length == 1 ? '0' + day : day)
    );
  }

  register() {
    this.spinner.show();
    let fecha_caducidad = new Date();
    fecha_caducidad.setMonth(new Date().getMonth() + 1);
    const data = Object.assign(this.register_form.value, {
      tipo: 'client',
      fecha_inicio: this.formatDate(new Date()),
      fecha_caducidad: this.formatDate(fecha_caducidad),
    });
    this.general_service.post('register', data).then((res) => {
      this.spinner.hide();
      Swal.fire({
        icon: 'success',
        title: res.message,
        confirmButtonText: 'Aceptar'
      }).then(result => {
        if(result.isConfirmed) {
          localStorage.setItem('token', res.access_token);
          this.router.navigate(['/profiles']);
        }
      })
    }).catch((err) => {
      this.spinner.hide();
      console.log(err);
      let errores = "";
      err.error.errors.forEach((element: string) => {
        errores += element + " ";
      });
      Swal.fire({
        icon: 'error',
        title: '¡Atención!',
        showCancelButton: false,
        text: errores,
        confirmButtonText: 'Aceptar'
      });
    });
  }

  get email() {
    return this.register_form.get('email');
  }
  get password() {
    return this.register_form.get('password');
  }
  get password_confirmation() {
    return this.register_form.get('password_confirmation');
  }
  get nombre() {
    return this.register_form.get('nombre');
  }
  get tipo_suscripcion() {
    return this.register_form.get('tipo_suscripcion');
  }
}
