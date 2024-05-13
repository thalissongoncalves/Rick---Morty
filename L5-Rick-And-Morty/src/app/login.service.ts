import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import users from './users.json';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userTerm$: Observable<string> = this.userTermSubject.asObservable();
  private passwordTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  passwordTerm$: Observable<string> = this.passwordTermSubject.asObservable();
  private currentUser: string | null = null;
  private username: string = "";
  private password: string = "";

  constructor(private router: Router, private authService: AuthService) { }

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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.updateUserTerm("");
  }

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

  getCurrentUser(): string | null {
    return this.currentUser;
  }

  updateUserTerm(term: string): void {
    this.userTermSubject.next(term);
  }

  getUserTerm(): Observable<string> {
    return this.userTerm$;
  }

  updatePasswordTerm(term: string): void {
    this.passwordTermSubject.next(term);
  }

  getPasswordTerm(): Observable<string> {
    return this.passwordTerm$;
  }
}
