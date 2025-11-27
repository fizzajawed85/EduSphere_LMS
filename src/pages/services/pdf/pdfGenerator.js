// pdfGenerator.js
/**
 * Heavy PDF generation should run on server. Here is a small client stub that
 * converts HTML/content object into a downloadable blob using jsPDF or leaves
 * a placeholder.
 *
 * If you want server PDF: create a backend endpoint that returns a PDF buffer.
 */

export function generateStudentPDF(student) {
  // placeholder: return JSON blob as download
  const content = JSON.stringify(student, null, 2);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  return { url, filename: `${student.firstName || "student"}-profile.json` };
}
