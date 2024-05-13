import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userTerm: string = "";
  passwordTerm: string = "";

  @ViewChild('userInput') userInput: ElementRef | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;
  
  constructor(private loginService: LoginService) {}

  // serve para atualizar o valor global de username e password e chamar a função de login no loginService
  onLogin(): void {
    this.updateUserTerm();
    this.updatePasswordTerm();
    this.loginService.login();
  }

  // serve para atualizar o valor global de username e password e chamar a função de register no loginService
  onRegister(): void {
    this.updateUserTerm();
    this.updatePasswordTerm();
    this.loginService.register();
  }

  // serve para atualizar o valor global de username baseado no valor passado do html para o componente aqui
  updateUserTerm() {
    this.loginService.updateUserTerm(this.userTerm);
  }

  // serve para atualizar o valor global de password baseado no valor passado do html para o componente aqui
  updatePasswordTerm() {
    this.loginService.updatePasswordTerm(this.passwordTerm);
  }
}
