import { Education } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm = ({ data, onChange }: Props) => {
  const add = () =>
    onChange([...data, { id: crypto.randomUUID(), degree: "", institution: "", year: "" }]);
  const remove = (id: string) => onChange(data.filter((e) => e.id !== id));
  const update = (id: string, field: keyof Omit<Education, "id">, value: string) =>
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-foreground">Education</h3>
        <Button variant="ghost" size="sm" onClick={add} className="h-7 text-xs gap-1">
          <Plus className="h-3 w-3" /> Add
        </Button>
      </div>
      {data.map((edu) => (
        <div key={edu.id} className="space-y-2 rounded-md border border-border p-3 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(edu.id)}
            className="absolute top-2 right-2 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
          <Input placeholder="Degree (e.g. BCA)" value={edu.degree} onChange={(e) => update(edu.id, "degree", e.target.value)} className="h-8 text-sm" />
          <Input placeholder="Institution" value={edu.institution} onChange={(e) => update(edu.id, "institution", e.target.value)} className="h-8 text-sm" />
          <Input placeholder="Year (e.g. 2022 - 2025)" value={edu.year} onChange={(e) => update(edu.id, "year", e.target.value)} className="h-8 text-sm" />
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
