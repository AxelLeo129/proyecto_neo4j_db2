import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.scss']
})
export class FavsComponent implements OnInit {

  public actors: Array<any> = [];

  constructor(private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getActors();
  }

  getActors() {
    this.general_service.getAuth('la-capital/' + localStorage.getItem('profile')).then((res) => {
      this.actors = res.data;
      this.spinner.hide();
    });
  }

  goTo(id: number) {
    this.router.navigate(['/movie-serie/' + id]);
  }

}