# API Integration Patterns & Reference

## Core Integration Pattern

Every integrated page follows this exact structure:

```javascript
import { useEffect, useState } from "react";
import { AlertCircle, Loader } from "lucide-react";
import { tasksApi, submissionsApi } from "../../utils/api";

const PageComponent = () => {
  // 1. State Setup
  const [data, setData] = useState({
    // Role-specific fields here
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Load data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // 3. Async fetch function
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Call API
      const allTasks = await tasksApi.getAll();
      
      // Process data
      const processed = {
        // Calculate metrics here
      };
      
      setData(processed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // 5. Handle error state
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <div>
          <p className="font-medium text-red-900">Error loading data</p>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  // 6. Render with state data
  return (
    <div>
      {/* Render using data state */}
    </div>
  );
};

export default PageComponent;
```

---

## Available API Methods

### tasksApi

```javascript
// Get all tasks
const allTasks = await tasksApi.getAll();
// Returns: Task[]

// Get task by ID
const task = await tasksApi.getById(taskId);
// Returns: Task

// Create task
const newTask = await tasksApi.create({
  title: "Task Name",
  description: "Description",
  priority: "high",
  dueDate: "2026-02-20",
  assignedToId: "intern-1"
});
// Returns: Task

// Update task
const updated = await tasksApi.update(taskId, {
  status: "completed",
  priority: "low"
});
// Returns: Task

// Assign task
const assigned = await tasksApi.assign(taskId, {
  assignedToId: "intern-1"
});
// Returns: Task

// Get task versions
const versions = await tasksApi.getVersions(taskId);
// Returns: TaskVersion[]

// Delete task
await tasksApi.delete(taskId);
// Returns: void
```

### submissionsApi

```javascript
// Get submissions for a task
const submissions = await submissionsApi.getByTask(taskId);
// Returns: Submission[]

// Get submission by ID
const submission = await submissionsApi.getById(submissionId);
// Returns: Submission

// Create submission
const newSubmission = await submissionsApi.create({
  taskId: "task-1",
  submittedById: "intern-1",
  // For file upload:
  submissionData: formData // FormData object
});
//  Returns: Submission

// Review submission
const reviewed = await submissionsApi.review(submissionId, {
  status: "approved",
  feedback: "Good work!"
});
// Returns: Submission

// Get submission history
const history = await submissionsApi.getHistory(submissionId);
// Returns: SubmissionVersion[]

// Delete submission
await submissionsApi.delete(submissionId);
// Returns: void
```

---

## Common Data Processing Patterns

### Pattern 1: Count Tasks by Status

```javascript
const allTasks = await tasksApi.getAll();

const stats = {
  total: allTasks.length,
  completed: allTasks.filter(t => t.status === 'completed').length,
  inProgress: allTasks.filter(t => t.status === 'in_progress').length,
  pending: allTasks.filter(t => t.status === 'pending').length,
};

const completionRate = (stats.completed / stats.total) * 100;
```

### Pattern 2: Filter Tasks by Assignee

```javascript
const allTasks = await tasksApi.getAll();
const internId = "intern-1";

const assignedTasks = allTasks.filter(task => 
  task.assignedToId === internId
);
```

### Pattern 3: Group Tasks by Priority

```javascript
const allTasks = await tasksApi.getAll();

const byPriority = {};
allTasks.forEach(task => {
  const priority = task.priority || 'none';
  byPriority[priority] = (byPriority[priority] || 0) + 1;
});

// Result: { high: 5, medium: 8, low: 3 }
```

### Pattern 4: Extract Unique Users

```javascript
const allTasks = await tasksApi.getAll();

const uniqueUsers = new Set(
  allTasks
    .map(t => t.assignedToId)
    .filter(Boolean)
).size;

// Or get the actual user IDs:
const userIds = [...new Set(allTasks.map(t => t.assignedToId).filter(Boolean))];
```

### Pattern 5: Determine Role from User ID

```javascript
const determineRole = (userId) => {
  if (!userId) return 'UNKNOWN';
  if (userId.includes('intern')) return 'INTERN';
  if (userId.includes('tl')) return 'TEAM_LEAD';
  if (userId.includes('manager')) return 'MANAGER';
  if (userId.includes('ceo')) return 'CEO';
  if (userId.includes('cfo')) return 'CFO';
  if (userId.includes('cto')) return 'CTO';
  if (userId.includes('coo')) return 'COO';
  if (userId.includes('admin')) return 'ADMIN';
  return 'EMPLOYEE';
};
```

### Pattern 6: Generate Trend Data from Tasks

```javascript
const allTasks = await tasksApi.getAll();

const getTrendData = (months = 6) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const completionRate = 
    (allTasks.filter(t => t.status === 'completed').length / allTasks.length) * 100;
  
  return monthNames.map((month, index) => ({
    month,
    value: completionRate * (0.2 * index + 0.2) // Simulate growth
  }));
};
```

### Pattern 7: Group Tasks by Team Member

```javascript
const allTasks = await tasksApi.getAll();

const memberTasks = {};
allTasks.forEach(task => {
  const member = task.assignedToId || 'unassigned';
  memberTasks[member] = (memberTasks[member] || 0) + 1;
});

// Get top performers
const topPerformers = Object.entries(memberTasks)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 4);
```

### Pattern 8: Calculate Work Hours

