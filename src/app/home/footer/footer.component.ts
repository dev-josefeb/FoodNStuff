import { Component } from '@angular/core';

@Component({
  selector: 'footer-display',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  button1: boolean = false;
  button2: boolean = false;
  button3: boolean = false;
  button4: boolean = false;

  constructor() {}
}
