import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { New } from './new';
import { map } from 'rxjs/operators';

@Injectable()
export class NewService {
  newsCollection: AngularFirestoreCollection<New>
  newDoc: AngularFirestoreDocument<New>

  constructor(private afs: AngularFirestore) {
    this.newsCollection = this.afs.collection('news', ref =>
    ref.orderBy('published', 'desc'))
  }

  getNews(){
    return this.newsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as New
        const id = a.payload.doc.id
        return { id, ...data }
      })
    }))
  }

  getNewData(id: string){
    this.newDoc = this.afs.doc<New>(`news/${id}`);
    return this.newDoc.valueChanges();
  }

  create(data: New){
    this.newsCollection.add(data);
  }

  getNew(id: string){
    return this.afs.doc<New>(`news/${id}`);
  }

  delete(id: string){
    return this.getNew(id).delete();
  }

  update(id: string, formData){
    return this.getNew(id).update(formData);
  }
}



