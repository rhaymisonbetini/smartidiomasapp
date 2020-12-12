import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginform: FormGroup

  constructor(
    private navController: NavController,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      lang: ['', Validators.required]
    })
  }


  login() {

    this.loadingProvider.loadingPresent('Realizando o login')

    this.loginService.login(this.loginform.getRawValue()).subscribe((res: any) => {


      sessionStorage.setItem('name', res.nome);
      sessionStorage.setItem('email', res.email);
      sessionStorage.setItem('avatar', res.avatar);
      sessionStorage.setItem('id', res.id);
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('level', res.level);
      sessionStorage.setItem('score', res.total_score);
      sessionStorage.setItem('lang', this.loginform.get('lang').value);
      this.loadingProvider.loadingDismiss()
      this.navController.navigateRoot('');

    }, error => {

      console.log(error)
      this.loadingProvider.loadingDismiss()

      if (error.status == 404) {
        this.toastProvider.erroToast('Usuário não encontrado');
        return;
      }

      if (error.status == 401) {
        this.toastProvider.erroToast('Usuário ou senha inválidos')
        return;
      }

      if (error.status == 500) {
        this.toastProvider.erroToast('Ops erro interno, por favor tente novamente')
      }

    })
  }

}
