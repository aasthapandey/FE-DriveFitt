# Job Posting and Application Management APIs

This document outlines all the APIs created for managing job postings and applications.

## Database Tables

The following tables have been created:

- `job_postings` - Stores job posting information
- `departments` - Stores department information
- `location` - Stores location information
- `applications` - Stores job applications

## API Endpoints

### 1. Job Postings

#### GET /api/job-postings

Fetch all job postings with optional filters.

**Query Parameters:**

- `status` (optional): Filter by job status (0=inactive, 1=active, 2=closed, 3=deleted)
- `is_visible` (optional): Filter by visibility (true/false)
- `department_id` (optional): Filter by department ID
- `location_id` (optional): Filter by location ID

**Response:** Array of job postings with department and location details

#### GET /api/job-postings/[id]

Fetch a specific job posting by ID.

**Response:** Single job posting with department and location details

#### POST /api/job-postings

Create a new job posting.

**Request Body:**

```json
{
  "title": "Software Engineer",
  "department_id": 1,
  "location_id": 1,
  "job_type": 1,
  "application_deadline": "2025-12-31",
  "job_description": "Job description here",
  "skills_required": "Java, Spring Boot",
  "role": ["Backend Developer", "Team Contributor"],
  "qualifications": ["B.Tech in Computer Science", "2+ years experience"],
  "years_of_experience": "2-4",
  "is_visible": true
}
```

#### PUT /api/job-postings/[id]

Update a job posting.

**Request Body:** Same as POST but all fields are optional

#### PUT /api/job-postings/[id]/status

Update job posting status.

**Request Body:**

```json
{
  "status": 1
}
```

#### PUT /api/job-postings/[id]/visibility

Update job posting visibility.

**Request Body:**

```json
{
  "is_visible": true
}
```

### 2. Applications

#### GET /api/applications

Fetch all applications with optional filters.

**Query Parameters:**

- `status` (optional): Filter by application status (0=new, 1=in review, 2=rejected, 3=shortlisted)
- `job_id` (optional): Filter by job ID

**Response:** Object with applications array

#### POST /api/applications

Create a new application.

**Request Body (FormData):**

- `candidate_name`: string
- `email`: string
- `phone`: string (optional)
- `job_id`: number
- `resume`: File (optional)

#### GET /api/applications/[id]/resume

Download application resume as PDF.

**Response:** PDF file download

#### PUT /api/applications/[id]/status

Update application status.

**Request Body:**

```json
{
  "status": 1
}
```

### 3. Departments and Locations

#### GET /api/departments-locations

Fetch all active departments and locations.

**Response:**

```json
{
  "departments": [...],
  "locations": [...]
}
```

## Enums

### JobType

- `FULL_TIME = 1`
- `PART_TIME = 2`
- `CONTRACTOR = 3`

### JobStatus

- `ACTIVE = 1`
- `INACTIVE = 0`
- `CLOSED = 2`
- `DELETED = 3`

### ApplicationStatus

- `NEW = 0`
- `IN_REVIEW = 1`
- `REJECTED = 2`
- `SHORTLISTED = 3`

## Example Usage

### Fetch all active job postings

```bash
GET /api/job-postings?status=1&is_visible=true
```

### Create a new job posting

```bash
POST /api/job-postings
Content-Type: application/json

{
  "title": "Frontend Developer",
  "department_id": 2,
  "location_id": 1,
  "job_type": 1,
  "job_description": "Develop user interfaces",
  "skills_required": "React, TypeScript, CSS",
  "role": ["Frontend Developer"],
  "qualifications": ["B.Tech in Computer Science"],
  "years_of_experience": "1-3",
  "is_visible": true
}
```

### Submit an application

```bash
POST /api/applications
Content-Type: multipart/form-data

candidate_name: John Doe
email: john@example.com
phone: +1234567890
job_id: 1
resume: [file]
```

### Update application status

```bash
PUT /api/applications/1/status
Content-Type: application/json

{
  "status": 1
}
```

## Error Handling

All APIs return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a descriptive error message:

```json
{
  "error": "Error description"
}
```

Success responses for creation/updates:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "id": 123
}
```
