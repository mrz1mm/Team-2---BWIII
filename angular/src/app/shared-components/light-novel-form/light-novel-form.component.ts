import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LightNovelService } from '../../services/light-novel.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../auth/interfaces/i-user';

@Component({
  selector: 'app-light-novel-form',
  templateUrl: './light-novel-form.component.html',
  styleUrls: ['./light-novel-form.component.scss'],
})
export class LightNovelFormComponent implements OnInit {
  [x: string]: any;
  createLightNovelForm!: FormGroup;

  user: iUser | null = this.autSVC.getCurrentUser();

  alertMessage: string | null = null;
  alertTimeout: any;
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
    private lightNovelSvc: LightNovelService,
    private router: Router,
    private autSVC: AuthService
  ) {}

  ngOnInit(): void {
    this.createLightNovelForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      plot: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      genre: this.fb.array(this.genreArr.map(() => this.fb.control(false))),
      author: this.fb.control(null, [Validators.required]),
      image_url: this.fb.control(null, [Validators.required]),
      story: this.fb.group({
        part1: this.fb.control(null, [Validators.required]),
        firstChoice: this.fb.group({
          choice1: this.fb.control(null, [Validators.required]),
          choice2: this.fb.control(null, [Validators.required]),
        }),
        part2: this.fb.group({
          part2a: this.fb.control(null, [Validators.required]),
          part2b: this.fb.control(null, [Validators.required]),
        }),
        secondChoice: this.fb.group({
          secondChoice1: this.fb.control(null, [Validators.required]),
          secondChoice2: this.fb.control(null, [Validators.required]),
          secondChoice3: this.fb.control(null, [Validators.required]),
          secondChoice4: this.fb.control(null, [Validators.required]),
        }),
        part3: this.fb.group({
          part3a: this.fb.control(null, [Validators.required]),
          part3b: this.fb.control(null, [Validators.required]),
          part3c: this.fb.control(null, [Validators.required]),
          part3d: this.fb.control(null, [Validators.required]),
        }),
      }),
    });

    this.autSVC.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
      }
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
    // Mappatura dei caratteri accentati
    const accentMap: { [key: string]: string } = {
      à: 'a',
      á: 'a',
      â: 'a',
      ã: 'a',
      ä: 'a',
      å: 'a',
      è: 'e',
      é: 'e',
      ê: 'e',
      ë: 'e',
      ì: 'i',
      í: 'i',
      î: 'i',
      ï: 'i',
      ò: 'o',
      ó: 'o',
      ô: 'o',
      õ: 'o',
      ö: 'o',
      ø: 'o',
      ù: 'u',
      ú: 'u',
      û: 'u',
      ü: 'u',
      ñ: 'n',
      ç: 'c',
      À: 'A',
      Á: 'A',
      Â: 'A',
      Ã: 'A',
      Ä: 'A',
      Å: 'A',
      È: 'E',
      É: 'E',
      Ê: 'E',
      Ë: 'E',
      Ì: 'I',
      Í: 'I',
      Î: 'I',
      Ï: 'I',
      Ò: 'O',
      Ó: 'O',
      Ô: 'O',
      Õ: 'O',
      Ö: 'O',
      Ø: 'O',
      Ù: 'U',
      Ú: 'U',
      Û: 'U',
      Ü: 'U',
      Ñ: 'N',
      Ç: 'C',
    };

    // Sostituzione dei caratteri accentati
    str = str
      .split('')
      .map((char) => accentMap[char] || char)
      .join('');

    // Rimozione degli spazi iniziali e finali
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space

    // Conversione in minuscolo
    str = str.toLowerCase(); // convert string to lowercase

    // Sostituzione dei caratteri non alfanumerici, spazi e trattini multipli
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
      update_by: this.user?.id,
    };

    this.lightNovelSvc.addLightNovel(newLightNovel).subscribe((data) => {
      console.log(data);
    });
    alert('Light Novel creata');
    this.cleanForum();
    this.redirectToHome();
  }

  cleanForum() {
    this.createLightNovelForm = this.fb.group({
      title: [''],
      plot: [''],
      description: [''],
      genre: this.fb.array(this.genreArr.map(() => this.fb.control(false))),
      author: [''],
      image_url: [''],
      created_at: [''],
      story: this.fb.group({
        part1: [''],
        firstChoice: this.fb.group({
          choice1: [''],
          choice2: [''],
        }),
        part2: this.fb.group({
          part2a: [''],
          part2b: [''],
        }),
        secondChoice: this.fb.group({
          secondChoice1: [''],
          secondChoice2: [''],
          secondChoice3: [''],
          secondChoice4: [''],
        }),
        part3: this.fb.group({
          part3a: [''],
          part3b: [''],
          part3c: [''],
          part3d: [''],
        }),
      }),
    });
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }



}
