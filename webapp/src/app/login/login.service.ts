import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Account } from '../account.model';
// import { Account } from 'app/core/auth/account.model';
// import { AccountService } from 'app/core/auth/account.service';
// import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { Login } from './login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    // private accountService: AccountService,
    // private authServerProvider: AuthServerProvider,
  ) {}

  login(credentials: Login): Observable<Account | null> {
    // return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
    return of(null)
  }

  logout(): void {
    // this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
