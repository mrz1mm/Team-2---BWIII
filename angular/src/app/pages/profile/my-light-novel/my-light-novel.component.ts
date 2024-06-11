import { Component } from '@angular/core';

@Component({
  selector: 'app-my-light-novel',
  templateUrl: './my-light-novel.component.html',
  styleUrl: './my-light-novel.component.scss'
})
<<<<<<< HEAD
export class MyLightNovelComponent {

=======
export class MyLightNovelComponent implements OnInit {
 novels!:iLightNovel[];

constructor(private lightNovelService:LightNovelService,private authSvc:AuthService){}

 ngOnInit(){
  const userId:number|null= this.authSvc.getCurrentUserId();
  if(userId){
   this.lightNovelService.getNovelsByUserId(userId).subscribe((novels)=>{
    this.novels=novels;
   });
  }
 }
>>>>>>> parent of 33477201 (Merge branch 'main' of https://github.com/mrz1mm/Team-2---BWIII)
}
