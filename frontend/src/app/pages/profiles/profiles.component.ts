import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  public profiles: Array<any> = [];

  constructor(
    private general_service: GeneralService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getProfiles();
  }

  getProfiles() {
      const profilesString: any = localStorage.getItem('profiles');
      this.profiles = JSON.parse(profilesString);
      this.spinner.hide();
  }

  editProfile(id: number) {
    this.router.navigate(['/edit-create-profile/' + id]);
  }

  deleteProfile(id: number) {
    Swal.fire({
      icon: 'question',
      title: "¿Está seguro de eliminar esta aplicación?",
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.general_service.deleteAuth('delete-profile/' + id + "/" + localStorage.getItem('user_id'))
        .then((res) => {
          localStorage.setItem('profiles', JSON.stringify(res));
          this.getProfiles();
        });
      }
    });
  }

  selectProfile(id: string) {
    localStorage.setItem('profile', id);
    this.router.navigate(['/home']);
  }
}
