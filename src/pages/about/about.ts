import { DadosProvider } from './../../providers/dados/dados';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dadosProvider: DadosProvider) {
  }

  ionViewDidLoad() {

  }

  limparDados() {
    this.dadosProvider.limparDadosOffline()
  }
}
