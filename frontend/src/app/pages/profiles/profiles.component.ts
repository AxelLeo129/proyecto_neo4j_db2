import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  public profiles: Array<any> = [];
  public subscription: any;

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
    this.general_service.getAuth('user-profiles').then((res) => {
      this.profiles = res.profiles;
      this.subscription = res.subscription;
      this.spinner.hide();
    });
  }

  editProfile(id: number) {
    this.router.navigate(['/edit-create-profile/' + id]);
  }

  selectProfile(id: string) {
    localStorage.setItem('profile', id);
    this.router.navigate(['/home']);
  }
}
