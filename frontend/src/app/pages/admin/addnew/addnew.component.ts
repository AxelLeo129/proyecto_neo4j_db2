import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.scss']
})
export class AddnewComponent implements OnInit {

  public actor_form: FormGroup;
  public id: string = '';
  public title: string = 'Crear';
  public directors: Array<any> = [];


  constructor(private route: ActivatedRoute, private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) {
    this.actor_form = this.createFormGroup();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getDirectors();
    
  }

  editFormGroup() {
    this.general_service.getAuth('film/' + this.id).then((res) => {
      this.actor_form.patchValue({ 
        nombre: res.data.nombre, 
        descripcion: res.data.descripcion,
        id_director: res.data.id_director,
        duracion: res.data.duracion,
        link_video: res.data.link_video,
        fecha_estreno: res.data.fecha_estreno,
        tipo: res.data.tipo 
      });
    });
  }

  getDirectors(){
    this.general_service.getAuth('director').then((res) => {
      this.directors = res.data;
      this.spinner.hide();
    });
    if (this.id) {
      this.editFormGroup();
      this.title = 'Editar'
      
    }
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      duracion: new FormControl('', [Validators.required]),
      link_video: new FormControl('', [Validators.required]),
      id_director: new FormControl('', [Validators.required]),
      fecha_estreno: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.spinner.show();
    console.log(this.actor_form.value)
    if (this.id) {
      this.general_service
        .putAuth('film/' + this.id, this.actor_form.value)
        .then((res) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/films']);
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
        .postAuth('film', this.actor_form.value)
        .then((res) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/films']);
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

  get duracion() {
    return this.actor_form.get('duracion');
  }
  get descripcion() {
    return this.actor_form.get('descripcion');
  }
  get link_video() {
    return this.actor_form.get('link_video');
  }
  get id_director() {
    return this.actor_form.get('id_director');
  }
  get fecha_estreno() {
    return this.actor_form.get('fecha_estreno');
  }
  get tipo() {
    return this.actor_form.get('tipo');
  }
}