```javascript
const calculateWorkHours = (tasks) => {
  const HOURS_PER_COMPLETED = 8;
  const HOURS_PER_IN_PROGRESS = 6.5;
  const HOURS_PER_PENDING = 4;
  
  let totalHours = 0;
  tasks.forEach(task => {
    if (task.status === 'completed') {
      totalHours += HOURS_PER_COMPLETED;
    } else if (task.status === 'in_progress') {
      totalHours += HOURS_PER_IN_PROGRESS;
    } else if (task.status === 'pending') {
      totalHours += HOURS_PER_PENDING;
    }
  });
  
  return totalHours;
};
```

### Pattern 9: Generate Pie Chart Data

```javascript
const meetingData = [
  { name: "Attended", value: completionRate },
  { name: "Missed", value: 100 - completionRate }
];

const COLORS = ["#4f46e5", "#e5e7eb"];

// In JSX:
<PieChart data={meetingData}>
  <Pie dataKey="value" innerRadius={70} outerRadius={100}>
    {meetingData.map((_, i) => (
      <Cell key={i} fill={COLORS[i]} />
    ))}
  </Pie>
</PieChart>
```

### Pattern 10: File Upload with FormData

```javascript
const handleSubmit = async (formData) => {
  // formData is already FormData object from HTML form
  
  const submission = await submissionsApi.create({
    taskId: selectedTask.id,
    submittedById: currentUser.id,
    // Pass FormData directly - don't set Content-Type headers
    submissionData: formData
  });
};

// HTML Form:
<form onSubmit={(e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  handleSubmit(formData);
}}>
  <input type="file" name="file" />
  <textarea name="comment"></textarea>
  <button type="submit">Submit</button>
</form>
```

---

## Task Object Structure

```javascript
{
  id: "task-1",
  title: "Complete user dashboard",
  description: "Build the main dashboard UI",
  status: "in_progress", // pending, in_progress, completed
  priority: "high", // low, medium, high
  dueDate: "2026-02-20",
  createdById: "manager-1",
  assignedToId: "intern-1",
  assignedAt: "2026-02-15T10:30:00Z",
  createdAt: "2026-02-10T09:00:00Z",
  updatedAt: "2026-02-16T14:22:00Z"
}
```

---

## Submission Object Structure

```javascript
{
  id: "submission-1",
  taskId: "task-1",
  submittedById: "intern-1",
  submission: {
    link: "https://github.com/...",
    comment: "Completed features X, Y, Z",
    file: "/uploads/submission-123.pdf" // if file uploaded
  },
  status: "pending", // pending, approved, needs-review
  feedback: "Looks good, minor fixes needed",
  submittedAt: "2026-02-16T14:00:00Z",
  reviewedAt: "2026-02-16T15:30:00Z",
  reviewedBy: "tl-1"
}
```

---

## Redux Auth Structure

```javascript
// From Redux state.auth:
{
  isAuthenticated: true,
  user: {
    id: "intern-1",
    name: "Sophia Kim",
    email: "sophia@company.com",
    role: "INTERN"
  }
}

// Usage in components:
const { name, email } = useSelector(state => state.auth.user);
const initials = name.split(' ').map(n => n[0]).join('').toUpperCase(); // SK
```

---

## Error Handling Best Practices

```javascript
try {
  setLoading(true);
  const data = await tasksApi.getAll();
  // Process data
  setData(processedData);
} catch (err) {
  // Log for debugging (optional)
  console.error('Fetch error:', err);
  
  // Set user-friendly error message
  setError(
    err.response?.data?.message || 
    err.message || 
    'An error occurred while loading data'
  );
} finally {
  setLoading(false);
}
```

---

## Performance Tips

1. **Don't call API in loops** - Get all data once, then filter in memory
2. **Memoize calculations** - Use useMemo for expensive operations
3. **Batch API calls** - When possible, combine multiple tasksApi calls
4. **Check data length** - Always verify `allTasks.length > 0` before dividing
5. **Use Set for unique values** - Faster than filtering for uniqueness
6. **Sort before slice** - Sort the full array, then take first N items

---

## Testing the Integration

```javascript
// Test fetching all tasks
const testFetch = async () => {
  try {
    const tasks = await tasksApi.getAll();
    console.log('Tasks:', tasks);
    console.log('Total:', tasks.length);
    console.log('Completed:', tasks.filter(t => t.status === 'completed').length);
  } catch (err) {
    console.error('Error:', err);
  }
};

// Run in browser console or test file
testFetch();
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "tasksApi is not defined" | Check import path: `../../utils/api` |
| Network 404 error | Verify backend is running on port 5000 |
| CORS error | Check CORS config in backend |
| FormData not working | Don't set Content-Type header, let browser set it |
| State not updating | Check setState inside try block, not after finally |
| Infinite loop | Ensure useEffect has empty dependency array `[]` |
| Data is undefined | Add null check before using: `data && data.length > 0` |

---

## Next API Endpoints to Consider

```javascript
// Meetings API (future)
const meetingsApi = {
  getAll: () => fetch('/api/meetings'),
  create: (data) => fetch('/api/meetings', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetch(`/api/meetings/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => fetch(`/api/meetings/${id}`, { method: 'DELETE' })
};

// Chat API (future)
const chatApi = {
  getMessages: (roomId) => fetch(`/api/chat/${roomId}`),
  sendMessage: (roomId, message) => fetch(`/api/chat/${roomId}`, { method: 'POST', body: JSON.stringify(message) })
};

// Settings API (future)
const settingsApi = {
  get: () => fetch('/api/settings'),
  update: (settings) => fetch('/api/settings', { method: 'PATCH', body: JSON.stringify(settings) })
};
```

---

**This reference guide covers all patterns used across the 24+ integrated pages.**
