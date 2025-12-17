# Complete Copyediting Workflow Documentation

## Table of Contents

1. [Overview](#overview)
2. [Workflow Stages](#workflow-stages)
3. [Role-Based Actions](#role-based-actions)
4. [File Status Transitions](#file-status-transitions)
5. [Discussion Management](#discussion-management)
6. [Backend API Reference](#backend-api-reference)
7. [Frontend Components](#frontend-components)
8. [Complete User Flows](#complete-user-flows)
9. [Testing Guide](#testing-guide)

---

## Overview

The copyediting workflow is a comprehensive system for managing the copyediting phase of manuscript submissions. It supports collaboration between editors, copyeditors, and authors through a structured file management and discussion system.

### Key Features

- **File Status Management**: Tracks files through DRAFT → COPYEDITED → AUTHOR_FINAL → FINAL stages
- **Role-Based Permissions**: Different capabilities for editors, copyeditors, and authors
- **SuperDoc Integration**: Advanced document editor with track changes and comments
- **Discussion System**: Threaded discussions with open/resolved/reopen states
- **Validation & Completion**: Ensures all files pass through required stages before completion

---

## Workflow Stages

### 1. Draft Stage (DRAFT)

- **Who**: Copyeditor
- **Actions**:
  - Upload initial manuscript files
  - Create draft versions for editing
  - Begin copyediting work
- **File Status**: `DRAFT`
- **Endpoint**: `POST /api/submissions/copyediting/files/`

### 2. Copyediting Stage (COPYEDITED)

- **Who**: Copyeditor/Editor
- **Actions**:
  - Edit files with track changes
  - Add comments and suggestions
  - Approve copyedited version
- **File Status**: `DRAFT` → `COPYEDITED`
- **Endpoint**: `POST /api/submissions/copyediting/files/{id}/approve/`

### 3. Author Review Stage (AUTHOR_FINAL)

- **Who**: Author
- **Actions**:
  - Review copyedited files
  - Accept/reject tracked changes
  - Make additional edits
  - Confirm as final
- **File Status**: `COPYEDITED` → `AUTHOR_FINAL`
- **Endpoint**: `POST /api/submissions/copyediting/files/{id}/confirm-final/`

### 4. Final Stage (FINAL)

- **Who**: Editor
- **Actions**:
  - Verify all files are author-approved
  - Complete copyediting assignment
  - Transition to production
- **File Status**: `AUTHOR_FINAL` → `FINAL`
- **Endpoint**: `POST /api/submissions/copyediting/assignments/{id}/complete/`

---

## Role-Based Actions

### Editor Capabilities

✅ View all files (draft, copyedited, author-final, final)  
✅ Edit draft files  
✅ **Approve copyedited files** (`POST /files/{id}/approve/`)  
✅ Complete copyediting assignment (`POST /assignments/{id}/complete/`)  
✅ Start/close/reopen discussions  
✅ Assign/remove participants

❌ Cannot edit author-final files  
❌ Cannot confirm files as final (author action)

### Copyeditor Capabilities

✅ Upload and edit draft files  
✅ Save changes with track changes  
✅ Add comments  
✅ Participate in discussions

❌ Cannot approve files (editor action)  
❌ Cannot complete assignment  
❌ Cannot manage participants

### Author Capabilities

✅ View draft files (read-only)  
✅ **Review and edit copyedited files**  
✅ **Confirm files as final** (`POST /files/{id}/confirm-final/`)  
✅ View final files (read-only)  
✅ Participate in discussions

❌ Cannot edit draft files  
❌ Cannot approve copyedited files (editor action)  
❌ Cannot complete assignment  
❌ Cannot manage participants

---

## File Status Transitions

### Status Flow Diagram

```
DRAFT
  ↓ (Editor/Copyeditor approves)
COPYEDITED
  ↓ (Author confirms)
AUTHOR_FINAL
  ↓ (Editor completes assignment)
FINAL
```

### Transition Rules

#### DRAFT → COPYEDITED

- **Action**: Approve Copyediting
- **Trigger**: Editor/Copyeditor clicks "Approve Copyediting" in SuperDoc editor
- **Backend**: `POST /api/submissions/copyediting/files/{id}/approve/`
- **Validation**: File must exist and be in DRAFT status
- **Effect**:
  - `file_type` changes to `COPYEDITED`
  - `is_approved` set to `true`
  - `approved_at` timestamp recorded
  - `approved_by` set to current user

#### COPYEDITED → AUTHOR_FINAL

- **Action**: Confirm as Final
- **Trigger**: Author clicks "Confirm as Final" in SuperDoc editor or AuthorConfirmCopyeditedFiles
- **Backend**: `POST /api/submissions/copyediting/files/{id}/confirm-final/`
- **Validation**: File must be in COPYEDITED status
- **Effect**:
  - `file_type` changes to `AUTHOR_FINAL`
  - `confirmation_notes` saved (optional)
  - `confirmed_at` timestamp recorded
  - `confirmed_by` set to author

#### AUTHOR_FINAL → FINAL (Bulk)

- **Action**: Complete Copyediting
- **Trigger**: Editor clicks "Complete Copyediting" in EditorCompleteCopyediting
- **Backend**: `POST /api/submissions/copyediting/assignments/{id}/complete/`
- **Validation**:
  - Assignment status must be IN_PROGRESS
  - All files must have status AUTHOR_FINAL (validated on backend)
  - No files with DRAFT or COPYEDITED status
- **Effect**:
  - All AUTHOR_FINAL files → `FINAL`
  - Assignment status → `COMPLETED`
  - `completed_at` timestamp recorded
  - `completion_notes` saved (optional)
  - Submission stage → `PRODUCTION` (optional)

---

## Discussion Management

### Discussion States

- **OPEN**: Active discussion, can add messages
- **RESOLVED**: Closed by editor, cannot add messages
- **CLOSED**: Permanently closed (legacy status)

### Discussion Actions

#### Create Discussion

- **Who**: Editor, Copyeditor, Author
- **Endpoint**: `POST /api/submissions/copyediting/discussions/`
- **Required Fields**:
  - `assignment` (UUID)
  - `subject` (string)
  - `message` (HTML string)
  - `participant_ids` (array of UUIDs)

#### Add Message

- **Who**: Any participant
- **Endpoint**: `POST /api/submissions/copyediting/discussions/{id}/add_message/`
- **Required Fields**:
  - `message` (HTML string, min 10 chars after HTML stripping)
- **Validation**: Discussion must be OPEN

#### Mark as Resolved

- **Who**: Editor only
- **Endpoint**: `POST /api/submissions/copyediting/discussions/{id}/close/`
- **Effect**: Status changes to RESOLVED
- **UI**: Button shown only for OPEN discussions

#### Reopen Discussion

- **Who**: Editor only
- **Endpoint**: `POST /api/submissions/copyediting/discussions/{id}/reopen/`
- **Effect**: Status changes back to OPEN
- **UI**: Button shown only for RESOLVED discussions
- **Use Case**: Continue discussion if new issues arise

---

## Backend API Reference

### Copyediting Assignments

#### Complete Assignment

```http
POST /api/submissions/copyediting/assignments/{id}/complete/
Content-Type: application/json

{
  "completion_notes": "All files reviewed and finalized."
}
```

**Response** (200 OK):

```json
{
  "id": "uuid",
  "status": "COMPLETED",
  "completed_at": "2024-01-15T10:30:00Z",
  "completion_notes": "All files reviewed and finalized.",
  "files_updated": 5
}
```

**Validations**:

- ❌ 400: Assignment not in IN_PROGRESS status
- ❌ 400: Files with DRAFT or COPYEDITED status exist
- ❌ 404: Assignment not found

### Copyediting Files

#### Approve File (Editor/Copyeditor)

```http
POST /api/submissions/copyediting/files/{id}/approve/
```

**Response** (200 OK):

```json
{
  "id": "uuid",
  "file_type": "COPYEDITED",
  "is_approved": true,
  "approved_at": "2024-01-15T10:00:00Z",
  "approved_by": {
    "id": "uuid",
    "user_name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Validations**:

- ❌ 400: File not in DRAFT status
- ❌ 404: File not found

#### Confirm File as Final (Author)

```http
POST /api/submissions/copyediting/files/{id}/confirm-final/
Content-Type: application/json

{
  "confirmation_notes": "Reviewed and approved all changes."
}
```

**Response** (200 OK):

```json
{
  "id": "uuid",
  "file_type": "AUTHOR_FINAL",
  "confirmed_at": "2024-01-15T10:15:00Z",
  "confirmed_by": {
    "id": "uuid",
    "user_name": "Jane Author",
    "email": "jane@example.com"
  },
  "confirmation_notes": "Reviewed and approved all changes."
}
```

**Validations**:

- ❌ 400: File not in COPYEDITED status
- ❌ 404: File not found

#### Get Copyedited Files

```http
GET /api/submissions/copyediting/assignments/{id}/copyedited-files/
```

**Response** (200 OK):

```json
{
  "awaiting_confirmation": [
    {
      "id": "uuid",
      "file_type": "COPYEDITED",
      "label": "Manuscript",
      "file": "https://...",
      "created_at": "2024-01-15T09:00:00Z",
      "copyeditor": { "user_name": "Copyeditor Name" }
    }
  ],
  "confirmed": [
    {
      "id": "uuid",
      "file_type": "AUTHOR_FINAL",
      "label": "Figures",
      "confirmed_at": "2024-01-15T10:15:00Z"
    }
  ]
}
```

### Discussions

#### Reopen Discussion

```http
POST /api/submissions/copyediting/discussions/{id}/reopen/
```

**Response** (200 OK):

```json
{
  "id": "uuid",
  "status": "OPEN",
  "subject": "Query about methodology",
  "reopened_at": "2024-01-15T11:00:00Z"
}
```

**Validations**:

- ❌ 400: Discussion not in RESOLVED status
- ❌ 403: Only editors can reopen discussions
- ❌ 404: Discussion not found

---

## Frontend Components

### 1. CopyeditingSuperDocEditor

**Location**: `features/shared/components/SuperDoc/CopyeditingSuperDocEditor.jsx`

**Purpose**: Advanced document editor with role-based approve/confirm functionality.

**Props**:

```jsx
<CopyeditingSuperDocEditor
  fileId="uuid" // Required
  userData={{ first_name, email }} // Required
  readOnly={false} // Default: false
  commentsReadOnly={false} // Default: false
  goBack="/path" // Redirect after approve
  onApprove={handleApprove} // Custom approve function
  approveButtonText="Approve" // Button label
  approveDialogTitle="Approve File" // Dialog title
  approveDialogDescription="..." // Dialog description
  showApproveButton={true} // Show/hide button
/>
```

**Role-Specific Usage**:

**Editor** (Approve):

```jsx
const handleApprove = async (fileId) => {
  await approveCopyeditingFile(fileId); // POST /files/{id}/approve/
};

<CopyeditingSuperDocEditor
  onApprove={handleApprove}
  approveButtonText="Approve Copyediting"
  approveDialogDescription="Mark as copyedited and ready for author review."
/>;
```

**Author** (Confirm):

```jsx
const handleConfirm = async (fileId) => {
  await confirmFileFinal(fileId); // POST /files/{id}/confirm-final/
};

<CopyeditingSuperDocEditor
  onApprove={handleConfirm}
  approveButtonText="Confirm as Final"
  approveDialogDescription="Mark as author-approved and ready for completion."
  showApproveButton={!readOnly} // Hide for read-only views
/>;
```

### 2. AuthorConfirmCopyeditedFiles

**Location**: `features/panel/editor/submission/components/copyediting/AuthorConfirmCopyeditedFiles.jsx`

**Purpose**: Author interface to review and confirm copyedited files.

**Features**:

- Shows awaiting files (COPYEDITED status)
- Shows confirmed files (AUTHOR_FINAL status)
- "Review" button → Navigate to SuperDoc with `?readOnly=false`
- "Confirm Final" button → Calls `POST /files/{id}/confirm-final/`
- Download button
- Status badges

### 3. AuthorViewFinalFiles (NEW)

**Location**: `features/panel/author/components/copyediting/AuthorViewFinalFiles.jsx`

**Purpose**: Read-only view of completed final files for authors.

**Features**:

- Shows FINAL status files only
- "View" button → Navigate to SuperDoc with `?readOnly=true`
- Download button
- Completion metadata
- Green-themed UI indicating completion

**Usage**:

```jsx
<AuthorViewFinalFiles assignmentId="uuid" submissionId="uuid" />
```

### 4. EditorCompleteCopyediting

**Location**: `features/panel/editor/submission/components/copyediting/EditorCompleteCopyediting.jsx`

**Purpose**: Editor dashboard to complete copyediting assignment.

**Features**:

- File status overview (draft, copyedited, author-final, final counts)
- Requirements checklist
- Validation warnings
- "Complete Copyediting" button
- Calls `POST /assignments/{id}/complete/`

### 5. DiscussionThreadDialog (ENHANCED)

**Location**: `features/panel/editor/submission/components/copyediting/DiscussionThreadDialog.jsx`

**Features**:

- View discussion messages
- Add reply with rich text editor
- **Mark as Resolved** button (editor only, OPEN discussions)
- **Reopen Discussion** button (editor only, RESOLVED discussions)
- Rich text editor auto-reset after reply submission

**Key Updates**:

- Imported `useReopenCopyeditingDiscussion` hook
- Added `handleReopen` function
- Added reopen button in footer (RESOLVED status only)
- Fixed editor reset: `form.reset({ message: "" })` after successful reply

---

## Complete User Flows

### Flow 1: Editor Approves Copyedited File

1. **Navigate**: `/editor/submissions/{id}/copyediting` → "Edit" button on draft file
2. **Edit**: SuperDoc editor opens at `/editor/submissions/{id}/copyediting/edit/{fileId}`
3. **Make Changes**: Use track changes, add comments
4. **Save**: Auto-save or manual save
5. **Approve**: Click "Approve Copyediting" button in toolbar
6. **Confirm**: Dialog appears → Click "Confirm"
7. **Backend**: `POST /api/submissions/copyediting/files/{fileId}/approve/`
8. **Result**:
   - File status → COPYEDITED
   - Redirects to `/editor/submissions/{id}/copyediting`
   - File moves to "Copyedited" tab
   - Author can now review

### Flow 2: Author Confirms File as Final

1. **Navigate**: `/author/submissions/active/{id}/copyediting` → "Copyedited Files" tab
2. **Review**: Click "Review" button on copyedited file
3. **Edit**: SuperDoc editor opens with `?readOnly=false`
4. **Review Changes**: Accept/reject tracked changes, add comments
5. **Save**: Auto-save changes
6. **Confirm**: Click "Confirm as Final" button in toolbar
7. **Confirm**: Dialog appears → Click "Confirm"
8. **Backend**: `POST /api/submissions/copyediting/files/{fileId}/confirm-final/`
9. **Result**:
   - File status → AUTHOR_FINAL
   - Redirects to copyediting page
   - File moves to "Confirmed" section
   - Editor can now complete assignment

### Flow 3: Editor Completes Copyediting Assignment

1. **Navigate**: `/editor/submissions/{id}/copyediting` → "Complete" tab
2. **Validate**: Check status overview:
   - ✅ 0 draft files
   - ✅ 0 copyedited files (awaiting author)
   - ✅ 5 author-final files
   - ✅ 0 final files
3. **Review**: Checklist shows:
   - ✅ All files submitted
   - ✅ All files author-confirmed
   - ✅ Ready to complete
4. **Complete**: Click "Complete Copyediting" button
5. **Notes**: (Optional) Add completion notes in dialog
6. **Confirm**: Click "Complete" in dialog
7. **Backend**: `POST /api/submissions/copyediting/assignments/{id}/complete/`
8. **Result**:
   - All AUTHOR_FINAL files → FINAL
   - Assignment status → COMPLETED
   - Submission stage → PRODUCTION (optional)
   - Success message + redirect

### Flow 4: Author Views Final Files

1. **Navigate**: `/author/submissions/active/{id}/copyediting` → "Final Files" tab
2. **View**: List of FINAL status files appears
3. **Actions**:
   - Click "View" → Opens SuperDoc with `?readOnly=true`
   - Click "Download" → Downloads file
4. **Read-Only**: Cannot edit, only view tracked changes and comments
5. **Completion**: Green banner indicates copyediting is complete

### Flow 5: Editor Reopens Resolved Discussion

1. **Navigate**: `/editor/submissions/{id}/copyediting` → "Discussions" tab
2. **View**: Click "View" on a RESOLVED discussion
3. **Dialog**: DiscussionThreadDialog opens
4. **Status**: Badge shows "RESOLVED"
5. **Reopen**: Click "Reopen Discussion" button in footer
6. **Backend**: `POST /api/submissions/copyediting/discussions/{id}/reopen/`
7. **Result**:
   - Status changes to OPEN
   - Badge updates to "OPEN"
   - Reply form becomes available
   - Success toast: "Discussion reopened successfully"

---

## Testing Guide

### Backend Testing

#### Test Approve File

```bash
# As editor/copyeditor
curl -X POST http://localhost:8000/api/submissions/copyediting/files/{file_id}/approve/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"

# Expected: 200 OK, file_type = COPYEDITED
```

#### Test Confirm File (Author)

```bash
# As author
curl -X POST http://localhost:8000/api/submissions/copyediting/files/{file_id}/confirm-final/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"confirmation_notes": "Looks good!"}'

# Expected: 200 OK, file_type = AUTHOR_FINAL
```

#### Test Complete Assignment (Editor)

```bash
# As editor
curl -X POST http://localhost:8000/api/submissions/copyediting/assignments/{assignment_id}/complete/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"completion_notes": "All files finalized"}'

# Expected: 200 OK, all AUTHOR_FINAL → FINAL, status = COMPLETED
```

#### Test Reopen Discussion

```bash
# As editor
curl -X POST http://localhost:8000/api/submissions/copyediting/discussions/{discussion_id}/reopen/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"

# Expected: 200 OK, status = OPEN
```

### Frontend Testing

#### Test Editor Approve Flow

1. Login as editor
2. Navigate to copyediting page
3. Click "Edit" on draft file
4. Click "Approve Copyediting"
5. Verify: Dialog shows, confirm works, redirects, file moves to Copyedited tab

#### Test Author Confirm Flow

1. Login as author
2. Navigate to copyediting page → Copyedited Files tab
3. Click "Review" on copyedited file
4. Verify: Editor opens with editing enabled
5. Click "Confirm as Final"
6. Verify: Dialog shows, confirm works, redirects, file moves to Confirmed section

#### Test Final Files Tab

1. Login as author
2. Complete copyediting (as editor)
3. Navigate to copyediting page → Final Files tab
4. Verify: FINAL files appear
5. Click "View"
6. Verify: Editor opens in read-only mode

#### Test Reopen Discussion

1. Login as editor
2. Mark discussion as resolved
3. Open resolved discussion
4. Verify: "Reopen Discussion" button appears
5. Click "Reopen Discussion"
6. Verify: Status changes to OPEN, reply form appears

#### Test Rich Text Editor Reset

1. Open any discussion
2. Type a reply
3. Submit reply
4. Verify: Editor content clears immediately
5. Verify: No residual HTML in editor

### Integration Testing

#### Complete Workflow Test

1. **Setup**: Create submission with copyediting assignment
2. **Upload**: Copyeditor uploads draft file
3. **Edit**: Editor edits and clicks "Approve Copyediting"
4. **Verify**: File status = COPYEDITED
5. **Review**: Author reviews and clicks "Confirm as Final"
6. **Verify**: File status = AUTHOR_FINAL
7. **Complete**: Editor clicks "Complete Copyediting"
8. **Verify**: All files = FINAL, assignment = COMPLETED
9. **View**: Author views final files in Final tab
10. **Verify**: Green completion banner, read-only access

---

## Error Handling

### Common Errors

#### 400 Bad Request

- **Cause**: Invalid file status transition (e.g., approve non-DRAFT file)
- **Message**: "Cannot approve file. File is not in DRAFT status."
- **Solution**: Check file status before action

#### 403 Forbidden

- **Cause**: Insufficient permissions (e.g., author tries to approve)
- **Message**: "You do not have permission to perform this action."
- **Solution**: Verify user role and endpoint

#### 404 Not Found

- **Cause**: File or assignment doesn't exist
- **Message**: "File not found."
- **Solution**: Verify IDs in request

### Frontend Error Display

- Toast notifications for API errors
- Error cards for component-level errors
- Retry buttons where applicable
- Detailed error messages from backend `detail` field

---

## Configuration

### Backend Settings

```python
# settings.py
COPYEDITING_FILE_TYPES = [
    ('DRAFT', 'Draft'),
    ('COPYEDITED', 'Copyedited'),
    ('AUTHOR_FINAL', 'Author Final'),
    ('FINAL', 'Final'),
]

DISCUSSION_STATUS_CHOICES = [
    ('OPEN', 'Open'),
    ('RESOLVED', 'Resolved'),
    ('CLOSED', 'Closed'),
]
```

### Frontend Constants

```javascript
// constants.js
export const FILE_STATUSES = {
  DRAFT: 'DRAFT',
  COPYEDITED: 'COPYEDITED',
  AUTHOR_FINAL: 'AUTHOR_FINAL',
  FINAL: 'FINAL',
};

export const DISCUSSION_STATUSES = {
  OPEN: 'OPEN',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
};
```

---

## Best Practices

### For Editors

1. ✅ Review all tracked changes before approving
2. ✅ Add completion notes when finalizing
3. ✅ Use discussions for clarifications
4. ✅ Reopen discussions if new issues arise
5. ❌ Don't complete assignment until all files are author-confirmed

### For Authors

1. ✅ Review all copyedited files carefully
2. ✅ Accept/reject changes with comments
3. ✅ Respond to discussions promptly
4. ✅ Add confirmation notes explaining decisions
5. ❌ Don't confirm files with unresolved queries

### For Copyeditors

1. ✅ Use track changes for all edits
2. ✅ Add comments explaining complex changes
3. ✅ Save work frequently
4. ✅ Notify authors of significant changes via discussions
5. ❌ Don't delete original content without tracking

---

## Troubleshooting

### Issue: Approve button not working

**Cause**: Missing `onApprove` prop or wrong function  
**Solution**: Verify `onApprove` is passed to `CopyeditingSuperDocEditor`

### Issue: Rich text editor not resetting

**Cause**: Only `form.setValue` called, editor state not cleared  
**Solution**: Use `form.reset({ message: "" })` instead

### Issue: Cannot complete assignment

**Cause**: Files still in COPYEDITED or DRAFT status  
**Solution**: Ensure all files are in AUTHOR_FINAL status before completing

### Issue: Reopen button not showing

**Cause**: Discussion not in RESOLVED status or user not editor  
**Solution**: Verify discussion status and user role

---

## Changelog

### Version 2.0 (Current)

- ✅ Added role-based approve/confirm functions
- ✅ Added Final section for authors
- ✅ Added reopen discussion functionality
- ✅ Fixed rich text editor reset issue
- ✅ Updated SuperDoc to accept custom approve props

### Version 1.0 (Previous)

- ✅ Basic copyediting workflow
- ✅ Draft, copyedited, author-final, final statuses
- ✅ Discussion system
- ✅ SuperDoc editor integration
- ✅ Completion validation

---

## Support

For questions or issues:

- Check this documentation first
- Review API responses for detailed error messages
- Test with smaller datasets
- Verify user roles and permissions
- Check browser console for frontend errors

---

**Last Updated**: January 2024  
**Version**: 2.0  
**Status**: Complete and Production-Ready
