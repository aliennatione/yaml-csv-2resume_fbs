
import Papa from 'papaparse';
import { initialData, ResumeData } from '@/lib/resume-data';

const importData = (file: File): Promise<ResumeData> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length) {
                    reject(results.errors[0]);
                } else {
                    try {
                        const personalInfo = results.data[0] as any;
                        const experience = (results.data as any[]).filter(row => row.type === 'experience').map(exp => ({ ...exp, description: exp.description.split('\n') }));
                        const education = (results.data as any[]).filter(row => row.type === 'education');
                        const skills = (results.data as any[]).filter(row => row.type === 'skill');
                        const projects = (results.data as any[]).filter(row => row.type === 'project').map(proj => ({ ...proj, technologies: proj.technologies.split(',') }));

                        const importedData: ResumeData = {
                            personalInfo: {
                                ...initialData.personalInfo,
                                ...personalInfo,
                            },
                            summary: personalInfo.summary || initialData.summary,
                            experience: experience || initialData.experience,
                            education: education || initialData.education,
                            skills: skills || initialData.skills,
                            projects: projects || initialData.projects,
                        };
                        resolve(importedData);
                    } catch (error) {
                        reject(error);
                    }
                }
            },
            error: (error: any) => {
                reject(error);
            },
        });
    });
};

export { importData as importFromCSV };
