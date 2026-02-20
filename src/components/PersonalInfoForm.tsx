import { PersonalInfo } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Linkedin } from "lucide-react";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const fields = [
  { key: "fullName" as const, label: "Full Name", icon: User, placeholder: "John Doe" },
  { key: "email" as const, label: "Email", icon: Mail, placeholder: "john@example.com" },
  { key: "phone" as const, label: "Phone", icon: Phone, placeholder: "+1 234 567 890" },
  { key: "location" as const, label: "Location", icon: MapPin, placeholder: "New York, NY" },
  { key: "linkedin" as const, label: "LinkedIn", icon: Linkedin, placeholder: "linkedin.com/in/johndoe" },
];

const PersonalInfoForm = ({ data, onChange }: Props) => (
  <div className="space-y-3">
    <h3 className="font-heading text-lg font-semibold text-foreground">Personal Information</h3>
    {fields.map(({ key, label, icon: Icon, placeholder }) => (
      <div key={key} className="space-y-1">
        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Icon className="h-3 w-3" /> {label}
        </Label>
        <Input
          value={data[key]}
          onChange={(e) => onChange({ ...data, [key]: e.target.value })}
          placeholder={placeholder}
          className="h-9 text-sm"
        />
      </div>
    ))}
  </div>
);

export default PersonalInfoForm;
