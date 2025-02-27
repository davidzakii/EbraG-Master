export interface TableCell {
  label?: string; // Optional because some cells might not have text
  value?: number; // Optional because of rows with colspan
  colspan?: number; // Optional for spanning cells across columns
}
