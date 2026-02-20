import { Experience } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm = ({ data, onChange }: Props) => {
  const add = () =>
    onChange([...data, { id: crypto.randomUUID(), title: "", company: "", duration: "", description: "" }]);
  const remove = (id: string) => onChange(data.filter((e) => e.id !== id));
  const update = (id: string, field: keyof Omit<Experience, "id">, value: string) =>
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-foreground">Experience</h3>
        <Button variant="ghost" size="sm" onClick={add} className="h-7 text-xs gap-1">
          <Plus className="h-3 w-3" /> Add
        </Button>
      </div>
      {data.map((exp) => (
        <div key={exp.id} className="space-y-2 rounded-md border border-border p-3 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(exp.id)}
            className="absolute top-2 right-2 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
          <Input placeholder="Job Title" value={exp.title} onChange={(e) => update(exp.id, "title", e.target.value)} className="h-8 text-sm" />
          <Input placeholder="Company" value={exp.company} onChange={(e) => update(exp.id, "company", e.target.value)} className="h-8 text-sm" />
          <Input placeholder="Duration (e.g. Jan 2023 - Present)" value={exp.duration} onChange={(e) => update(exp.id, "duration", e.target.value)} className="h-8 text-sm" />
          <Textarea placeholder="Describe your responsibilities…" value={exp.description} onChange={(e) => update(exp.id, "description", e.target.value)} className="text-sm min-h-[60px]" />
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;
