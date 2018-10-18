import { Registro } from './../../model/registro.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the DadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DadosProvider {


  private host = "http://orlandoburli.ngrok.io/";

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello DadosProvider Provider');
  }

  public obterDados(): Observable<Registro[]> {
    return this.http.get<Registro[]>(this.host + '/dados/v1/all');
  }

  public obterDadosAposId(id: number): Observable<Registro[]> {
    return this.http.get<Registro[]>(this.host + '/dados/v1/after/' + id);
  }

  public salvarTodos(todos: Registro[]) {
    this.storage.get('dados')
      .then((dados) => {
        console.log('Adicionando ' + todos.length + ' registros...');
        console.log('Quantidade de registros anteriores: ' + dados.length);
        todos.forEach((r) => dados.push(r));

        console.log('Quantidade de registros ao final: ' + dados.length);

        this.storage.set('dados', dados);
      })
      .catch(() => {
        this.storage.set('dados', todos);
      });
  }

  public salvar(r: Registro) {
    this.storage.get('dados')
      .then((dados) => {
        dados.push(r);

        this.storage.set('dados', dados);
      })
      .catch(() => {
        this.storage.set('dados', [r]);
      });
  }

  public obterDadosOffline() {
    return this.storage.get('dados');
  }

  public limparDadosOffline() {
    this.storage.remove('dados');
  }

  public atualizar(): Promise<any> {
    let p: Promise<any> = new Promise((resolve, reject) => {
      this.obterDadosOffline()
        .then((dados) => {
          let registros: Registro[] = dados;

          let ultimo = registros.sort((a, b) => b.id - a.id)[0];

          this.obterDadosAposId(ultimo.id).subscribe((novosDados) => {
            this.salvarTodos(novosDados);

            resolve();

          });
        })
        .catch(() => this.obterDados().subscribe((novosDados) => {
          this.salvarTodos(novosDados);

          resolve();
        }));
    });
    return p;
  }

}
