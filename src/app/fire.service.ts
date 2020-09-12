import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  
  constructor(private fire:AngularFirestore) { }

  formData:User;
  getfiredata()
  {
   return   this.fire.collection('User').snapshotChanges();
  }

  getsfiredata()
  {
   return   this.fire.collection('Admin').snapshotChanges();
  }


}
