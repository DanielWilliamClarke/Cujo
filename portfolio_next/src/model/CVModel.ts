import { Document } from '@contentful/rich-text-types';

import { Entries, Entry, Media } from './Includes';

export type CVProps = {
  cv: CV;
};

export type CV = {
  about: Entry<About>;
  work: Entries<Work>;
  education: Entries<Education>;
  skills: Entry<Skills>;
  projects: Entries<Project>;
  readingList: Entries<Book>;
};

export type About = {
  name: string;
  label: string;
  email: string;
  phone: string;
  website: string;
  about: Document;
  interests: Document;
  images: Media[];
  profiles: Profile[];
};

export type Work = {
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
};

export type Education = {
  institution: string;
  link: string;
  area: string;
  studyType: string;
  startDate: Date;
  endDate: Date;
  grade: string;
  summary: Document;
  images: Media[];
};

export type Skills = {
  summary: Document;
  currentSummary: Document;
  current: Skill[];
  favoriteSummary: Document;
  favorite: Skill[];
  usedSummary: Document;
  used: Skill[];
};

export type Skill = {
  name: string;
  level: number;
  icon: DevIcon;
};

export type Project = {
  rank: number;
  name: string;
  link: string;
  image: Media;
  summary: Document;
  tags: string[];
  icon: DevIcon;
};

export enum BookProgress {
  PRIORITY = 'PRIORITY',
  NOT_STARTED = 'NOT_STARTED',
  READING = 'READING',
  COMPLETED = 'COMPLETED',
}

export type Book = {
  title: string;
  cover: Media;
  author: string;
  progress: BookProgress;
  amazonLink?: string;
};

export type Profile = {
  url: string;
  brand: DevIcon;
};

export type DevIcon = {
  name: string;
  icon: string;
  iconImage?: Media;
};
