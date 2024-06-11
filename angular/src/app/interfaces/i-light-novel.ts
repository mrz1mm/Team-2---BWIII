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
    part2: {
      part2a: string;
      part2b: string;
    };
    part3: {
      part3a: string;
      part3b: string;
      part3c: string;
      part3d: string;
    };
  };
}
