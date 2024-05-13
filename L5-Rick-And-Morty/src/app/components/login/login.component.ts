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

  onLogin(): void {
    this.updateUserTerm();
    this.updatePasswordTerm();
    this.loginService.login();
  }

  onRegister(): void {
    this.updateUserTerm();
    this.updatePasswordTerm();
    this.loginService.register();
  }

  updateUserTerm() {
    this.loginService.updateUserTerm(this.userTerm);
  }

  updatePasswordTerm() {
    this.loginService.updatePasswordTerm(this.passwordTerm);
  }
}
