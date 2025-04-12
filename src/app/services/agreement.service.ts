import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgreementService {
  private userAgreement = localStorage.getItem('userAgreement') === 'true';
  private userAgreementSubject = new BehaviorSubject<boolean>(
    this.userAgreement
  );

  userAgreement$ = this.userAgreementSubject.asObservable();

  /**
   * Set user agreement and persist in local storage.
   * @param value boolean value for user agreement.
   */
  setUserAgreement(value: boolean): void {
    localStorage.setItem('userAgreement', value.toString());
    this.userAgreementSubject.next(value);
  }

  getUserAgreement(): boolean {
    return this.userAgreementSubject.value;
  }
}
