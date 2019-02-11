import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { New } from '../new';
import { NewService } from '../new.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  news: Observable<New[]>

  constructor(private newService: NewService, public auth: AuthService) { }

  ngOnInit() {
    this.news = this.newService.getNews();
  }

  delete(id: string){
    this.newService.delete(id);
  }
}
