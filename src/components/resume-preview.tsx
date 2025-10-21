"use client";

import * as React from "react";
import { useReactToPrint } from "react-to-print";
import type { ResumeData } from "@/lib/resume-data";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Sparkles,
  Lightbulb,
  Award,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditableField } from "./editable-field";

type ResumePreviewProps = {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
};

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <section className="mb-8">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-2xl font-bold font-headline text-primary ml-3">
        {title}
      </h2>
    </div>
    <div className="ml-[36px]">{children}</div>
  </section>
);

export function ResumePreview({ data, setData }: ResumePreviewProps) {
  const { personalInfo, summary, experience, education, skills, projects } = data;
  const resumeRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });

  const handleSave = (field: string, value: any) => {
    const keys = field.split('.');
    setData(prevData => {
        const newData = JSON.parse(JSON.stringify(prevData));
        let current: any = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            current = current[key];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handlePrint}>Export to PDF</Button>
      </div>
      <Card ref={resumeRef} id="resume-container" className="max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-8 sm:p-12">
          <header className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            <Image
              src={personalInfo.profilePictureUrl}
              alt={`${personalInfo.name} profile picture`}
              width={128}
              height={128}
              className="rounded-full object-cover aspect-square"
              data-ai-hint={personalInfo.profilePictureHint}
            />
            <div className="text-center sm:text-left">
              <EditableField
                as="h1"
                value={personalInfo.name}
                onSave={(value) => handleSave('personalInfo.name', value)}
                className="text-4xl sm:text-5xl font-bold font-headline text-primary"
              />
              {personalInfo.title && (
                  <EditableField
                      as="p"
                      value={personalInfo.title}
                      onSave={(value) => handleSave('personalInfo.title', value)}
                      className="text-xl text-accent mt-1"
                  />
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-foreground mb-8 text-center sm:text-left">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <EditableField as="span" value={personalInfo.email} onSave={(value) => handleSave('personalInfo.email', value)} />
              </a>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <EditableField as="span" value={personalInfo.phone} onSave={(value) => handleSave('personalInfo.phone', value)} />
              </a>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                <EditableField as="span" value={personalInfo.location} onSave={(value) => handleSave('personalInfo.location', value)} />
              </div>
              {personalInfo.linkedin && (
                <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                  <EditableField as="span" value={personalInfo.linkedin} onSave={(value) => handleSave('personalInfo.linkedin', value)} />
                </a>
              )}
              {personalInfo.github && (
                <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors">
                  <GithubIcon className="w-4 h-4" />
                  <EditableField as="span" value={personalInfo.github} onSave={(value) => handleSave('personalInfo.github', value)} />
                  </a>
              )}
              {personalInfo.website && (
                <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors">
                  <Globe className="w-4 h-4" />
                  <EditableField as="span" value={personalInfo.website} onSave={(value) => handleSave('personalInfo.website', value)} />
                </a>
              )}
          </div>

          <Separator className="my-8" />
          
          <div className="relative group">
              <EditableField
                  as="textarea"
                  value={summary}
                  onSave={(value) => handleSave('summary', value)}
                  className="text-foreground/90 leading-relaxed"
              />
          </div>


          <Separator className="my-8" />

          <Section icon={<Briefcase className="w-6 h-6 text-accent" />} title="Experience">
            {experience.map((exp, expIndex) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <EditableField as="h3" value={exp.title} onSave={(value) => handleSave(`experience.${expIndex}.title`, value)} className="text-lg font-semibold" />
                    <EditableField as="p" value={exp.company} onSave={(value) => handleSave(`experience.${expIndex}.company`, value)} className="font-medium text-foreground/80" />
                  </div>
                  <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                    {(exp.startDate || exp.endDate) && 
                      <p>
                          <EditableField as="span" value={exp.startDate} onSave={(value) => handleSave(`experience.${expIndex}.startDate`, value)} />
                          {exp.startDate && exp.endDate && ' - '}
                          <EditableField as="span" value={exp.endDate} onSave={(value) => handleSave(`experience.${expIndex}.endDate`, value)} />
                      </p>}
                    {exp.location && <EditableField as="p" value={exp.location} onSave={(value) => handleSave(`experience.${expIndex}.location`, value)} />}
                  </div>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-foreground/90">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className="relative group/item">
                      <EditableField as="textarea" value={desc} onSave={(value) => handleSave(`experience.${expIndex}.description.${descIndex}`, value)} className="w-full" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
          
          <Section icon={<GraduationCap className="w-6 h-6 text-accent" />} title="Education">
            {education.map((edu, eduIndex) => (
              <div key={edu.id} className="mb-4 flex justify-between items-start">
                 <div>
                    <EditableField as="h3" value={edu.degree} onSave={(value) => handleSave(`education.${eduIndex}.degree`, value)} className="text-lg font-semibold" />
                    <EditableField as="p" value={edu.institution} onSave={(value) => handleSave(`education.${eduIndex}.institution`, value)} className="font-medium text-foreground/80" />
                    {edu.field && <EditableField as="p" value={edu.field} onSave={(value) => handleSave(`education.${eduIndex}.field`, value)} className="text-sm text-muted-foreground" />}
                  </div>
                  <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                    {(edu.startDate || edu.endDate) && <p>
                        <EditableField as="span" value={edu.startDate} onSave={(value) => handleSave(`education.${eduIndex}.startDate`, value)} />
                        {edu.startDate && edu.endDate && ' - '}
                        <EditableField as="span" value={edu.endDate} onSave={(value) => handleSave(`education.${eduIndex}.endDate`, value)} />
                    </p>}
                  </div>
              </div>
            ))}
          </Section>

          <Section icon={<Award className="w-6 h-6 text-accent" />} title="Skills">
              <div className="flex flex-wrap gap-2">
                  {skills.map((skill, skillIndex) => (
                      <Badge key={skill.id} variant="secondary" className="text-base font-medium bg-accent/10 text-accent hover:bg-accent/20">
                          <EditableField as="span" value={skill.name} onSave={(value) => handleSave(`skills.${skillIndex}.name`, value)} />
                      </Badge>
                  ))}
              </div>
          </Section>
          
          <Section icon={<Lightbulb className="w-6 h-6 text-accent" />} title="Projects">
              {projects.map((proj, projIndex) => (
                  <div key={proj.id} className="mb-4">
                      <EditableField as="a" value={proj.name} onSave={(value) => handleSave(`projects.${projIndex}.name`, value)} href={proj.url ? `https://${proj.url}` : '#'} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-accent transition-colors" />
                      <EditableField as="textarea" value={proj.description} onSave={(value) => handleSave(`projects.${projIndex}.description`, value)} className="text-foreground/90 mt-1 w-full" />
                      <div className="flex flex-wrap gap-2 mt-2">
                          {proj.technologies.map((tech, techIndex) => (
                               <Badge key={tech} variant="outline" className="text-sm">
                                  <EditableField as="span" value={tech} onSave={(value) => handleSave(`projects.${projIndex}.technologies.${techIndex}`, value)} />
                               </Badge>
                          ))}
                      </div>
                  </div>
              ))}
          </Section>
        </CardContent>
      </Card>
    </div>
  );
}
