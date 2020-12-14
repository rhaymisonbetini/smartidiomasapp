import { Component, OnInit, NgZone } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { AlertProvider } from '../providers/alert';
import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';
import { LearnService } from '../services/learn.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public name: string;
  public avatar: string;
  public level: number;
  public score: number;

  //questions variables
  public questionId: number = 1;
  public lang: string = sessionStorage.getItem('lang');
  public language: string;
  public currntQuestion: string;
  public currentQuestionPoint: any;

  constructor(
    private tts: TextToSpeech,
    private speechRec: SpeechRecognition,
    private toastProvider: ToastProvider,
    private learnService: LearnService,
    private loadingProvider: LoadingProvider,
    private alertProvider: AlertProvider,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.name = sessionStorage.getItem('name');
    this.avatar = sessionStorage.getItem('avatar');
    this.level = parseInt(sessionStorage.getItem('level'));
    this.score = parseInt(sessionStorage.getItem('score'));

    setTimeout(() => {
      document.getElementById('main').classList.add('remove-opacity')
    }, 600)

    setTimeout(() => {
      document.getElementById('main2').classList.add('remove-opacity')

      this.speechRec.requestPermission().then((res: any) => {
        if (res == 'Denied') {
          this.toastProvider.erroToast('Você não podera usar nossa aplicação sem habilitar o recurso de  áudio')
        }
      })
    }, 1200)

  }

  ionViewWillEnter() {

    if (!sessionStorage.getItem('token') && !sessionStorage.getItem('name')) {
      return;
    } else {
      this.setTtsLang();
      this.findQuestions()
    }
  }


  findQuestions() {

    this.loadingProvider.loadingPresent('Buscando frase...')
    this.learnService.getQuestion(this.questionId, this.lang).subscribe((res: any) => {

      this.loadingProvider.loadingDismiss()
      this.questionId = res.id;
      this.currntQuestion = res.question;
      this.currentQuestionPoint = res.score_value;

    }, error => {
      alert(JSON.stringify(error));
      this.loadingProvider.loadingDismiss();
    })
  }

  setTtsLang() {
    if (this.lang == 'ENG') {

      this.language = 'en-US'

    } else if (this.language == 'ESP') {
      this.language = 'es-ES';

    } else if (this.language == 'FRAN') {
      this.language = 'fr-FR'
    }
  }

  hear() {
    this.tts.speak({
      text: this.currntQuestion,
      locale: this.language,
      rate: 0.95
    }).catch(error => {
      alert(JSON.stringify(error))
    })
  }

  speak() {

    let options = {
      language: this.language,
      matches: 1,
      showPopup: true,
      showPartial: true
    }

    this.speechRec.startListening(options).subscribe(matches => {
      let speaker = matches[0];

      let current = this.currntQuestion
        .replace(',', '')
        .replace('!', '')
        .replace('?', '')
        .replace('.', '').toLocaleLowerCase()

      if (speaker.toLocaleLowerCase() == current) {

        this.ngZone.run(() => {
          this.score = this.score + this.currentQuestionPoint;
          this.toastProvider.successToast('Parabéns! Você acertou!')
          this.findQuestions();
          this.updateUserPoints(this.currentQuestionPoint)
        })
      } else {
        this.toastProvider.erroToast('Ops! Você errou,tente novamente...')
      }

    })

  }

  updateUserPoints(points: any): void {

    let data = {
      user: sessionStorage.getItem('id'),
      points: points,
      type: this.language
    }

    this.learnService.updatePoints(data).subscribe((res: any) => {

      if (res !== 'UPDATED' && res.newLevel) {
        this.toastProvider.successToast('Você atingiu um novo level!')
        this.level = res.newLevel;
      }

    }, error => {
      JSON.stringify(error)
    })

  }

}
