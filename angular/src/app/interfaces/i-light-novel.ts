export interface iLightNovel {
  id: number;
  userId: number;
  slug: string;
  title: string;
  plot: string;
  description: string;
  genre: string[];
  author: string;
  image_url: string;
  created_at: string;
  story: {
    part1: string;
    firstChoice: {
      choice1: string;
      choice2: string;
    };
    part2: {
      part2A: string;
      part2B: string;
    };
    secondChoice: {
      choice1: string;
      choice2: string;
      choice3: string;
      choice4: string;
    };
    part3: {
      part3A: string;
      part3B: string;
      part3C: string;
      part3D: string;
    };
  };
}
