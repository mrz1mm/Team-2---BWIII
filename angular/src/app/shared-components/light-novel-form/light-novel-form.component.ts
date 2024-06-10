import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-light-novel-form',
  templateUrl: './light-novel-form.component.html',
  styleUrl: './light-novel-form.component.scss'
})
export class LightNovelFormComponent {
  createLightNovelForm!: FormGroup;

  genreArr: string[] = [
  "Fantasy",
  "Sci-Fi",
  "Horror",
  "Mystery",
  "Adventure",
  "Romance",
  "Thriller",
  "Comedy",
  "Drama",
  "Historical Fiction",
  "Supernatural",
  "Dystopian",
  "Post-Apocalyptic",
  "Steampunk",
  "Cyberpunk",
  "Detective",
  "Crime",
  "Action",
  "Western",
  "Mythology",
  "Urban Fantasy",
  "Dark Fantasy",
  "Fairy Tale",
  "Epic",
  "Survival",
  "Espionage",
  "Military",
  "Political",
  "Psychological",
  "Noir"
]
  constructor(private fb: FormBuilder) { }
  ngOnit() {
    this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      plot: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      genre: this.fb.control(null, [Validators.required]),
      author: this.fb.control(null, [Validators.required]),
      image_url: this.fb.control(null, [Validators.required]),
      created_at: this.fb.control(null, [Validators.required]),
      story: this.fb.group({
        part1:this.fb.control(null, [Validators.required]),
        part2:this.fb.group({
          part2a: this.fb.control(null, [Validators.required]),
          part2b: this.fb.control(null, [Validators.required])
        }),
        part3: this.fb.group({
          part3a: this.fb.control(null, [Validators.required]),
          part3b: this.fb.control(null, [Validators.required]),
          part3c: this.fb.control(null, [Validators.required]),
          part3d: this.fb.control(null, [Validators.required]),
        })
      }),
    })
  }
}
