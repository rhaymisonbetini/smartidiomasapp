import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ToastProvider } from '../providers/toast';
import { AlertProvider } from '../providers/alert';
import { LoadingProvider } from '../providers/loading';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  providers:[
    SpeechRecognition,
    TextToSpeech,
    ToastProvider,
    AlertProvider,
    LoadingProvider
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
