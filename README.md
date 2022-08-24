### Objective
Frontend and backend components of an invoicing application for an accounting department.

### Brief

Users are able to:

- Create, read, update, and delete invoices
- Create corresponding API endpoints
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this)

### Expected Behaviour

- Creating an invoice
- When creating a new invoice, an ID needs to be created. Each ID should be 2 random uppercased letters followed by 4 random numbers. [X]
- Invoices can be created either as drafts or as pending. Clicking "Save as Draft" should allow the user to leave any form field blank, but should create an ID if one doesn't exist and set the status to "draft". Clicking "Save & Send" should require all forms fields to be filled in, and should set the status to "pending". [X]
- Changing the Payments Terms field should set the `paymentDue` property based on the `createdAt` date plus the numbers of days set for the payment terms. [X]
  - The `total` should be the sum of all items on the invoice.[X]
- Editing an invoice
  - When saving changes to an invoice, all fields are required when the "Save Changes" button is clicked. If the user clicks "Cancel", any unsaved changes should be reset.
  - If the invoice being edited is a "draft", the status needs to be updated to "pending" when the "Save Changes" button is clicked. All fields are required at this stage.[X]
- Users should be able to mark invoices as paid by clicking the "Mark as Paid" button. This should change the invoice's status to "paid".  [X]
- Feel free not to add custom styling for the date and dropdown form fields. The designs for those fields are optional extras and are mostly for illustration purposes.
