import { Component, OnInit } from '@angular/core';
import { type } from 'node:os';
import { bufferToggle } from 'rxjs/operators';

@Component({
  selector: 'footer-display',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  button1: boolean = false;
  button2: boolean = false;
  button3: boolean = false;
  button4: boolean = false;

  renderer: any;
  constructor() {}

  ngOnInit(): void {}
}
