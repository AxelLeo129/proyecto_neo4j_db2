import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss']
})
export class AnuncioComponent implements OnInit {

  public actor_form: FormGroup;
  public id: string = '';
  public title: string = 'Crear';

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
    this.general_service.getAuth('anuncio/' + this.id).then((res) => {
      this.actor_form.patchValue({ 
        nombre: res.data.nombre,
        descripcion: res.data.descripcion,
        imagen: res.data.imagen,
        background: res.data.background
      });
    });
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      background: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.spinner.show();
    if (this.id) {
      this.general_service
        .putAuth('anuncio/' + this.id, this.actor_form.value)
        .then((res) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/anuncios']);
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
      this.general_service
        .postAuth('anuncio', this.actor_form.value)
        .then((res) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/anuncios']);
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

  get descripcion(){
    return this.actor_form.get('descripcion');
  }

  get image(){
    return this.actor_form.get('image');
  }

  get background(){
    return this.actor_form.get('background');
  }

}
