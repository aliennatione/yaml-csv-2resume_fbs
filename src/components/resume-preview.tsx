"use client";

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

  return (
    <Card id="resume-container" className="max-w-4xl mx-auto shadow-lg">
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
            <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">
              {personalInfo.name}
            </h1>
            {personalInfo.title && <p className="text-xl text-accent mt-1">{personalInfo.title}</p>}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-foreground mb-8 text-center sm:text-left">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors"><Mail className="w-4 h-4" /><span>{personalInfo.email}</span></a>
            <a href={`tel:${personalInfo.phone}`} className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors"><Phone className="w-4 h-4" /><span>{personalInfo.phone}</span></a>
            <div className="flex items-center justify-center sm:justify-start gap-2"><MapPin className="w-4 h-4" /><span>{personalInfo.location}</span></div>
            {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors"><LinkedinIcon className="w-4 h-4" /><span>{personalInfo.linkedin}</span></a>}
            {personalInfo.github && <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors"><GithubIcon className="w-4 h-4" /><span>{personalInfo.github}</span></a>}
            {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-accent transition-colors"><Globe className="w-4 h-4" /><span>{personalInfo.website}</span></a>}
        </div>

        <Separator className="my-8" />
        
        <div className="relative group">
            <p className="text-foreground/90 leading-relaxed">{summary}</p>
        </div>


        <Separator className="my-8" />

        <Section icon={<Briefcase className="w-6 h-6 text-accent" />} title="Experience">
          {experience.map((exp, expIndex) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <p className="font-medium text-foreground/80">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                  {(exp.startDate || exp.endDate) && <p>{exp.startDate}{exp.startDate && exp.endDate && ' - '}{exp.endDate}</p>}
                  {exp.location && <p>{exp.location}</p>}
                </div>
              </div>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-foreground/90">
                {exp.description.map((desc, descIndex) => (
                  <li key={descIndex} className="relative group/item">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
        
        <Section icon={<GraduationCap className="w-6 h-6 text-accent" />} title="Education">
          {education.map((edu) => (
            <div key={edu.id} className="mb-4 flex justify-between items-start">
               <div>
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <p className="font-medium text-foreground/80">{edu.institution}</p>
                  {edu.field && <p className="text-sm text-muted-foreground">{edu.field}</p>}
                </div>
                <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                  {(edu.startDate || edu.endDate) && <p>{edu.startDate}{edu.startDate && edu.endDate && ' - '}{edu.endDate}</p>}
                </div>
            </div>
          ))}
        </Section>

        <Section icon={<Award className="w-6 h-6 text-accent" />} title="Skills">
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <Badge key={skill.id} variant="secondary" className="text-base font-medium bg-accent/10 text-accent hover:bg-accent/20">{skill.name}</Badge>
                ))}
            </div>
        </Section>
        
        <Section icon={<Lightbulb className="w-6 h-6 text-accent" />} title="Projects">
            {projects.map(proj => (
                <div key={proj.id} className="mb-4">
                    <a href={proj.url ? `https://${proj.url}` : '#'} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-accent transition-colors">{proj.name}</a>
                    <p className="text-foreground/90 mt-1">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {proj.technologies.map(tech => (
                             <Badge key={tech} variant="outline" className="text-sm">{tech}</Badge>
                        ))}
                    </div>
                </div>
            ))}
        </Section>
      </CardContent>
    </Card>
  );
}
