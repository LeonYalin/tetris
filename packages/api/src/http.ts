import { HttpMethod } from './enums/HttpMethod';

export function httpRequest<T>(url: string, method: HttpMethod, data?: T) {
  return fetch(url, { headers: { 'Content-type': 'application/json;charset=UTF-8' }, method, body: JSON.stringify(data) });
}

export function httpGet<T>(url: string) {
  return httpRequest<T>(url, HttpMethod.GET);
}

export function httpPost<T>(url: string, data: T) {
  return httpRequest(url, HttpMethod.POST, data);
}
