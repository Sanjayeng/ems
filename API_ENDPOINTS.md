# API Endpoints - Task & Submission Module

## Base URL
```
http://localhost:5000/api
```

## Task Endpoints

### 1. Create Task
**POST** `/tasks`

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "departmentId": "dept-1",
  "assignedToId": "user-2",
  "assignedById": "user-1",
  "priority": "high",
  "dueDate": "2026-03-15T00:00:00Z"
}
```

**Response:** `201 Created`
```json
{
  "id": "task-1",
  "title": "Task title",
  "description": "Task description",
  "departmentId": "dept-1",
  "assignedToId": "user-2",
  "assignedById": "user-1",
  "priority": "high",
  "status": "pending",
  "versionNo": 1,
  "createdAt": "2026-02-16T10:00:00Z",
  "updatedAt": "2026-02-16T10:00:00Z"
}
```

---

### 2. Get All Tasks
**GET** `/tasks`

**Response:** `200 OK`
```json
[
  {
    "id": "task-1",
    "title": "Task title",
    "description": "Task description",
    "departmentId": "dept-1",
    "assignedToId": "user-2",
    "assignedById": "user-1",
    "priority": "high",
    "status": "pending",
    "versionNo": 1,
    "submissions": [],
    "createdAt": "2026-02-16T10:00:00Z",
    "updatedAt": "2026-02-16T10:00:00Z"
  }
]
```

---

### 3. Get Task by ID
**GET** `/tasks/:id`

**Response:** `200 OK`
```json
{
  "id": "task-1",
  "title": "Task title",
  "description": "Task description",
  "departmentId": "dept-1",
  "assignedToId": "user-2",
  "assignedById": "user-1",
  "priority": "high",
  "status": "pending",
  "versionNo": 1,
  "createdAt": "2026-02-16T10:00:00Z",
  "updatedAt": "2026-02-16T10:00:00Z",
  "submissions": [],
  "versions": [],
  "assignedTo": { "id": "user-2", "name": "Sarah Jones", "role": "intern" },
  "assignedBy": { "id": "user-1", "name": "Admin User", "role": "admin" },
  "department": { "id": "dept-1", "name": "Engineering" }
}
```

---

### 4. Update Task
**PATCH** `/tasks/:id`

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "low",
  "status": "in-progress",
  "dueDate": "2026-03-20T00:00:00Z",
  "changedById": "user-1"
}
```

**Response:** `200 OK`
```json
{
  "id": "task-1",
  "title": "Updated title",
  "description": "Updated description",
  "priority": "low",
  "status": "in-progress",
  "versionNo": 2,
  "updatedAt": "2026-02-16T11:00:00Z"
}
```

---

### 5. Assign Task (Team Lead Only)
**PATCH** `/tasks/:id/assign`

**Request Body:**
```json
{
  "assignedToId": "user-3",
  "role": "Team Lead"
}
```

**Response:** `200 OK`
```json
{
  "id": "task-1",
  "assignedToId": "user-3",
  "versionNo": 2,
  "assignedTo": { "id": "user-3", "name": "David Lee" },
  "assignedBy": { "id": "user-1", "name": "Admin User" }
}
```

**Error Response (Non-Team Lead):** `403 Forbidden`
```json
{
  "error": "Only Team Lead can assign tasks"
}
```

---

### 6. Get Task Versions
**GET** `/tasks/:id/versions`

**Response:** `200 OK`
```json
[
  {
    "id": "version-1",
    "taskId": "task-1",
    "versionNo": 1,
    "title": "Original title",
    "description": "Original description",
    "dueDate": "2026-03-15T00:00:00Z",
    "changedById": "user-1",
    "createdAt": "2026-02-16T10:00:00Z",
    "changedBy": { "id": "user-1", "name": "Admin User" }
  }
]
```

---

### 7. Delete Task
**DELETE** `/tasks/:id`

**Response:** `200 OK`
```json
{
  "message": "Task deleted successfully",
  "task": { "id": "task-1" }
}
```

---

## Submission Endpoints

### 1. Create Submission
**POST** `/submissions`

**Request Body (multipart/form-data):**
- `taskId` (string)
- `submittedById` (string)
- `comment` (string, optional)
- `externalLink` (string, optional - must be valid URL)
- `file` (file, optional)

**Response:** `201 Created`
```json
{
  "id": "submission-1",
  "taskId": "task-1",
  "submittedById": "user-2",
  "versionNo": 1,
  "fileUrl": "/uploads/filename.pdf",
  "externalLink": "https://example.com",
  "comment": "Here is my submission",
  "status": "pending",
  "reviewedById": null,
  "reviewComment": null,
  "createdAt": "2026-02-16T12:00:00Z",
  "updatedAt": "2026-02-16T12:00:00Z",
  "submittedBy": { "id": "user-2", "name": "Sarah Jones" },
  "task": { "id": "task-1", "title": "Task title" }
}
```

---

