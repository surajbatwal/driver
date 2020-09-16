import { Component } from '@angular/core';
import { FireService } from './fire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './user.model';
import { getLocaleDateFormat } from '@angular/common';

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
today;



   fireadd()
    {
      this.today=Date();
      
      this.sample={

                "firstname":this.Category,
                "timestamp":this.today
                
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
      
      this.playAudio();
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
i;
j;
temp:User;

getfiredata()
{
  

this.fireService.getfiredata().subscribe(actionArray =>{
  this.list=actionArray.map(item=>{
    return{
      id: item.payload.doc.id,
      ...item.payload.doc.data()  as User
    }
    
  });

  //console.log(this.list);
 

  //sorting list

  for(this.i=0;this.i<this.list.length;this.i++)
  {
    for(this.j=this.i+1;this.j<this.list.length;this.j++)
    {
      if(this.list[this.i].timestamp > this.list[this.j].timestamp)
      {
       // this.temp=this.list[this.i];
        this.temp=this.list[this.i];
        this.list[this.i]=this.list[this.j];
        this.list[this.j]=this.temp;
      }
    }
  }
//console.log(this.list);


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
  
  

})

}


//alerts sound function


playAudio(){
  let audio = new Audio();
  audio.src = "./assets/audio3.mp3";
  audio.load();
  audio.play();
  this.openSnackBarsuccess();
}




}
