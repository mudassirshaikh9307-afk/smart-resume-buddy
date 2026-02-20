import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Props {
  skills: string[];
  onChange: (skills: string[]) => void;
}

const SkillsForm = ({ skills, onChange }: Props) => {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
      setInput("");
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-heading text-lg font-semibold text-foreground">Skills</h3>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          placeholder="Type a skill & press Enter"
          className="h-8 text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="gap-1 text-xs cursor-pointer hover:bg-destructive/10" onClick={() => onChange(skills.filter((s) => s !== skill))}>
            {skill}
            <X className="h-2.5 w-2.5" />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
