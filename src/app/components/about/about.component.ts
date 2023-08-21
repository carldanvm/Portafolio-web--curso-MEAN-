import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  public title: string;
  public subtitle: string;
  public email: string;
  
  constructor(){
    this.title = "Carlos Vieira";
    this.subtitle = "Desarrollador Web";
    this.email = "dv60682@gmail.com"

  }

}
