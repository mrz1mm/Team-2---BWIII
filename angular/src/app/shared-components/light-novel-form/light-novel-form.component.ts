import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LightNovelService } from '../../services/light-novel.service';

@Component({
  selector: 'app-light-novel-form',
  templateUrl: './light-novel-form.component.html',
  styleUrls: ['./light-novel-form.component.scss'],
})
export class LightNovelFormComponent implements OnInit {
  createLightNovelForm!: FormGroup;

  genreArr: string[] = [
    'Fantasy',
    'Sci-Fi',
    'Horror',
    'Mystery',
    'Adventure',
    'Romance',
    'Thriller',
    'Comedy',
    'Drama',
    'Historical Fiction',
    'Supernatural',
    'Dystopian',
    'Post-Apocalyptic',
    'Steampunk',
    'Cyberpunk',
    'Detective',
    'Crime',
    'Action',
    'Western',
    'Mythology',
    'Urban Fantasy',
    'Dark Fantasy',
    'Fairy Tale',
    'Epic',
    'Survival',
    'Espionage',
    'Military',
    'Political',
    'Psychological',
    'Noir',
  ];

  constructor(private fb: FormBuilder, private lightNovelSvc: LightNovelService) {}

  ngOnInit(): void {
    this.createLightNovelForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      plot: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      genre: this.fb.array(this.genreArr.map(() => this.fb.control(false))),
      author: this.fb.control(null, [Validators.required]),
      image_url: this.fb.control(null, [Validators.required]),
      created_at: this.fb.control(null, [Validators.required]),
      story: this.fb.group({
        part1: this.fb.control(null, [Validators.required]),
        part2: this.fb.group({
          part2a: this.fb.control(null, [Validators.required]),
          part2b: this.fb.control(null, [Validators.required]),
        }),
        part3: this.fb.group({
          part3a: this.fb.control(null, [Validators.required]),
          part3b: this.fb.control(null, [Validators.required]),
          part3c: this.fb.control(null, [Validators.required]),
          part3d: this.fb.control(null, [Validators.required]),
        }),
      }),
    });
  }

  get genreControls() {
    return (this.createLightNovelForm.get('genre') as FormArray).controls;
  }
  isTouchedInvalid(fieldName:string){
    const field = this.createLightNovelForm.get(fieldName);//Cerco il campo
    return field?.invalid && field?.touched//Verifico se il campo è valido e se è stato anche toccato
  }


  addLightNovel() {
    this.lightNovelSvc.addLightNovel(this.createLightNovelForm.value).subscribe((data) => {
      console.log(data);
    });
  }
}
