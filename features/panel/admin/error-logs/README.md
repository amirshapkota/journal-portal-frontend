# Sentry Integration - Frontend Implementation

## Overview

The error-logs page has been updated to use real Sentry API data instead of mock data. The implementation fetches live error data from your Sentry organization through the Django backend API.

## Files Created/Modified

### New Files

1. **`api/sentryApi.js`** - API service layer

   - `fetchProjects()` - Get all Sentry projects
   - `fetchIssues(projectSlug, options)` - Get issues for a project
   - `fetchIssueDetail(issueId)` - Get issue details
   - `fetchIssueEvents(issueId, options)` - Get events for an issue
   - `fetchProjectStats(projectSlug, options)` - Get project statistics

2. **`hooks/useSentry.js`** - React hooks for Sentry data
   - `useSentryProjects()` - Hook to fetch projects
   - `useSentryIssues(projectSlug, options)` - Hook to fetch issues
   - `useSentryIssueDetail(issueId)` - Hook to fetch issue details
   - `useSentryIssueEvents(issueId, options)` - Hook to fetch issue events
   - `useSentryProjectStats(projectSlug, options)` - Hook to fetch stats

### Modified Files

1. **`app/(panel)/admin/error-logs/page.jsx`** - Main page component

   - Replaced mock data with real API calls
   - Added project selection dropdown
   - Implemented loading and error states
   - Added auto-refresh functionality
   - Proper error handling with user feedback

2. **`features/panel/admin/error-logs/index.js`** - Exports
   - Removed mock data export

## Features

### ✅ Real-Time Data

- Fetches live error data from Sentry
- Auto-refreshes on demand
- Shows actual error counts and statistics

### ✅ Project Selection

- Lists all projects from your Sentry organization
- Auto-selects first project on load
- Switch between projects easily

### ✅ Filtering

- **Status Filter**: unresolved, resolved, ignored, all
- **Level Filter**: error, warning, fatal, all
- Client-side level filtering for better UX

### ✅ Loading States

- Spinner animation on refresh button
- Loading indicators for projects and issues
- Graceful handling of empty states

### ✅ Error Handling

- Clear error messages for API failures
- Configuration check alerts
- Fallback UI for missing data

### ✅ Statistics

- Total issues count
- Unresolved vs resolved breakdown
- Total events across all issues
- Affected users count

## Usage

### Basic Usage

The page automatically:

1. Fetches all Sentry projects on load
2. Auto-selects the first project
3. Fetches issues for the selected project
4. Displays statistics and filterable table

### Filtering Issues

```jsx
// Status filter options
- "unresolved" (default)
- "resolved"
- "ignored"
- "all"

// Level filter options (client-side)
- "error"
- "warning"
- "fatal"
- "all" (default)
```

### Refreshing Data

Click the "Refresh" button to fetch latest data from Sentry. The button shows a spinning animation while loading.

### Switching Projects

Use the project dropdown to switch between different Sentry projects. Issues will automatically reload for the selected project.

## API Endpoints Used

All endpoints are proxied through the Django backend:

```
GET /api/v1/integrations/sentry/projects/
GET /api/v1/integrations/sentry/projects/{slug}/issues/?status=unresolved&limit=100
GET /api/v1/integrations/sentry/issues/{id}/
GET /api/v1/integrations/sentry/issues/{id}/events/
GET /api/v1/integrations/sentry/projects/{slug}/stats/
```

## Configuration Required

Ensure your Django backend has Sentry configured in `.env`:

```env
SENTRY_API_BASE_URL=https://sentry.io/api/0
SENTRY_AUTH_TOKEN=your-sentry-auth-token
SENTRY_ORG_SLUG=your-organization-slug
```

## Error States

The page handles several error scenarios:

1. **No Sentry Configuration**

   - Shows alert: "Please check your Sentry configuration..."

2. **No Projects Found**

   - Shows alert: "No Sentry projects found..."

3. **API Errors**

   - Shows error message from API
   - Suggests checking configuration

4. **Loading States**
   - Shows "Loading Sentry projects..." while fetching
   - Spinner on refresh button
   - Loading state passed to table component

## Data Flow

```
Page Component
    ↓
useSentryProjects() hook
    ↓
fetchProjects() API call
    ↓
Django Backend (/api/v1/integrations/sentry/projects/)
    ↓
Sentry API (https://sentry.io/api/0/...)
    ↓
Sanitized data returned to frontend
```

## Component Structure

```
app/(panel)/admin/error-logs/
├── page.jsx                    # Main page (updated)
└── features/panel/admin/error-logs/
    ├── api/
    │   └── sentryApi.js        # API service layer (new)
    ├── hooks/
    │   └── useSentry.js        # React hooks (new)
    ├── components/
    │   ├── ErrorLogsTable.jsx
    │   ├── ErrorDetailsModal.jsx
    │   ├── ErrorStatsCards.jsx
    │   └── ErrorFilters.jsx
    ├── data/
    │   └── mockErrorIssues.js  # Kept for reference
    └── index.js                # Exports (updated)
```

## Testing

1. **Verify Configuration**

   - Check `.env` has Sentry credentials
   - Ensure Django server is running
   - Verify Sentry organization has projects

2. **Test Page Load**

   - Navigate to `/admin/error-logs`
   - Should see project dropdown
   - Should see issues table with real data

3. **Test Filtering**

   - Change status filter (unresolved/resolved/ignored)
   - Change level filter (error/warning/fatal)
   - Verify table updates

4. **Test Refresh**

   - Click refresh button
   - Should see spinner animation
   - Data should reload

5. **Test Project Switching**
   - Select different project from dropdown
   - Issues should reload for new project

## Troubleshooting

### No projects showing

- Check Sentry credentials in `.env`
- Verify `SENTRY_ORG_SLUG` is correct
- Check Django logs for API errors

### Issues not loading

- Verify project slug is correct
- Check if project has any issues in Sentry
- Look for errors in browser console

### API errors

- Check Django backend is running
- Verify Sentry auth token is valid
- Check network tab for failed requests

## Future Enhancements

Potential improvements:

- Add pagination for large issue lists
- Implement search functionality
- Add date range filters
- Show event details in modal
- Add issue resolution actions
- Implement real-time updates via WebSocket
- Add export functionality
- Show stack traces in detail view

## Notes

- Mock data file (`mockErrorIssues.js`) is kept for reference but not used
- All API calls include credentials for authentication
- Data is automatically sanitized by the backend (PII removed)
- Client-side filtering for levels improves UX
- Project selection persists during session
