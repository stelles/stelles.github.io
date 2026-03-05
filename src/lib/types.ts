import { type SkillCategory } from "./resume";

export interface Resume {
  fullName: string;
  title: string;
  summary: string;
  skills: Record<SkillCategory, string[]>;
  experience: JobEntry[];
}

export interface JobEntry {
  title: string;
  dateRange: string;
  company: string;
  location: string;
  description?: string;
  responsibilities: string[];
}
export type ContactLink = {
  href: string;
  icon: string;
  text: string;
  external?: boolean;
};
