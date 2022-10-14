import { Entries, Entry, Media } from "./Includes";
import { Document } from "@contentful/rich-text-types";

export type CVProps = {
  cv: CV;
};

export interface CV {
  about: Entry<About>;
  work: Entries<Work>;
  education: Entries<Education>;
  skills: Entry<Skills>;
  projects: Entries<Project>;
  readingList: Entries<Book>;
}

export interface About {
  name: string;
  label: string;
  email: string;
  phone: string;
  website: string;
  about: Document;
  interests: Document;
  images: Media[];
  profiles: Profile[];
}

export interface Work {
  position: string;
  company: string;
  website: string;
  startDate: Date;
  endDate: Date;
  highlights: string[];
  summary: Document;
  logo: Media;
  images: Media[];
  hideFromCv: boolean;
}

export interface Education {
  institution: string;
  link: string;
  area: string;
  studyType: string;
  startDate: Date;
  endDate: Date;
  grade: string;
  summary: Document;
  images: Media[];
}

export interface Skills {
  summary: Document;
  currentSummary: Document;
  current: Skill[];
  favoriteSummary: Document;
  favorite: Skill[];
  usedSummary: Document;
  used: Skill[];
}

export interface Skill {
  name: string;
  level: number;
  icon: DevIcon;
}

export interface Project {
  rank: number;
  name: string;
  link: string;
  image: Media;
  summary: Document;
  tags: string[];
  icon: DevIcon;
}

export enum BookProgress {
  PRIORITY = 'PRIORITY',
  NOT_STARTED = 'NOT_STARTED',
  READING = 'READING',
  COMPLETED = 'COMPLETED'
}

export interface Book {
  title: string;
  cover: Media;
  author: string;
  progress: BookProgress,
  amazonLink?: string 
}

export interface Profile {
  url: string;
  brand: DevIcon;
}

export interface DevIcon {
  name: string;
  icon: string;
  iconImage?: Media;
}
