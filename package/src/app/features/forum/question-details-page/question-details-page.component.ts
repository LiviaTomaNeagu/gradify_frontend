import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-details-page',
  standalone: true,
  imports: [],
  templateUrl: './question-details-page.component.html'
})
export class QuestionDetailsPageComponent {
  orderId:string='';

  constructor(private activeRoute:ActivatedRoute){
    this.orderId = this.activeRoute.snapshot.params['id'];
    console.log(this.orderId) 
  }
}
