import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-calc',
  templateUrl: 'calc.html'
  
})
export class CalcPage {
  public juros: any;
  public isAbs: boolean;
  public prestacao: any;
  public meses: any;
  public results: any;
  public historico: Array<any>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
   this.historico = [];
  }

  public onJurosChange(value): void{
    this.isAbs = false;
  }

  public calculoPrestacao(): void {
    if(this.meses == 0 || this.meses == undefined){
      let alert = this.alertCtrl.create({
        title: 'Campo em Branco',
        subTitle: 'Preencha o número de Parcelas',
        buttons: ['OK']
      });
      alert.present();
    }
      else if(this.juros == 0 || this.juros == undefined){
        let alert = this.alertCtrl.create({
          title: 'Campo em Branco',
          subTitle: 'Preencha o valor dos Juros',
          buttons: ['OK']
        });
        alert.present();

      }
      else if(this.prestacao == 0 || this.prestacao == undefined){
        let alert = this.alertCtrl.create({
          title: 'Campo em Branco',
          subTitle: 'Preencha o valor da Prestação',
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        this.meses = Number(this.meses); 
        this.juros = Number(this.juros);
        this.prestacao = Number(this.prestacao);  
        if(this.isAbs == false){
          this.juros = this.juros/100;
          this.isAbs = true;
        }
        this.results = (( 1- (1  + this.juros )** -this.meses) / this.juros) * this.prestacao;
        this.results = this.results.toFixed(3);
        if(this.historico.length >= 2*4){
          this.historico = this.historico.splice(4);
        }
        this.historico.push(this.meses);
        this.historico.push(this.juros);
        this.historico.push(this.prestacao);
        this.historico.push(this.results);
      }

  }

  public reset() {
    this.meses = ''; 
    this.juros = '';
    this.prestacao = '' ;
    this.results = ''; 
    this.isAbs = false;
   
  }
  public histreset() {
    this.historico = [];
  }
}
