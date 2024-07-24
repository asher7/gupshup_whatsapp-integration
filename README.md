# Gupshup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## GupshupService
The GupshupService Angular service facilitates interaction with Gupshup's API to send WhatsApp template messages, including images.

## Installation
Clone the repository:

git clone https://github.com/your/repository.git

## Navigate to the project directory:
cd your-project-directory

## Install dependencies:
npm install

## Usage
Import GupshupService
Import GupshupService into your Angular component or service where you want to use it.

## code
import { Component } from '@angular/core';
import { GupshupService } from './path/to/gupshup.service'; // Update path accordingly

@Component({
  selector: 'app-your-component',
  template: `
    <button (click)="sendMessage()">Send Image Message</button>
  `
})
export class YourComponent {

  constructor(private gupshupService: GupshupService) { }

  sendMessage() {
    const source = '919163xxxxx3'; // Replace with your source WhatsApp number
    const destination = '917839xxxxx3'; // Replace with your destination WhatsApp number
    const appName = 'DemoApp'; // Replace with your app name
    const templateId = 'template_id'; // Replace with your template ID
    const templateParams = ['hi', 'hello']; // Replace with your template parameters
    const imageUrl = 'https://images1-fabric.practo.com/practices/675874/hegde-hospital-hyderabad-624d348a6ce99.jpg'; // Replace with your image URL

    this.gupshupService.sendImageMessage(source, destination, appName, templateId, templateParams, imageUrl)
      .subscribe(response => {
        console.log('Message sent successfully:', response);
        // Handle success
      }, error => {
        console.error('Error sending message:', error);
        // Handle error
      });
  }
}
GupshupService Implementation
The GupshupService allows sending template messages via Gupshup's API. It includes methods to send messages with images directly using image URLs.

## typescript

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GupshupService {

  private apiUrl = 'https://api.gupshup.io/wa/api/v1/template/msg';
  private apiKey = 'rw4bpko3e7a8nwtwludp2nqivdsebxtc'; // Replace with your actual API key

  constructor(private http: HttpClient) { }

  /**
   * Sends an image message via Gupshup's API.
   * @param source Sender WhatsApp number.
   * @param destination Receiver WhatsApp number.
   * @param appName App name that the source number belongs to.
   * @param templateId ID of the approved template.
   * @param templateParams List of template parameters.
   * @param imageUrl URL of the image media.
   * @returns Observable<any> Observable containing the API response.
   */
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

## Configuration
Ensure you have replaced placeholders (source, destination, apiKey, etc.) with your actual values before running the application.

## Dependencies
Angular HttpClient: Used to perform HTTP requests.
rxjs: Reactive Extensions library for handling asynchronous operations.

## API Key: Keep your Gupshup API key (apiKey) secure and do not expose it publicly.

## Template ID: Replace templateId with the ID of your approved template from Gupshup's dashboard.

