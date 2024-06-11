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

  constructor(
    private fb: FormBuilder,
    private lightNovelSvc: LightNovelService
  ) {}

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
  isTouchedInvalid(fieldName: string) {
    const field = this.createLightNovelForm.get(fieldName); //Cerco il campo
    return field?.invalid && field?.touched; //Verifico se il campo è valido e se è stato anche toccato
  }

  getTodaysDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  slugify(str: string): string {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
  }

  addLightNovel() {
    const formValue = this.createLightNovelForm.value;
    const selectedGenres = this.genreArr.filter((_, i) => formValue.genre[i]);

    const newLightNovel = {
      ...formValue,
      genre: selectedGenres,
      created_at: this.getTodaysDate(),
      slug: this.slugify(formValue.title),
    };

    this.lightNovelSvc.addLightNovel(newLightNovel).subscribe((data) => {
      console.log(data);
    });
  }
}
