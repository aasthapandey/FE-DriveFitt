export interface ContactUs {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: Date;
  updated_at: Date;
}

export interface FranchiseInquiry {
  id: number;
  business_name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  location?: string;
  city?: string;
  state?: string;
  investment_capacity?: number;
  experience_years?: number;
  business_background?: string;
  why_franchise?: string;
  status: number;
  notes?: string;
  assigned_to?: number;
  created_at: Date;
  updated_at: Date;
}

export interface ContactUsFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface FranchiseFormData {
  business_name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  location?: string;
  city?: string;
  state?: string;
  investment_capacity?: number;
  experience_years?: number;
  business_background?: string;
  why_franchise?: string;
}

export enum JobType {
  FULL_TIME = 1,
  PART_TIME = 2,
  CONTRACTOR = 3,
}

export enum JobStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  CLOSED = 2,
  DELETED = 3,
}

export enum ApplicationStatus {
  NEW = 0,
  IN_REVIEW = 1,
  REJECTED = 2,
  SHORTLISTED = 3,
}

export interface Department {
  id: number;
  name: string;
  title?: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface Location {
  id: number;
  full_location: string;
  city?: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface JobPosting {
  id: number;
  title: string;
  department_id: number;
  location_id: number;
  job_type: JobType;
  application_deadline?: Date;
  job_description?: string;
  skills_required?: string;
  role: string[];
  qualifications: string[];
  status: JobStatus;
  years_of_experience?: string;
  is_visible: boolean;
  created_at: Date;
  updated_at: Date;
  department?: Department;
  location?: Location;
}

export interface Application {
  id: number;
  candidate_name: string;
  email: string;
  phone?: string;
  job_id: number;
  status: ApplicationStatus;
  resume?: Buffer;
  created_at: Date;
  updated_at: Date;
  job?: {
    id: number;
    title: string;
    department?: {
      id: number;
      name: string;
    };
  };
}

export interface JobPostingFormData {
  title: string;
  department_id: number;
  location_id: number;
  job_type: JobType;
  application_deadline?: string;
  job_description?: string;
  skills_required?: string;
  role: string[];
  qualifications: string[];
  years_of_experience?: string;
  is_visible?: boolean;
}

export interface ApplicationFormData {
  candidate_name: string;
  email: string;
  phone?: string;
  job_id: number;
  resume?: File;
}

export interface JobPostingUpdateData {
  title?: string;
  department_id?: number;
  location_id?: number;
  job_type?: JobType;
  application_deadline?: string;
  job_description?: string;
  skills_required?: string;
  role?: string[];
  qualifications?: string[];
  status?: JobStatus;
  years_of_experience?: string;
  is_visible?: boolean;
}

export interface ApplicationUpdateData {
  candidate_name?: string;
  email?: string;
  phone?: string;
  status?: ApplicationStatus;
}
