import { PlaceHolderImages } from './placeholder-images';

const profilePic = PlaceHolderImages.find(p => p.id === 'profile-picture');

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  profilePictureUrl: string;
  profilePictureHint: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "Alex Doe",
    title: "Senior Software Engineer",
    email: "alex.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexdoe",
    github: "github.com/alexdoe",
    website: "alexdoe.dev",
    profilePictureUrl: profilePic?.imageUrl || "",
    profilePictureHint: profilePic?.imageHint || "professional portrait"
  },
  summary: "Results-driven Senior Software Engineer with over 8 years of experience in designing, developing, and deploying scalable web applications. Proficient in JavaScript/TypeScript, React, and Node.js, with a strong background in cloud infrastructure and DevOps practices. Passionate about building high-quality software and leading engineering teams to success.",
  experience: [
    {
      id: "exp1",
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      description: [
        "Lead the development of a new microservices-based architecture, improving system scalability and reducing latency by 40%.",
        "Mentor junior engineers, conduct code reviews, and establish best practices for front-end development.",
        "Collaborate with product managers and designers to translate requirements into technical specifications and elegant user interfaces.",
      ],
    },
    {
      id: "exp2",
      title: "Software Engineer",
      company: "Innovate Co.",
      location: "Palo Alto, CA",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      description: [
        "Developed and maintained features for a high-traffic e-commerce platform using React and Redux.",
        "Improved application performance by optimizing API calls and implementing code-splitting, resulting in a 25% faster load time.",
        "Wrote comprehensive unit and integration tests, increasing code coverage to over 90%.",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "State University",
      degree: "Master of Science",
      field: "Computer Science",
      startDate: "2015",
      endDate: "2017",
    },
    {
      id: "edu2",
      institution: "State University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2011",
      endDate: "2015",
    },
  ],
  skills: [
    { id: "skill1", name: "JavaScript / TypeScript", level: "Expert" },
    { id: "skill2", name: "React / Next.js", level: "Expert" },
    { id: "skill3", name: "Node.js / Express", level: "Advanced" },
    { id: "skill4", name: "Python", level: "Intermediate" },
    { id: "skill5", name: "AWS / Docker / Kubernetes", level: "Advanced" },
    { id: "skill6", name: "SQL / NoSQL (PostgreSQL, MongoDB)", level: "Advanced" },
  ],
  projects: [
    {
      id: "proj1",
      name: "Personal Portfolio Website",
      description: "A responsive and performant personal website built with Next.js and deployed on Vercel to showcase my projects and skills.",
      url: "alexdoe.dev",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
  ],
};
