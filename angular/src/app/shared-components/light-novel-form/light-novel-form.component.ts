import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LightNovelService } from '../../services/light-novel.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../auth/interfaces/i-user';
import { iLightNovel } from '../../interfaces/i-light-novel';

@Component({
  selector: 'app-light-novel-form',
  templateUrl: './light-novel-form.component.html',
  styleUrls: ['./light-novel-form.component.scss'],
})
export class LightNovelFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private lightNovelSvc: LightNovelService,
    private router: Router,
    private autSVC: AuthService
  ) {}

  ngOnInit(): void {
    this.autSVC.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });

    this.formValidator();
    this.ripopulateForm();
    this.formCompiledVerify();

    console.log('Novel', this.novel);
  }

  [x: string]: any;
  @Input() novel: iLightNovel | undefined;
  createLightNovelForm!: FormGroup;
  user: iUser | null = this.autSVC.getCurrentUser();
  formCompiled: boolean = false;

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

  formValidator() {
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
          part2A: this.fb.control(null, [Validators.required]),
          part2B: this.fb.control(null, [Validators.required]),
        }),
        secondChoice: this.fb.group({
          choice1: this.fb.control(null, [Validators.required]),
          choice2: this.fb.control(null, [Validators.required]),
          choice3: this.fb.control(null, [Validators.required]),
          choice4: this.fb.control(null, [Validators.required]),
        }),
        part3: this.fb.group({
          part3A: this.fb.control(null, [Validators.required]),
          part3B: this.fb.control(null, [Validators.required]),
          part3C: this.fb.control(null, [Validators.required]),
          part3D: this.fb.control(null, [Validators.required]),
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
      updated_by: this.user?.id,
      id: this.novel?.id,
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
          part2A: [''],
          part2B: [''],
        }),
        secondChoice: this.fb.group({
          choice1: [''],
          choice2: [''],
          choice3: [''],
          choice4: [''],
        }),
        part3: this.fb.group({
          part3A: [''],
          part3B: [''],
          part3C: [''],
          part3D: [''],
        }),
      }),
    });
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  ripopulateForm(): void {
    this.createLightNovelForm = this.fb.group({
      title: [this.novel?.title],
      plot: [this.novel?.plot],
      description: [this.novel?.description],
      genre: this.fb.array(
        this.genreArr.map((genre) => this.novel?.genre.includes(genre))
      ),
      author: [this.novel?.author],
      image_url: [this.novel?.image_url],
      created_at: [this.novel?.created_at],
      story: this.fb.group({
        part1: [this.novel?.story.part1],
        firstChoice: this.fb.group({
          choice1: [this.novel?.story.firstChoice.choice1],
          choice2: [this.novel?.story.firstChoice.choice2]
        }),
        part2: this.fb.group({
          part2A: [this.novel?.story.part2.part2A],
          part2B: [this.novel?.story.part2.part2B]
        }),
        secondChoice: this.fb.group({
          choice1: [this.novel?.story.secondChoice.choice1],
          choice2: [this.novel?.story.secondChoice.choice2],
          choice3: [this.novel?.story.secondChoice.choice3],
          choice4: [this.novel?.story.secondChoice.choice4]
        }),
        part3: this.fb.group({
          part3A: [this.novel?.story.part3.part3A],
          part3B: [this.novel?.story.part3.part3B],
          part3C: [this.novel?.story.part3.part3C],
          part3D: [this.novel?.story.part3.part3D],
        }),
      }),
    });
  }

  updateLightNovel() {
    const formValue = this.createLightNovelForm.value;
    const selectedGenres = this.genreArr.filter((_, i) => formValue.genre[i]);

    const LightNovel = {
      ...formValue,
      genre: selectedGenres,
      created_at: this.getTodaysDate(),
      slug: this.slugify(formValue.title),
      updated_by: this.user?.id,
      id: this.novel?.id,
    };

    this.lightNovelSvc.updateLightNovel(LightNovel).subscribe(() => {
      alert('Light Novel aggiornata');
      this.cleanForum();
      this.redirectToHome();
    });
  }

  formCompiledVerify() {
    if (this.createLightNovelForm.dirty) {
      this.formCompiled = true;
    }
  }
}
