# Copyediting Workflow Quick Reference

## Quick Links

- 📚 [Complete Documentation](./COMPLETE_COPYEDITING_WORKFLOW.md)
- 📋 [Enhancement Summary](./COPYEDITING_ENHANCEMENT_SUMMARY.md)
- 🏗️ [Backend API](../../../journal-portal-backend/docs/COPYEDITING_WORKFLOW_BACKEND.md)

---

## API Endpoints Cheat Sheet

### Editor Actions

```bash
# Approve draft file → COPYEDITED
POST /api/submissions/copyediting/files/{id}/approve/

# Complete assignment (all files → FINAL)
POST /api/submissions/copyediting/assignments/{id}/complete/
Body: { "completion_notes": "..." }

# Reopen resolved discussion
POST /api/submissions/copyediting/discussions/{id}/reopen/
```

### Author Actions

```bash
# Confirm copyedited file → AUTHOR_FINAL
POST /api/submissions/copyediting/files/{id}/confirm-final/
Body: { "confirmation_notes": "..." }

# Get copyedited files (split by status)
GET /api/submissions/copyediting/assignments/{id}/copyedited-files/
```

### Common Actions

```bash
# Mark discussion as resolved
POST /api/submissions/copyediting/discussions/{id}/close/

# Add message to discussion
POST /api/submissions/copyediting/discussions/{id}/add_message/
Body: { "message": "<p>HTML content</p>" }
```

---

## Component Usage

### SuperDoc Editor (Editor Role)

```jsx
import { CopyeditingSuperDocEditor } from '@/features';
import { useApproveCopyeditingFile } from '@/features/panel/editor/submission/hooks';

const approveMutation = useApproveCopyeditingFile();

const handleApprove = async (fileId) => {
  return new Promise((resolve, reject) => {
    approveMutation.mutate(fileId, {
      onSuccess: () => {
        toast.success('Approved');
        resolve();
      },
      onError: (error) => {
        toast.error(error.message);
        reject(error);
      },
    });
  });
};

<CopyeditingSuperDocEditor
  fileId={fileId}
  userData={{ first_name, email }}
  onApprove={handleApprove}
  approveButtonText="Approve Copyediting"
  approveDialogTitle="Approve Copyediting File"
  approveDialogDescription="Mark as copyedited and ready for author review."
  goBack="/path/back"
/>;
```

### SuperDoc Editor (Author Role)

```jsx
import { useConfirmFileFinal } from '@/features/panel/editor/submission/hooks';

const confirmMutation = useConfirmFileFinal();

const handleConfirm = async (fileId) => {
  return new Promise((resolve, reject) => {
    confirmMutation.mutate(
      { fileId, data: {} },
      {
        onSuccess: () => {
          toast.success('Confirmed');
          resolve();
        },
        onError: (error) => {
          toast.error(error.message);
          reject(error);
        },
      }
    );
  });
};

<CopyeditingSuperDocEditor
  fileId={fileId}
  userData={{ first_name, email }}
  readOnly={isReadOnly}
  onApprove={isReadOnly ? null : handleConfirm}
  approveButtonText="Confirm as Final"
  approveDialogTitle="Confirm File as Final"
  approveDialogDescription="Mark as author-approved and ready for completion."
  showApproveButton={!isReadOnly}
  goBack="/path/back"
/>;
```

### Author View Final Files

```jsx
import { AuthorViewFinalFiles } from '@/features/panel/author/components/copyediting/AuthorViewFinalFiles';

<AuthorViewFinalFiles assignmentId={assignmentId} submissionId={submissionId} />;
```

---

## File Status Flow

```
DRAFT ----------> COPYEDITED ----------> AUTHOR_FINAL ----------> FINAL
      (approve)            (confirm)                  (complete)
```

### Who Can Transition?

- **DRAFT → COPYEDITED**: Editor/Copyeditor via approve
- **COPYEDITED → AUTHOR_FINAL**: Author via confirm-final
- **AUTHOR_FINAL → FINAL**: Editor via complete (bulk action)

---

## Discussion Status Flow

```
OPEN <--------> RESOLVED
     (resolve)   (reopen)
```

### Who Can Transition?

- **OPEN → RESOLVED**: Editor only (Mark as Resolved)
- **RESOLVED → OPEN**: Editor only (Reopen Discussion)

---

## Role Permissions Matrix

