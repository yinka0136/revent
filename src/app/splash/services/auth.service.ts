import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '@core/models/response.model';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import {
  ChangePasswordDTO,
  confirmEmailDTO,
  ForgotPassswordDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  ResetPasswordDTO,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}
  public login(
    loginRequestDTO: LoginRequestDTO
  ): Observable<ResponseModel<LoginResponseDTO>> {
    const endpoint = 'Account/authenticate';
    return this.http.makeRequestWithData('post', endpoint, {}, loginRequestDTO);
  }

  public register(
    registerRequestDTO: RegisterRequestDTO
  ): Observable<ResponseModel<string>> {
    const endpoint = 'Account/register';
    return this.http.makeRequestWithData(
      'post',
      endpoint,
      {},
      registerRequestDTO
    );
  }

  public forgotPassword(
    forgotRequestDTO: ForgotPassswordDTO
  ): Observable<ResponseModel<LoginResponseDTO>> {
    const endpoint = 'Account/forgot-password';
    return this.http.makeRequestWithData(
      'post',
      endpoint,
      {},
      forgotRequestDTO
    );
  }

  public resetPassword(
    resetRequestDTO: ResetPasswordDTO
  ): Observable<ResponseModel<LoginResponseDTO>> {
    const endpoint = 'Account/reset-password';
    return this.http.makeRequestWithData('post', endpoint, {}, resetRequestDTO);
  }

  public changePassword(
    changeRequestDTO: ChangePasswordDTO
  ): Observable<ResponseModel<any>> {
    const endpoint = 'Account/change-password';
    return this.http.makeRequestWithData('post', endpoint, {}, changeRequestDTO);
  }

  public confirmEmail(
    confirmEmailDTO: confirmEmailDTO
  ): Observable<ResponseModel<LoginResponseDTO>> {
    const params = new HttpParams()
      .set('userId', confirmEmailDTO.userId)
      .set('code', confirmEmailDTO.code);
    const endpoint = 'Account/confirm-email';
    return this.http.getRequestWithParams(endpoint, params);
  }

  public resendVerificationLink(
    email: string
  ): Observable<ResponseModel<string>> {
    const params = new HttpParams().set('email', email);
    const endpoint = 'Account/re-verify';
    return this.http.getRequestWithParams(endpoint, params);
  }
  public refreshToken(
    token: string
  ): Observable<ResponseModel<LoginResponseDTO>> {
    const params = new HttpParams();
    params.set('token', token);
    const endpoint = 'Account/refresh-tokan';
    return this.http.makeRequestWithData('post', endpoint, params, {});
  }
  public getUserProfile(token?: string) {
    const endpoint = 'internalauth/details';
    return this.http.getRequest(endpoint);
  }

  public getDashboard(): Observable<ResponseModel<any>> {
    const endpoint = 'Dashboard/api-call-summary';
    return this.http.getRequest(endpoint);
  }

  public getAccessKey() {
    const endpoint = 'AccessKey';
    return this.http.getRequest(endpoint);
  }
}
