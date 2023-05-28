import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  public query1: Array<any> = [];
  public bitacora: Array<any> = [];

  constructor(private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getBitacora();
  }

  getBitacora() {
    this.general_service.getAuth('bitacora').then((res) => {
      console.log(res);
      this.bitacora = res.data;
      this.spinner.hide();
    })
  }

  getQuery1() {
      let fecha_incial = (<HTMLInputElement>document.getElementById("fecha_inicio_tabla1")).value;
      let cantidad = (<HTMLInputElement>document.getElementById("cantidad")).value;
      if(cantidad && fecha_incial){
        console.log(cantidad + fecha_incial)
        this.general_service.getAuth(`simulacion/${fecha_incial}/${cantidad}`).then((res) => {
          console.log(res)
        });
      }else{
        console.log("No se ingreso alguna fecha")
      }
  }
  
  sendQ1() {
    this.getQuery1();
  }

}