| Action                     | Editor | Copyeditor | Author |
| -------------------------- | ------ | ---------- | ------ |
| Upload draft files         | ✅     | ✅         | ❌     |
| Edit draft files           | ✅     | ✅         | ❌     |
| **Approve files**          | ✅     | ✅         | ❌     |
| View copyedited files      | ✅     | ✅         | ✅     |
| Edit copyedited files      | ❌     | ❌         | ✅     |
| **Confirm files as final** | ❌     | ❌         | ✅     |
| View author-final files    | ✅     | ✅         | ✅     |
| Edit author-final files    | ❌     | ❌         | ❌     |
| **Complete assignment**    | ✅     | ❌         | ❌     |
| View final files           | ✅     | ✅         | ✅     |
| Create discussion          | ✅     | ✅         | ✅     |
| Reply to discussion        | ✅     | ✅         | ✅     |
| **Resolve discussion**     | ✅     | ❌         | ❌     |
| **Reopen discussion**      | ✅     | ❌         | ❌     |

---

## Common Patterns

### Check File Status Before Action

```javascript
if (file.file_type === 'DRAFT') {
  // Can approve
} else if (file.file_type === 'COPYEDITED') {
  // Can confirm (author only)
} else if (file.file_type === 'AUTHOR_FINAL') {
  // Can complete assignment (editor only)
} else {
  // Already final
}
```

### Validate Before Complete

```javascript
const canComplete =
  assignment.status === 'IN_PROGRESS' &&
  draftCount === 0 &&
  copyeditedCount === 0 &&
  authorFinalCount > 0;
```

### Handle Rich Text Editor Reset

```javascript
// ❌ Wrong - only updates form value
form.setValue('message', '');

// ✅ Right - resets entire form state
form.reset({ message: '' });
form.setValue('message', '', { shouldValidate: false });
```

---

## Troubleshooting

### Problem: Approve button doesn't work

**Solution**: Ensure `onApprove` prop is passed to SuperDoc

```jsx
<CopyeditingSuperDocEditor onApprove={handleApprove} />
```

### Problem: Can't complete assignment

**Check**: All files must be AUTHOR_FINAL status

```bash
GET /api/submissions/copyediting/assignments/{id}/files/
# Verify file_type for all files
```

### Problem: Reopen button not showing

**Check**: Discussion must be RESOLVED and user must be editor

```jsx
{
  discussion.status === 'RESOLVED' && isEditor && <Button onClick={handleReopen}>Reopen</Button>;
}
```

### Problem: Rich text editor not clearing

**Solution**: Use `form.reset()` instead of just `setValue()`

```javascript
form.reset({ message: '' });
```

---

## Testing Commands

### Backend Unit Tests

```bash
cd journal-portal-backend
python manage.py test apps.submissions.tests.test_copyediting
```

### Frontend Component Tests

```bash
cd journal-portal-frontend
npm test -- CopyeditingSuperDocEditor
npm test -- AuthorViewFinalFiles
npm test -- DiscussionThreadDialog
```

### Integration Test

```bash
# Manual test flow:
1. Login as editor
2. Upload draft → Approve
3. Login as author
4. Confirm file as final
5. Login as editor
6. Complete assignment
7. Login as author
8. View final files tab
```

---

## URLs

### Editor Routes

```
/editor/submissions/{id}/copyediting
/editor/submissions/{id}/copyediting/edit/{fileId}
```

### Author Routes

```
/author/submissions/active/{id}/copyediting
/author/submissions/active/{id}/copyediting/edit/{fileId}?readOnly=false
/author/submissions/active/{id}/copyediting/edit/{fileId}?readOnly=true
```

### Query Parameters

- `?readOnly=false` - Enable editing (author copyedited files)
- `?readOnly=true` - View only (draft files, final files)

---

## Key Files

### Components

- `features/shared/components/SuperDoc/CopyeditingSuperDocEditor.jsx`
- `features/panel/author/components/copyediting/AuthorViewFinalFiles.jsx`
- `features/panel/editor/submission/components/copyediting/AuthorConfirmCopyeditedFiles.jsx`
- `features/panel/editor/submission/components/copyediting/EditorCompleteCopyediting.jsx`
- `features/panel/editor/submission/components/copyediting/DiscussionThreadDialog.jsx`

### Hooks

- `features/panel/editor/submission/hooks/mutation/useCopyeditingFiles.js`
  - `useApproveCopyeditingFile()`
  - `useConfirmFileFinal()`
- `features/panel/editor/submission/hooks/mutation/useCopyeditingAssignments.js`
  - `useCompleteCopyeditingAssignment()`
- `features/panel/editor/submission/hooks/mutation/useCopyeditingDiscussions.js`
  - `useReopenCopyeditingDiscussion()`

### API

- `features/panel/editor/submission/api/copyeditingApi.js`

---

## Version Info

- **Current Version**: 2.0
- **Last Updated**: January 2024
- **Status**: Production Ready
- **Breaking Changes**: None

---

## Support

- 📖 Full Documentation: `COMPLETE_COPYEDITING_WORKFLOW.md`
- 📋 Summary: `COPYEDITING_ENHANCEMENT_SUMMARY.md`
- 🐛 Issues: Check browser console and API responses
- 💡 Questions: Review troubleshooting section first
