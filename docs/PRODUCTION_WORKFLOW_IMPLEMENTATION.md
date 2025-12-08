# Production Workflow Implementation

## Overview

This document describes the implementation of the Production Workflow UI for the journal submission management system, following the same architectural patterns as the Copyediting Workflow.

## Implementation Date

December 8, 2025

## Features Implemented

### 1. Separate Submission Page Route

**File**: `app/(panel)/editor/assigned-journals/[journalId]/submissions/[id]/page.jsx`

- Created a dedicated route for viewing submissions from assigned journals
- Reuses the same UI and logic as the main submission detail page
- Includes navigation back to journal submissions list
- Supports Copyediting and Production workflow buttons

### 2. Production Workflow Main Page

**File**: `app/(panel)/editor/submissions/[id]/production/page.jsx`

- Follows the same structure as the Copyediting workflow page
- Three main tabs: Production Ready Files, Discussions, and Participants
- Header with breadcrumb navigation back to submission
- "Schedule for Publication" button to navigate to publication tab
- "Assign Production Assistant" button for managing participants
- Help drawer with production-specific guidance

### 3. Production Ready Files Component

**File**: `features/panel/editor/submission/components/production/ProductionReadyFiles.jsx`

- Table-style list displaying production ready files
- Columns: File Name, Uploaded By, Date, Actions
- Search functionality to filter files
- Upload File button for adding new files
- View and Download actions for each file
- Empty state with helpful message
- Supports file type badges

### 4. Production Discussions Component

**File**: `features/panel/editor/submission/components/production/ProductionDiscussions.jsx`

- Table-style panel for production discussions
- Columns: Name, From, Last Reply, Replies, Closed
- Search functionality to filter discussions
- "Add Discussion" button to create new threads
- Click to open discussion details
- Empty state encouraging first discussion
- Visual indicators for open/closed status

### 5. Production Participants Component

**File**: `features/panel/editor/submission/components/production/ProductionParticipants.jsx`

- Lists assigned production assistants and layout editors
- Columns: Name, Email, Role, Actions
- "Assign Participant" button
- Role badges with color coding:
  - Production Assistant (purple)
  - Layout Editor (blue)
  - Proofreader (green)
- Remove participant functionality with confirmation dialog
- Empty state with helpful message

### 6. Assign Production Assistant Dialog

**File**: `features/panel/editor/submission/components/production/AssignProductionAssistantDialog.jsx`

- Dialog for assigning production participants
- Role selection dropdown (Production Assistant, Layout Editor, Proofreader)
- User search with filtering by name or email
- Selectable user list with role badges
- Assign and Cancel actions
- Loading states during assignment

### 7. Production Help Drawer

Integrated into the main Production workflow page with sections:

- **Production Overview**: Description of the production stage
- **Orientation**: Introduction to production panels
- **Production Ready Files**: Explanation of file preparation
- **Production Discussions**: Communication guidelines
- **Participants**: How to manage production team
- **Publishing the Submission**: Galley file creation and publication process

### 8. Navigation Updates

**Updated Files**:

- `app/(panel)/editor/submissions/[id]/page.jsx`: Added Production button
- `features/panel/editor/submission/components/index.js`: Export production components

## File Structure

```
app/(panel)/editor/
├── assigned-journals/
│   └── [journalId]/
│       └── submissions/
│           └── [id]/
│               └── page.jsx (new - separate submission detail)
└── submissions/
    └── [id]/
        ├── page.jsx (updated - added Production button)
        └── production/
            └── page.jsx (new - production workflow)

features/panel/editor/submission/components/
├── production/
│   ├── ProductionReadyFiles.jsx (new)
│   ├── ProductionDiscussions.jsx (new)
│   ├── ProductionParticipants.jsx (new)
│   ├── AssignProductionAssistantDialog.jsx (new)
│   └── index.js (new)
└── index.js (updated - export production components)
```

## Design Patterns

### 1. Component Architecture

- Modular components inside feature folder
- Consistent with Copyediting workflow structure
- Reusable UI components from shadcn/ui

### 2. State Management

- React Query hooks for data fetching (ready for API integration)
- Local state for UI interactions (dialogs, search)
- Mutations for create/update/delete operations

### 3. UI Consistency

- Table-based layouts matching OJS design
- Consistent empty states with icons and helpful messages
- Search functionality across all list views
- Action buttons with icons and labels
- Loading skeletons for better UX

### 4. Help System

- Sheet component for help drawer
- Consistent with Copyediting help structure
- Production-specific guidance based on OJS documentation

## API Integration Points

The following components are ready for API integration:

1. **ProductionReadyFiles**:

   - `useGetProductionFiles(submissionId)` - fetch files
   - `useUploadProductionFile()` - upload mutation

2. **ProductionDiscussions**:

   - `useGetProductionDiscussions(submissionId)` - fetch discussions
   - `useCreateProductionDiscussion()` - create mutation

3. **ProductionParticipants**:

   - `useGetProductionParticipants(submissionId)` - fetch participants
   - `useAssignProductionParticipant()` - assign mutation
   - `useRemoveProductionParticipant()` - remove mutation

4. **AssignProductionAssistantDialog**:
   - `useGetAvailableUsers()` - search users
   - `useAssignProductionParticipant()` - assign mutation

## Next Steps

1. **Backend API Development**:

   - Create production file endpoints
   - Create production discussion endpoints
   - Create production participant endpoints

2. **API Integration**:

   - Create React Query hooks for production operations
   - Connect components to backend APIs
   - Add error handling and success notifications

3. **File Upload**:

   - Implement file upload dialog
   - Add file validation
   - Support multiple file formats

4. **Discussion System**:

   - Implement discussion detail view
   - Add reply functionality
   - Support closing/reopening discussions

5. **Publication Integration**:
   - Create publication tab/page
   - Implement galley file upload
   - Add publication scheduling

## Testing Checklist

- [ ] Production workflow page loads correctly
- [ ] All tabs switch properly
- [ ] Help drawer opens with correct content
- [ ] Production ready files display in table
- [ ] File search works correctly
- [ ] Production discussions display in table
- [ ] Discussion search works correctly
- [ ] Participants display in table
- [ ] Assign participant dialog opens and closes
- [ ] Role selection works in assign dialog
- [ ] User search works in assign dialog
- [ ] Remove participant confirmation works
- [ ] Navigation between submission and production workflow
- [ ] Schedule for Publication button navigates correctly
- [ ] Separate assigned journals submission page works
- [ ] Dark/light mode compatibility

## Notes

- All components follow the same patterns as Copyediting workflow
- Mock data is used until API integration is complete
- Empty states provide helpful guidance to users
- Color schemes match the existing design system
- Components are responsive and mobile-friendly
