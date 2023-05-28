import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  public actors: Array<any> = [];

  constructor(private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getActors();
  }

  getActors() {
    this.general_service.getAuth('anuncio').then((res) => {
      this.actors = res.data;
      this.spinner.hide();
    });
  }

  edit(id: string) {
    this.router.navigate(['admin/anuncio/' + id]);
  }

  create(){
    this.router.navigate(['admin/anuncio']);
  }
}
