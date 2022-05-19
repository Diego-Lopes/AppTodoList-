/* eslint-disable eqeqeq */
import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefas: any[] = [];

  constructor(
    private alertCrtl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCrtl: ActionSheetController
  ) {
    const tarefaSalva = localStorage.getItem('tarefaUsuario');

    if (tarefaSalva != null) {
      this.tarefas = JSON.parse(tarefaSalva);
    }
  }

  async showAdd() {
    const alert = await this.alertCrtl.create({
      cssClass: 'my-custom-class',
      header: 'O que você deseja fazer?',
      inputs: [
        {
          name: 'tarefa1',
          type: 'text',
          placeholder: 'Digite o que deseja fazer.',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado com sucesso!');
          },
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            this.adicionaTarefa(form.tarefa1);
          },
        },
      ],
    });
    await alert.present();
  }

  async adicionaTarefa(novaTarefa: string) {
    if (novaTarefa.trim().length < 1) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, digite a tarefa!',
        duration: 2000,
        position: 'top',
      });
      toast.present();
      return;
    }
    const tarefa = { nome: novaTarefa, realizada: false };
    this.tarefas.push(tarefa);

    this.salvaLocalStorage();
  }
  salvaLocalStorage() {
    localStorage.setItem('tarefaUsuario', JSON.stringify(this.tarefas));
  }

  async realizaAcoes(tarefa: any) {
    const actionSheet = await this.actionSheetCrtl.create({
      header: 'Qual ação realizar?',
      buttons: [
        {
          text: tarefa.realizada ? 'Desmarcar' : 'Marcar',
          icon: tarefa.realizada
            ? 'checkmark-circle'
            : 'radio-button-off-outline',
          handler: () => {
            tarefa.realizada = !tarefa.realizada;
            this.salvaLocalStorage();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
  }

  excluirTarefa(tarefa: any) {
    this.tarefas = this.tarefas.filter((arrayTarefa) => tarefa != arrayTarefa);

    this.salvaLocalStorage();
  }
}
