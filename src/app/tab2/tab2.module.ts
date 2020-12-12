import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';
import { RankingService } from '../services/ranking.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  providers:[
    LoadingProvider,
    ToastProvider,
    RankingService
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
