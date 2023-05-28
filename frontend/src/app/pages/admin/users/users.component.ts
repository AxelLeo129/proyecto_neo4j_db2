import {
  Component,
  OnInit
} from '@angular/core';
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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public actors: Array < any > = [];

  constructor(private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getActors();
  }

  getActors() {
    this.general_service.getAuth('user-list').then((res) => {
      this.actors = res.data;
      this.spinner.hide();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  edit(id: string) {
    this.router.navigate(['admin/user/' + id]);
  }

  destroy(id: string) {
    Swal.fire({
      title: '¡Atención!',
      text: '¿Está seguro de eliminar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.general_service.getAuth('delete-user/'+ id).then(() => {
          this.getActors();
          this.spinner.hide();
        });
      }
    })
  }

}
