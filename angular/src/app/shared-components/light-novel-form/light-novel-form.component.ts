import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-light-novel-form',
  templateUrl: './light-novel-form.component.html',
  styleUrl: './light-novel-form.component.scss'
})
export class LightNovelFormComponent {
  createLightNovelForm!: FormGroup;

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
