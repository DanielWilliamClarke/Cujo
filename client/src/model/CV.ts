export interface Location {
  city: string;
  countryCode: string;
  region: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  label: string;
  picture: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Work {
  company: string;
  position: string;
  website: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  images: string[];
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  grade: string;
  summary: string;
  courses: string[];
  images: string[];
}

export interface Skills {
  programming: string[];
  frameworks: string[];
  tools: string[];
  software: string[];
  devtools: string[];
}

export interface Language {
  language: string;
  fluency: string;
}

export interface CV {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skills;
  languages: Language[];
  interests: string[];
}


export type CVProps = {
  cv: CV;
};