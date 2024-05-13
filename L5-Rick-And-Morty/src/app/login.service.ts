import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Reserva o valor de username da página de login
  private userTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userTerm$: Observable<string> = this.userTermSubject.asObservable();
  // Reserva o valor de password da página de login
  private passwordTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  passwordTerm$: Observable<string> = this.passwordTermSubject.asObservable();
  // Reserva o valor de username da página de login para recuperar na aplicação
  private currentUser: string | null = null;
  // Reserva o valor de username da página de login para recuperar na aplicação
  private username: string = "";
  // Reserva o valor de password da página de login para recuperar na aplicação
  private password: string = "";

  constructor(private router: Router, private authService: AuthService) { }

  // Função para recuperar o username e password e guardar no localstorage e fazer a verificação se já existe uma conta cadastrada ou não.
  login(): void {
    this.userTerm$.pipe(
      tap((username) => {
        this.username = username;
      }),
    ).subscribe();
    this.passwordTerm$.pipe(
      tap((password) => {
        this.password = password;
      }),
    ).subscribe();

    const usersStorage = localStorage.getItem('users');

    if (usersStorage) {
      const users = JSON.parse(usersStorage) as { id: number, username: string, password: string }[];
      const existingUser = users.find((user) => user.username === this.username && user.password === this.password);

      if (existingUser) {
        this.authService.login();
        alert("Login feito com sucesso.");
        this.router.navigate(['/home']);
        this.updateUserTerm(this.username);
      } else {
        alert("Você não tem conta, favor cadastre-se.");
      }
    }

  }

  // função reservada para fazer o logout da conta na aplicação
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.updateUserTerm("");
  }

  // função reservada para fazer o cadastro, verificar se contém conta no localstorage e se não tiver realiza o cadastro para fazer o login
  register(): void {
    let newUser = { id: 0, username: '', password: '' };

    this.userTerm$.pipe(
      tap((username) => {
        newUser.username = username;
      }),
    ).subscribe();
    this.passwordTerm$.pipe(
      tap((password) => {
        newUser.password = password;
      }),
    ).subscribe();

    const usersStorage = localStorage.getItem('users');

    if (usersStorage) {
      const users = JSON.parse(usersStorage) as { id: number, username: string, password: string }[];
      newUser.id = users.length + 1;
      const existingUser = users.find((user) => user.username === newUser.username && user.password === newUser.password);

      if (existingUser) {
        alert("Você já tem uma conta registrada.");
      } else {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Conta registrada com sucesso!");
      }
      } else {
        const users = [newUser];
        localStorage.setItem('users', JSON.stringify(users));
        alert("Conta registrada com sucesso!");
      }
    
  }

  // função reservada para pegar o nome do usuário atual
  getCurrentUser(): string | null {
    return this.currentUser;
  }

  // função para atualizar a userTerm reservada para a username
  updateUserTerm(term: string): void {
    this.userTermSubject.next(term);
  }

  // função para pegar a userTerm reservada para username
  getUserTerm(): Observable<string> {
    return this.userTerm$;
  }

  // função para atualizar a passwordTerm reservada para a password
  updatePasswordTerm(term: string): void {
    this.passwordTermSubject.next(term);
  }

  // função para pegar a passwordTerm reservada para uspassword
  getPasswordTerm(): Observable<string> {
    return this.passwordTerm$;
  }
}
