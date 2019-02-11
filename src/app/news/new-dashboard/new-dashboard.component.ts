import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { NewService } from '../new.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.css']
})
export class NewDashboardComponent implements OnInit {

  title: string;
  image: string = null;
  content: string;

  buttonText: string = "Create New";

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private auth: AuthService, 
    private newService: NewService, 
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  createNew(){
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    }
    this.newService.create(data);
    
    //Form clean
    this.title = '';
    this.content = '';
    this.buttonText = 'New Created!';
    setTimeout(() => this.buttonText = "Create New", 3000);
  }

  uploadImage(event){
    const file = event.target.files[0];
    const path = `news/${file.name}`;
    if (file.type.split('/')[0] !== 'image'){
      return alert("Only image files");
    }else{
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL()
        this.downloadURL.subscribe(url => (this.image = url));
      })).subscribe();
    }
  }
}
