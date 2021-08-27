import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mf-login',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mf-login';
  email: String = '';
  psw: String = '';
  ngOnInit(): void {}
  

  ingresar() {
    console.log(`Ingresar Email: ${this.email} - psw: ${this.psw}`);
  }
}
