import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public query1: Array<any> = [];
  public query2: Array<any> = [];
  public query3: Array<any> = [];
  public query3_2: Array<any> = [];
  public query4 : Array<any> = [];
  public query5: Array<any> = [];
  public actors: Array<any> = [];
  public newQuery1: Array<any> = [];
  public newQuery2: Array<any> = [];
  public newQuery4: Array<any> = [];


  constructor(private general_service: GeneralService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getQuery3();
    this.getQuery3_1();
    this.getQuery4();
    this.getNewQuery2();
  }

  getQuery1() {
      let fecha_incial = (<HTMLInputElement>document.getElementById("fecha_inicio_tabla1")).value;
      let fecha_final = (<HTMLInputElement>document.getElementById("fecha_final_tabla1")).value;
      if(fecha_final && fecha_incial){
        this.general_service.getAuth(`top-10-categories/${fecha_incial}/${fecha_final}`).then((res) => {
        this.query1 = res.data["top10"];
        this.spinner.hide();
        });
      }else{
        console.log("No se ingreso alguna fecha")
      }
  }
  getQuery2() {
    let fecha_incial = (<HTMLInputElement>document.getElementById("fecha_inicio_tabla2")).value;
    let fecha_final = (<HTMLInputElement>document.getElementById("fecha_final_tabla2")).value;
    if(fecha_final && fecha_incial){
        this.general_service.getAuth(`reprod-por-cat/${fecha_incial}/${fecha_final}`).then((res) => {
        this.query2 = res.data["repPorCat"];
        this.spinner.hide();
      });
    }else{
      console.log("No se ingreso alguna fecha")
    }
  }
  getQuery3() {
    this.general_service.getAuth('top-10-actors-directors').then((res) => {
      this.query3 = res.data["top10Actors"];
      this.spinner.hide();
    });
  }
  getQuery3_1() {
    this.general_service.getAuth('top-10-actors-directors').then((res) => {
      this.query3_2 = res.data["top10Directors"];
      this.spinner.hide();
    });
  }
  getQuery4() {
    this.general_service.getAuth('created-account-6-months').then((res) => {
      this.query4 = res.data["Cantidad de cuentas avanzadas creadas en los ultimos 6 meses"];
      this.spinner.hide();
    });
  }
  getQuery5() {
    let fecha = (<HTMLInputElement>document.getElementById("fecha_tabla5")).value;
    if(fecha){
      this.general_service.getAuth(`hora-pico-por-fecha/${fecha}`).then((res) => {
        this.query5 = res.data[`Hora pico para la fecha ${fecha}`];
        this.spinner.hide();
      });
    }else{
      console.log("No se ingreso alguna fecha")
    }
  }
  getNewQuery1(){
    this.spinner.show();
    let mes = (<HTMLInputElement>document.getElementById("fecha_tabla_entrega2_1")).value;
    console.log()
    if(mes){
      this.general_service.getAuth(`top-5-content-per-month/2022/${mes}`).then((res) => {
        this.newQuery1 = res.data["top5ContentPerMonth"];
        this.spinner.hide();
    });
    }else{
      console.log("No se ingreso ningun mes")
    }

  }
  getNewQuery2(){
    this.general_service.getAuth('top-10-busquedas').then((res) => {
      this.newQuery2 = res.data["top10Busquedas"];
      this.spinner.hide();
    });
  }
  getNewQuery4() {
    let fecha_incial = (<HTMLInputElement>document.getElementById("fecha_inicio_tabla_new_q4_1")).value;
    let fecha_final = (<HTMLInputElement>document.getElementById("fecha_inicio_tabla_new_q4_2")).value;
    if(fecha_final && fecha_incial){
        this.general_service.getAuth(`top-20-left-behind-content/${fecha_incial}/${fecha_final}`).then((res) => {
        this.newQuery4 = res.data["top20LeftBehindContent"];
        this.spinner.hide();
      });
    }else{
      console.log("No se ingreso alguna fecha")
    }
  }
  sendQ1() {
    this.getQuery1();
  }
  sendQ2() {
    this.getQuery2();
  }
  sendQ5(){
    this.getQuery5();
  }
  sendNewQuery1(){
    this.getNewQuery1();
  }
  sendNewQuery4(){
    this.getNewQuery4();
  }
  edit(id: string) {
    this.router.navigate(['admin/director/' + id]);
  }

  create(){
    this.router.navigate(['admin/director']);
  }

}
