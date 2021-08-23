export interface Location {
  city: string;
  countryCode: string;
  region: string;
}

export interface Profile {
  url: string;
  brand: DevIcon;
}

export interface Basics {
  name: string;
  label: string;
  images: string[];
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
  logo: string;
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
  images: string[];
  link: string;
}

export interface DevIcon {
  icon: string;
  name: string
}

export interface Skills {
  summary: string;
  list: DevIcon[]
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Project {
  name: string;
  link: string;
  image: string;
  summary: string;
  icon: DevIcon;
}

export interface Interests {
  summary: string;
  list: string[];
}

export interface CV {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skills;
  languages: Language[];
  interests: Interests;
  projects: Project[];
}

export type CVProps = {
  cv: CV;
};