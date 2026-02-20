import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

interface Props {
  data: ResumeData;
}

const ResumePreview = ({ data }: Props) => {
  const { personal, summary, education, experience, skills } = data;
  const hasContent = personal.fullName || summary || education.length > 0 || experience.length > 0 || skills.length > 0;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Fill in the form to see your resume preview
      </div>
    );
  }

  return (
    <div className="bg-card p-8 shadow-card rounded-lg max-w-[700px] mx-auto animate-fade-in font-body text-card-foreground" id="resume-preview">
      {/* Header */}
      <div className="text-center mb-5">
        {personal.fullName && (
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {personal.fullName}
          </h1>
        )}
        {data.jobTitle && (
          <p className="text-primary font-medium text-sm mt-0.5">{data.jobTitle}</p>
        )}
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
          {personal.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{personal.email}</span>}
          {personal.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{personal.phone}</span>}
          {personal.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{personal.location}</span>}
          {personal.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 className="resume-section-title">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-foreground/85">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && experience.some((e) => e.title) && (
        <div className="mb-5">
          <h2 className="resume-section-title">Experience</h2>
          <div className="space-y-3">
            {experience.filter((e) => e.title).map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm text-foreground">{exp.title}</h3>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{exp.duration}</span>
                </div>
                {exp.company && <p className="text-xs text-primary font-medium">{exp.company}</p>}
                {exp.description && <p className="text-xs text-foreground/75 mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education.some((e) => e.degree) && (
        <div className="mb-5">
          <h2 className="resume-section-title">Education</h2>
          <div className="space-y-2">
            {education.filter((e) => e.degree).map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{edu.degree}</h3>
                  {edu.institution && <p className="text-xs text-muted-foreground">{edu.institution}</p>}
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-2">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="resume-section-title">Skills</h2>
          <p className="text-sm text-foreground/85">{skills.join("  •  ")}</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
