import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/']">
        <img
          src="./assets/images/logos/main-logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,styles: [
    `
      .logo {
        width: 10px !important; /* 🔥 Dimensiune fixă, ajustabilă */
        height: auto; /* 🔥 Păstrează proporțiile */
        max-width: 100%; /* 🔥 Se adaptează containerului */
      }
    
    .branding {
      padding: 20px 20px 0px 20px; 
    }`,
  ],
})
export class BrandingComponent {
  constructor() {}
}
