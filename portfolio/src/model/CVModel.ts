import { Entries, Media } from "./Includes";
import { Document } from '@contentful/rich-text-types';

export type CVProps = {
  cv: CV;
};
export interface CV {
  about: Entries<About>;
  work: Entries<Work>;
  education: Entries<Education>;
  skills: Entries<Skills>;
  projects: Entries<Project>;
}

export interface About {
  name:      string;
  label:     string;
  email:     string;
  phone:     string;
  website:   string;
  about:     Document;
  interests: Document;
  images:    Media[];
  profiles:  Profile[];
}

export interface Work {
  position:   string;
  company:    string;
  website:    string;
  startDate:  Date;
  endDate:    Date;
  highlights: string[];
  summary:    string;
  logo:       Media;
  images:     Media[];
}

export interface Education {
  institution: string;
  link:        string;
  area:        string;
  studyType:   string;
  startDate:   Date;
  endDate:     Date;
  grade:       string;
  summary:     Document;
  images:      Media[];
}

export interface Skills {
  summary: Document;
  list:    DevIcon[];
}

export interface Project {
  rank:    number;
  name:    string;
  link:    string;
  image:   Media;
  summary: Document;
  tags:    string[];
  icon:    DevIcon;
}

export interface Profile {
  url:   string;
  brand: DevIcon;
}

export interface DevIcon {
  name: string;
  icon: string;
}

