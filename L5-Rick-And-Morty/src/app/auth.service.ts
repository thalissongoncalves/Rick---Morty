import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor() { }

  // Troca o isAuthenticated para true para simular o user logado
  login() {
    this.isAuthenticated = true;
  }

  // Troca o isAuthenticated para false para simular o user deslogado
  logout() {
    this.isAuthenticated = false;
  }

  // Pega o valor do isAuthenticated para verificar se está logado ou deslogado
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
