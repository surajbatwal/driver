import { Component } from '@angular/core';
import { FireService } from './fire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'driver';

  topics=['Raul','Juan','Bulmaro','Jesus','Jimmy','Ray','Valente','Freibel 1','Freibel 2','Alco'];
  
  
constructor(private fireService:FireService,
            private Fire:AngularFirestore,
            private _snackBar:MatSnackBar){}


            ngOnInit()
               {
                this.getfiredata();
                this.getselectedfiredata();
              
              }
Category="";
sample;
errorflag=false;

   fireadd()
    {
      console.log(this.Category)
      this.sample={

                "firstname":this.Category
                
                  }
      //Function to add data to fire store
              
      if(this.Category=="")
      {
        this.errorflag=true;

      }
      else
      {
      this.Fire.collection('User').add(this.sample);
      this.errorflag=false;
      
      this.openSnackBarsuccess();
      }
      this.Category="";  
    }
//function ends


     //snacknbar function for success

durationInSeconds = 2;
openSnackBarsuccess() 
{
  this._snackBar.open("Added Successfully!!", "", 
  {
    duration: this.durationInSeconds * 1000,
    panelClass: ['success-snackbar']
  });
}
//snacknbar function for success ends here






//getting record from firebase function
list:User[];


getfiredata()
{
this.fireService.getfiredata().subscribe(actionArray =>{
  this.list=actionArray.map(item=>{
    return{
      id: item.payload.doc.id,
      ...item.payload.doc.data()  as User
    }
    
  });
  
  console.log(this.list[0]);

})

}
//function ends here

selected:User[];

getselectedfiredata()
{
this.fireService.getsfiredata().subscribe(actionArray =>{
  this.selected=actionArray.map(item=>{
    return{
      id: item.payload.doc.id,
      ...item.payload.doc.data()  as User
    }
    
  });
  
  console.log(this.selected[0]);

})

}


}
