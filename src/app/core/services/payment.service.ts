import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseDTO } from '@auth/models/auth.model';
import {
  InitializePaymentDTO,
  PlanRequestDTO,
} from '@core/models/payment.model';
import { ResponseModel } from '@core/models/response.model';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpService) {}

  public confirmPayment(): Observable<ResponseModel<any>> {
    const endpoint = `Payment/check-payment`;
    return this.http.getRequest(endpoint);
  }

  public verifyPayment(
    referenceNumber: string
  ): Observable<ResponseModel<any>> {
    const endpoint = `Payment/Verify/${referenceNumber}`;
    return this.http.makeRequestWithData('post', endpoint, {}, referenceNumber);
  }

  public getUserPayment(): Observable<ResponseModel<any>> {
    const endpoint = `Payment/user`;
    return this.http.getRequest(endpoint);
  }
  public makePayment(
    paymentPayload: PaymentDTO
  ): Observable<ResponseModel<any>> {
    const endpoint = `Payment`;
    return this.http.makeRequestWithData('post', endpoint, {}, paymentPayload);
  }
  public updatePayment(
    paymentPayload: PaymentDTO
  ): Observable<ResponseModel<any>> {
    const endpoint = `Payment`;
    return this.http.makeRequestWithData('put', endpoint, {}, paymentPayload);
  }
  public getPlans(): Observable<ResponseModel<PlanRequestDTO[]>> {
    const endpoint = 'Plan';
    return this.http.getRequest(endpoint);
  }

  public getPlanById(id: string): Observable<ResponseModel<LoginResponseDTO>> {
    const endpoint = `Plan/${id}`;
    return this.http.getRequest(endpoint);
  }

  public addPlan(
    planRequestDTO: PlanRequestDTO
  ): Observable<ResponseModel<string>> {
    const endpoint = 'Plan';
    return this.http.makeRequestWithData('post', endpoint, {}, planRequestDTO);
  }

  public updatePlan(
    planRequestDTO: PlanRequestDTO
  ): Observable<ResponseModel<string>> {
    const params = new HttpParams().set('id', planRequestDTO.id);
    const endpoint = 'Plan';
    return this.http.makeRequestWithData(
      'put',
      endpoint,
      params,
      planRequestDTO
    );
  }

  public deletePlan(id: string): Observable<ResponseModel<string>> {
    const params = new HttpParams().set('id', id);
    const endpoint = 'Account/register';
    return this.http.makeRequestWithData('delete', endpoint, params, {});
  }

  // Payment
  public Initialize(
    initializePaymentDTO: InitializePaymentDTO
  ): Observable<ResponseModel<string>> {
    const endpoint = 'Payment/initialize';
    return this.http.makeRequestWithData(
      'post',
      endpoint,
      {},
      initializePaymentDTO
    );
  }

  public verify(referenceNo: string): Observable<ResponseModel<string>> {
    // const params = new HttpParams().set('referenceNo', referenceNo);
    const endpoint = `Payment/Verify/${referenceNo}`;
    return this.http.makeRequestWithData('post', endpoint, {}, {});
  }

  public paystackResponse(): void {}
}

interface PaymentDTO {
  referenceNo: string;
  amount: number;
  paymentFileName: string;
  paymentFileExt: string;
  paymentFileBinary: string;
}
