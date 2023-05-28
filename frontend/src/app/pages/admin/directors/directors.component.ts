import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.scss']
})
export class DirectorsComponent implements OnInit {

  public actors: Array<any> = [];

  constructor(private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getActors();
  }

  getActors() {
    this.general_service.getAuth('director').then((res) => {
      this.actors = res.data;
      this.spinner.hide();
    });
  }

  edit(id: string) {
    this.router.navigate(['admin/director/' + id]);
  }

  create(){
    this.router.navigate(['admin/director']);
  }

}
