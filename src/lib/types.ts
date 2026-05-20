import { type SkillCategory } from "./resume";

export interface Resume {
  fullName: string;
  title: string;
  summary: string;
  skills: Record<SkillCategory, string[]>;
  experience: OrgEntry[];
}

export interface Position {
  title: string;
  dateRange: string;
  description?: string;
  responsibilities: string[];
}

export interface OrgEntry {
  company: string;
  location: string;
  positions: Position[];
}

export type ContactLink = {
  href: string;
  icon: string;
  text: string;
  external?: boolean;
};
