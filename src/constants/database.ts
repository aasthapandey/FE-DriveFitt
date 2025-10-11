// Database status enums and constants
export const JOB_STATUS = {
  ACTIVE: 1,
  CLOSED: 2,
  DELETED: 3,
} as const;

export const APPLICATION_STATUS = {
  NEW: 0,
  SHORTLISTED: 1,
  IN_REVIEW: 2,
  REJECTED: 3,
} as const;

export const JOB_TYPE = {
  FULL_TIME: 1,
  PART_TIME: 2,
  CONTRACTOR: 3,
} as const;

export const DEPARTMENT_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
} as const;

export const LOCATION_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
} as const;

// Status labels for UI display
export const JOB_STATUS_LABELS = {
  [JOB_STATUS.ACTIVE]: "Active",
  [JOB_STATUS.CLOSED]: "Closed",
  [JOB_STATUS.DELETED]: "Deleted",
} as const;

export const APPLICATION_STATUS_LABELS = {
  [APPLICATION_STATUS.NEW]: "New",
  [APPLICATION_STATUS.SHORTLISTED]: "Shortlisted",
  [APPLICATION_STATUS.IN_REVIEW]: "In Review",
  [APPLICATION_STATUS.REJECTED]: "Rejected",
} as const;

export const JOB_TYPE_LABELS = {
  [JOB_TYPE.FULL_TIME]: "Full-time",
  [JOB_TYPE.PART_TIME]: "Part-time",
  [JOB_TYPE.CONTRACTOR]: "Contractor",
} as const;

// Status colors for UI
export const JOB_STATUS_COLORS = {
  [JOB_STATUS.ACTIVE]: "#00DBDC",
  [JOB_STATUS.CLOSED]: "#BFBFBF",
  [JOB_STATUS.DELETED]: "#FF6B6B",
} as const;

export const APPLICATION_STATUS_COLORS = {
  [APPLICATION_STATUS.NEW]: "#00DBDC",
  [APPLICATION_STATUS.SHORTLISTED]: "#0BFFB6",
  [APPLICATION_STATUS.IN_REVIEW]: "#BFBFBF",
  [APPLICATION_STATUS.REJECTED]: "#FF6B6B",
} as const;

// Type definitions for better type safety
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export type ApplicationStatus =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];
export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
export type DepartmentStatus =
  (typeof DEPARTMENT_STATUS)[keyof typeof DEPARTMENT_STATUS];
export type LocationStatus =
  (typeof LOCATION_STATUS)[keyof typeof LOCATION_STATUS];
