import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewService } from '../new.service';
import { AuthService } from '../../core/auth.service';
import { New } from '../new';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.css']
})
export class NewDetailComponent implements OnInit {

  new: New;
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService, 
    private newService: NewService
  ) { }

  ngOnInit() {
    this.getNew();
    console.log(this);
  }

  getNew(){
    const id = this.route.snapshot.paramMap.get('id');
    return this.newService.getNewData(id).subscribe(data => this.new = data);
  }

  updateNew(){
    const formData={
      title: this.new.title,
      content: this.new.content
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.newService.update(id, formData);
    this.editing = false;
  }

  delete(){
    const id = this.route.snapshot.paramMap.get('id');
    this.newService.delete(id);
    this.router.navigate(["/home"])
  }

}
