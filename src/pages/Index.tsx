import { useState } from "react";
import { ResumeData } from "@/types/resume";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import EducationForm from "@/components/EducationForm";
import ExperienceForm from "@/components/ExperienceForm";
import SkillsForm from "@/components/SkillsForm";
import ResumePreview from "@/components/ResumePreview";
import { generateResumePdf } from "@/lib/generatePdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
// import { localClient as supabase } from "@/integrations/localClient";
// import { supabase } from "@/integrations/localClient";
import { Download, Sparkles, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

const emptyResume: ResumeData = {
  personal: { fullName: "", email: "", phone: "", location: "", linkedin: "" },
  summary: "",
  education: [],
  experience: [],
  skills: [],
  jobTitle: "",
};

const Index = () => {
  const [resume, setResume] = useState<ResumeData>(emptyResume);
  const [aiLoading, setAiLoading] = useState(false);

  // const generateSummary = async () => {
  //   if (!resume.jobTitle) {
  //     toast.error("Please enter a target job title first.");
  //     return;
  //   }
  //   if (resume.skills.length === 0) {
  //     toast.error("Please add at least one skill.");
  //     return;
  //   }

  //   setAiLoading(true);
  //   try {
  //     const { data, error } = await supabase.functions.invoke("generate-summary", {
  //       body: { jobTitle: resume.jobTitle, skills: resume.skills },
  //     });

  //     if (error) throw error;
  //     if (data?.error) throw new Error(data.error);

  //     setResume((prev) => ({ ...prev, summary: data.summary }));
  //     toast.success("AI summary generated!");
  //   } catch (e: any) {
  //     console.error(e);
  //     toast.error(e.message || "Failed to generate summary.");
  //   } finally {
  //     setAiLoading(false);
  //   }
  // };

  const handleDownload = () => {
    if (!resume.personal.fullName) {
      toast.error("Please enter your name before downloading.");
      return;
    }
    generateResumePdf(resume);
    toast.success("PDF downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="font-heading text-lg font-bold text-foreground">Smart Resume Builder</h1>
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* Left: Form panel */}
        <aside className="space-y-5 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-2 pb-10">
          {/* Job Title */}
          <div className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground">Target Job Title</Label>
            <Input
              value={resume.jobTitle}
              onChange={(e) => setResume((p) => ({ ...p, jobTitle: e.target.value }))}
              placeholder="e.g. Software Developer"
              className="h-9 text-sm"
            />
          </div>

          <PersonalInfoForm data={resume.personal} onChange={(personal) => setResume((p) => ({ ...p, personal }))} />

          <Separator />

          <SkillsForm skills={resume.skills} onChange={(skills) => setResume((p) => ({ ...p, skills }))} />

          {/* AI Summary */}
          {/* <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-foreground">Professional Summary</h3>
              <Button variant="outline" size="sm" onClick={generateSummary} disabled={aiLoading} className="gap-1.5 text-xs">
                {aiLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                AI Generate
              </Button>
            </div>
            <Textarea
              value={resume.summary}
              onChange={(e) => setResume((p) => ({ ...p, summary: e.target.value }))}
              placeholder="Write or generate an AI-powered professional summary…"
              className="text-sm min-h-[80px]"
            />
          </div> */}

          <Separator />

          <ExperienceForm data={resume.experience} onChange={(experience) => setResume((p) => ({ ...p, experience }))} />

          <Separator />

          <EducationForm data={resume.education} onChange={(education) => setResume((p) => ({ ...p, education }))} />
        </aside>

        {/* Right: Live Preview */}
        <section className="lg:sticky lg:top-[76px] lg:self-start">
          <div className="rounded-lg border border-border bg-muted/30 p-6 min-h-[600px]">
            <ResumePreview data={resume} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
