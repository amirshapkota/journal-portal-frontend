# Staff Management Componentization

## Overview

Refactored the staff management pages into smaller, reusable components following best practices for maintainability and code organization.

## Changes Made

### 1. Component Structure

Created reusable components in `features/panel/journal-manager/components/staff/`:

#### Editor-in-Chief Components

- **EditorStatsCards** - Display statistics for journals and editor assignments
- **EditorInChiefTable** - DataTable showing all journals with their editor assignments
- **AssignEditorDialog** - Dialog for assigning/changing editors with user search

#### Staff Members Components

- **StaffStatsCards** - Display staff statistics across all roles
- **StaffMembersTable** - DataTable showing all staff members across journals
- **AddStaffDialog** - Dialog for adding new staff members with user search
- **EditStaffDialog** - Dialog for editing existing staff member roles
- **DeleteStaffDialog** - Confirmation dialog for removing staff members

### 2. Updated Components

All components now:

- Use the **DataTable** component instead of manual Table implementation
- Integrate **React Query hooks** (useGetJournals, useSearchUsers, useUpdateJournalStaff, etc.)
- Use correct **API field names** (editor_in_chief.first_name, journal.title, etc.)
- Include **toast notifications** (sonner) for user feedback
- Have **proper loading states** with isPending
- Handle **errors gracefully** with ErrorCard
- Include **search functionality** with debounced user search in dialogs

### 3. Refactored Pages

#### editor-in-chief/page.jsx

**Before:** ~328 lines with all logic inline
**After:** ~95 lines using components

Features:

- Simplified state management (only dialog open/close and selected journal)
- Components handle all UI rendering and mutations
- FilterToolbar with URL params for search
- Clean separation of concerns

#### staff-members/page.jsx

**Before:** ~577 lines with all logic inline
**After:** ~140 lines using components

Features:

- Staff aggregation logic remains in page (business logic)
- Components handle all UI and CRUD operations
- FilterToolbar with search and journal filter
- Add/Edit/Delete operations through reusable dialogs

### 4. API Integration

All components now properly use:

- **useGetJournals** - Fetch journals with pagination and search
- **useSearchUsers** - Search for users when assigning staff
- **useUpdateJournalStaff** - Update editor-in-chief or staff roles
- **useAddJournalStaff** - Add new staff members to journals
- **useRemoveJournalStaff** - Remove staff members from journals

### 5. Field Mappings

Correctly mapped API fields:

- `editor_in_chief` object with `first_name`, `last_name`, `email`
- `journal.title` instead of `journal.name`
- `staff.user_id`, `staff.journal_id` for mutations
- `staff.role` as uppercase with underscores (SECTION_EDITOR, etc.)

### 6. User Experience Improvements

- **Search functionality** in dialogs for finding users
- **Loading states** with skeleton or disabled inputs
- **Toast notifications** for success/error feedback
- **Debounced search** to reduce API calls
- **Validation** before allowing form submission
- **Error handling** with retry functionality

## Benefits

### Maintainability

- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Components can be used in other parts of the app
- **Testability**: Smaller components are easier to test
- **Readability**: Page files are now ~60-75% smaller

### Performance

- **Code splitting**: Components are separate files
- **Lazy loading**: Can implement on-demand loading
- **Memoization**: Easier to optimize individual components

### Developer Experience

- **Clear structure**: Easy to find and modify specific functionality
- **Type safety**: Better IDE support with smaller files
- **Less cognitive load**: Understand one component at a time
- **Consistent patterns**: All dialogs follow same structure

## File Organization

```
features/panel/journal-manager/
├── components/
│   └── staff/
│       ├── index.js                    # Component exports
│       ├── EditorStatsCards.jsx        # Stats for editor page
│       ├── EditorInChiefTable.jsx      # Table for editor page
│       ├── AssignEditorDialog.jsx      # Assign/change editor dialog
│       ├── StaffStatsCards.jsx         # Stats for staff page
│       ├── StaffMembersTable.jsx       # Table for staff page
│       ├── AddStaffDialog.jsx          # Add staff dialog
│       ├── EditStaffDialog.jsx         # Edit staff dialog
│       └── DeleteStaffDialog.jsx       # Delete confirmation dialog
├── hooks/
│   ├── useGetJournals.js
│   ├── useSearchUsers.js
│   ├── useUpdateJournalStaff.js
│   ├── useAddJournalStaff.js
│   └── useRemoveJournalStaff.js
└── api/
    └── journalManagerApi.js

app/(panel)/journal_manager/staff-management/
├── editor-in-chief/
│   └── page.jsx                        # ~95 lines (was 328)
└── staff-members/
    └── page.jsx                        # ~140 lines (was 577)
```

## Next Steps

Consider further improvements:

1. Add unit tests for components
2. Implement optimistic updates for mutations
3. Add pagination to staff members table
4. Create shared dialog wrapper for consistent styling
5. Extract role formatting logic to a utility function
6. Add keyboard shortcuts for common actions

## Migration Guide

If you need to modify functionality:

### To update stats display:

Edit `EditorStatsCards.jsx` or `StaffStatsCards.jsx`

### To modify table columns:

Edit `EditorInChiefTable.jsx` or `StaffMembersTable.jsx` columns array

### To change dialog behavior:

Edit individual dialog components (AddStaffDialog.jsx, etc.)

### To update API calls:

Modify hooks in `features/panel/journal-manager/hooks/`

### To change search filters:

Edit FilterToolbar usage in page files

## Testing

All pages should be tested for:

- ✅ Stats display correctly with real data
- ✅ Tables render with proper columns and data
- ✅ Search functionality filters results
- ✅ Dialogs open/close properly
- ✅ Mutations update data and show toasts
- ✅ Loading states display during API calls
- ✅ Error states show with retry option
- ✅ URL params sync with FilterToolbar

## Conclusion

The refactoring successfully reduced code duplication, improved maintainability, and established a clear pattern for future feature development. Each component is now focused, testable, and reusable across the application.
