export interface LawSection {
  num: string;
  title: string;
  summary: string;
  punishment?: string;
  example?: string;
  tags?: string[];
}

export interface LawChapter {
  id: string;
  chapter: string;
  chapterHi: string;
  color: string;
  sections: LawSection[];
}
