import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GupshupService {

   private apiUrl = 'https://api.gupshup.io/wa/api/v1/template/msg';
  // private apiUrl = 'https://partner.gupshup.io/partner/app/ff4255a5-a219-4918-a92f-403d113acab6/template/msg';
  private appId = 'ff4255a5-a219-4918-a92f-403d113acab6';
  private apiKey = 'rw4bpko3e7a8nwtwludp2nqivdsebxtc';
  

  constructor(private http: HttpClient) { }

  sendImageMessage(source: string, destination: string, appName: string, templateId: string, templateParams: string[], imageUrl: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('apikey', this.apiKey);

    const body = new URLSearchParams();
    body.set('channel', 'whatsapp');
    body.set('source', source);
    body.set('destination', destination);
    body.set('src.name', appName);
    body.set('template', JSON.stringify({ id: templateId, params: templateParams }));
    body.set('message', JSON.stringify({
      type: 'image',
      image: {
        link: imageUrl
      }
    }));

    return this.http.post<any>(this.apiUrl, body.toString(), { headers });
  }
}
