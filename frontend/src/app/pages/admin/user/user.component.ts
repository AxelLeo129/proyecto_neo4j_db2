import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public actor_form: FormGroup;
  public id: string = '';
  public title: string = 'Crear';
  private pattern : any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private route: ActivatedRoute, private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) {
    this.actor_form = this.createFormGroup();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.id) {
      this.editFormGroup();
      this.title = 'Editar'
    }
  }

  editFormGroup() {
    this.general_service.getAuth('user/' + this.id).then((res) => {
      this.actor_form.patchValue({ nombre: res.data.nombre, email: res.data.email, password: 1, password_confirmation: 1, tipo: res.data.tipo == 'admin' ? true : false });
    });
  }

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
      tipo: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.spinner.show();
    if (this.id) {
      const objU = { ...this.actor_form.value, tipo: this.actor_form.value.tipo == true ? 'admin' : 'client', id: this.id};
      this.general_service
        .putAuth('user', objU)
        .then((res) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/users']);
            }
          });
        })
        .catch((err) => {
          this.spinner.hide();
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: '¡Atención!',
            showCancelButton: false,
            text: 'Por favor, inténtelo más tarde.',
            confirmButtonText: 'Aceptar',
          });
        });
    } else {
      const objP = { ...this.actor_form.value, tipo: this.actor_form.value.tipo == true ? 'admin' : 'client' };
      this.general_service
        .postAuth('user', objP)
        .then((res) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/users']);
            }
          });
        })
        .catch((err) => {
          this.spinner.hide();
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: '¡Atención!',
            showCancelButton: false,
            text: 'Por favor, inténtelo más tarde.',
            confirmButtonText: 'Aceptar',
          });
        });
    }
  }

  get nombre() {
    return this.actor_form.get('nombre');
  }

  get tipo() {
    return this.actor_form.get('tipo');
  }

  get email() {
    return this.actor_form.get('email');
  }

  get password() {
    return this.actor_form.get('password');
  }

  get password_confirmation() {
    return this.actor_form.get('password_confirmation');
  }  

}

