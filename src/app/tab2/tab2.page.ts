import { Component, OnInit } from '@angular/core';
import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public ranking: any = [];

  constructor(
    private rakingService: RankingService,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getRanking();
  }


  getRanking() {
    this.loadingProvider.loadingPresent('Carregando ranking...')

    this.rakingService.raking().subscribe((res: any) => {

      this.loadingProvider.loadingDismiss()
      this.ranking = res;

    }, error => {
      this.loadingProvider.loadingDismiss();
      this.toastProvider.erroToast('Ops ocorre um erro com sua solicitação');
    })

  }

}
