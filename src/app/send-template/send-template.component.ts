import { Component } from '@angular/core';
import { GupshupService } from '../gupshup.service';


@Component({
  selector: 'app-send-template',
  templateUrl: './send-template.component.html',
  styleUrls: ['./send-template.component.css']
})
export class SendTemplateComponent {
  source: string = '919000133696'; // Replace with your registered WhatsApp Business API phone number
  destination: string = '919493070882'; // Replace with actual user's phone number in E.164 format
  templateId: string = 'f7c6fcd4-1573-4c46-825a-c130f02bb6a8'; // Replace with your template ID
  params: string[] = ['Prasanthi', '27-09-2023', 'FFFFFS']; // Replace with actual parameters

  constructor(private gupshupService: GupshupService) {}

  sendMessage(): void {
    const appName = 'DemoApp'; // Replace with your app name
    const imageUrl = 'https://images1-fabric.practo.com/practices/675874/hegde-hospital-hyderabad-624d348a6ce99.jpg'; // Replace with your image URL

    this.gupshupService.sendImageMessage(this.source, this.destination, appName, this.templateId, this.params, imageUrl)
      .subscribe(response => {
        console.log('Message sent successfully:', response);
        // Handle success
      }, error => {
        console.error('Error sending message:', error);
        // Handle error
      });
  }
}