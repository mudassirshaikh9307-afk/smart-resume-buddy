import jsPDF from "jspdf";
import { ResumeData } from "@/types/resume";

export function generateResumePdf(data: ResumeData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const addLine = () => {
    doc.setDrawColor(60, 100, 160);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  };

  const checkPage = (needed: number) => {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  };

  // Header
  if (data.personal.fullName) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(30, 40, 60);
    doc.text(data.personal.fullName, pageWidth / 2, y, { align: "center" });
    y += 7;
  }

  if (data.jobTitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(60, 100, 160);
    doc.text(data.jobTitle, pageWidth / 2, y, { align: "center" });
    y += 6;
  }

  const contactParts: string[] = [];
  if (data.personal.email) contactParts.push(data.personal.email);
  if (data.personal.phone) contactParts.push(data.personal.phone);
  if (data.personal.location) contactParts.push(data.personal.location);
  if (data.personal.linkedin) contactParts.push(data.personal.linkedin);

  if (contactParts.length) {
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(contactParts.join("  |  "), pageWidth / 2, y, { align: "center" });
    y += 6;
  }

  addLine();

  // Summary
  if (data.summary) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(60, 100, 160);
    doc.text("PROFESSIONAL SUMMARY", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    const lines = doc.splitTextToSize(data.summary, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 4.5 + 4;
  }

  // Experience
  const filledExp = data.experience.filter((e) => e.title);
  if (filledExp.length) {
    checkPage(15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(60, 100, 160);
    doc.text("EXPERIENCE", margin, y);
    y += 5;

    filledExp.forEach((exp) => {
      checkPage(18);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 40, 60);
      doc.text(exp.title, margin, y);
      if (exp.duration) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(exp.duration, pageWidth - margin, y, { align: "right" });
      }
      y += 4;
      if (exp.company) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor(60, 100, 160);
        doc.text(exp.company, margin, y);
        y += 4;
      }
      if (exp.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(exp.description, contentWidth);
        doc.text(descLines, margin, y);
        y += descLines.length * 3.8 + 3;
      }
    });
    y += 2;
  }

  // Education
  const filledEdu = data.education.filter((e) => e.degree);
  if (filledEdu.length) {
    checkPage(15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(60, 100, 160);
    doc.text("EDUCATION", margin, y);
    y += 5;

    filledEdu.forEach((edu) => {
      checkPage(10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 40, 60);
      doc.text(edu.degree, margin, y);
      if (edu.year) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(edu.year, pageWidth - margin, y, { align: "right" });
      }
      y += 4;
      if (edu.institution) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        doc.text(edu.institution, margin, y);
        y += 5;
      }
    });
    y += 2;
  }

  // Skills
  if (data.skills.length) {
    checkPage(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(60, 100, 160);
    doc.text("SKILLS", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    const skillText = data.skills.join("  •  ");
    const skillLines = doc.splitTextToSize(skillText, contentWidth);
    doc.text(skillLines, margin, y);
  }

  doc.save(`${data.personal.fullName || "resume"}.pdf`);
}
