import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NonAuthGuard } from './@core/guards/non-auth.guard';
import { AuthGuard } from './@core/guards/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers:[AuthGuard,NonAuthGuard],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Gradify';
}