### 2. Get Submissions by Task
**GET** `/submissions/task/:taskId`

**Response:** `200 OK`
```json
[
  {
    "id": "submission-1",
    "taskId": "task-1",
    "submittedById": "user-2",
    "versionNo": 1,
    "fileUrl": "/uploads/filename.pdf",
    "externalLink": "https://example.com",
    "comment": "Here is my submission",
    "status": "pending",
    "createdAt": "2026-02-16T12:00:00Z",
    "submittedBy": { "id": "user-2", "name": "Sarah Jones" },
    "reviewedBy": null
  }
]
```

---

### 3. Get Submission by ID
**GET** `/submissions/:id`

**Response:** `200 OK`
```json
{
  "id": "submission-1",
  "taskId": "task-1",
  "submittedById": "user-2",
  "versionNo": 1,
  "fileUrl": "/uploads/filename.pdf",
  "externalLink": "https://example.com",
  "comment": "Here is my submission",
  "status": "pending",
  "reviewedById": null,
  "reviewComment": null,
  "createdAt": "2026-02-16T12:00:00Z",
  "updatedAt": "2026-02-16T12:00:00Z",
  "submittedBy": { "id": "user-2", "name": "Sarah Jones" },
  "reviewedBy": null,
  "task": {
    "id": "task-1",
    "title": "Task title",
    "assignedTo": { "id": "user-2", "name": "Sarah Jones" },
    "assignedBy": { "id": "user-1", "name": "Admin User" }
  }
}
```

---

### 4. Get Submission History
**GET** `/submissions/task/:taskId/user/:submittedById`

**Response:** `200 OK`
```json
[
  {
    "id": "submission-1",
    "taskId": "task-1",
    "submittedById": "user-2",
    "versionNo": 1,
    "fileUrl": "/uploads/filename.pdf",
    "status": "pending",
    "createdAt": "2026-02-16T12:00:00Z",
    "submittedBy": { "id": "user-2", "name": "Sarah Jones" },
    "reviewedBy": null
  },
  {
    "id": "submission-2",
    "taskId": "task-1",
    "submittedById": "user-2",
    "versionNo": 2,
    "fileUrl": "/uploads/filename2.pdf",
    "status": "approved",
    "reviewComment": "Good work!",
    "createdAt": "2026-02-16T13:00:00Z",
    "submittedBy": { "id": "user-2", "name": "Sarah Jones" },
    "reviewedBy": { "id": "user-1", "name": "Admin User" }
  }
]
```

---

### 5. Review Submission (Approve/Reject)
**PATCH** `/submissions/:id/review`

**Request Body:**
```json
{
  "reviewerId": "user-1",
  "status": "approved",
  "reviewComment": "Great work! Minor adjustments needed."
}
```

**Response:** `200 OK`
```json
{
  "id": "submission-1",
  "taskId": "task-1",
  "submittedById": "user-2",
  "versionNo": 1,
  "fileUrl": "/uploads/filename.pdf",
  "status": "approved",
  "reviewedById": "user-1",
  "reviewComment": "Great work! Minor adjustments needed.",
  "updatedAt": "2026-02-16T13:00:00Z",
  "submittedBy": { "id": "user-2", "name": "Sarah Jones" },
  "reviewedBy": { "id": "user-1", "name": "Admin User" },
  "task": { "id": "task-1", "title": "Task title" }
}
```

**Valid Status Values:**
- `pending` (default)
- `approved`
- `rejected`

---

### 6. Delete Submission
**DELETE** `/submissions/:id`

**Response:** `200 OK`
```json
{
  "message": "Submission deleted successfully",
  "submission": { "id": "submission-1" }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Title is required"
}
```

### 403 Forbidden
```json
{
  "error": "Only Team Lead can assign tasks"
}
```

### 404 Not Found
```json
{
  "error": "Task not found"
}
```

---

## Features Implemented ✅

1. **Task Creation APIs** - Create, read, update, delete tasks
2. **Task Assignment (Intern under TL only)** - Role-based task assignment
3. **Multi-version Submissions** - Track multiple submission versions
4. **File Upload (Multer)** - Upload files with submissions
5. **External Link Validation** - Validate URLs in submissions
6. **Approval / Rejection Logic** - Review and approve/reject submissions
7. **Version Tracking** - Track all task version changes
8. **Submission History** - View all submissions from a user for a task

---

## Field Validations

### Task Creation
- `title` (required, string)
- `description` (required, string)
- `departmentId` (required, string)
- `assignedToId` (required, string)
- `assignedById` (required, string)
- `priority` (required, string: "low", "medium", "high")
- `dueDate` (required, valid ISO date)

### Submission Creation
- `taskId` (required, string)
- `submittedById` (required, string)
- `externalLink` (optional, must be valid URL if provided)
- `comment` (optional, string)
- `file` (optional, file upload)

### Always Include
- `changedById` in task updates (tracks who made the change)
- `reviewerId` in submission reviews (tracks who reviewed)

