import yaml from 'js-yaml';
import Papa from 'papaparse';
import { ResumeData } from './resume-data';

export const importFromYAML = (fileContent: string): Partial<ResumeData> => {
  try {
    const data = yaml.load(fileContent);
    // TODO: Add data validation and transformation to match ResumeData structure
    return data as Partial<ResumeData>;
  } catch (error) {
    console.error("Error parsing YAML:", error);
    throw new Error("Invalid YAML file format.");
  }
};

export const importFromCSV = (fileContent: string): Promise<Partial<ResumeData>> => {
    return new Promise((resolve, reject) => {
        // This is a simplified CSV import and assumes a specific structure.
        // A more robust solution would handle various CSV formats and mappings.
        Papa.parse(fileContent, {
            header: true,
            complete: (results) => {
                try {
                    const personalInfo = results.data[0] as any;
                    const experience = results.data.filter(row => (row as any).type === 'experience').map(exp => ({ ...exp, description: (exp as any).description.split('\n') }));
                    const education = results.data.filter(row => (row as any).type === 'education');
                    const skills = results.data.filter(row => (row as any).type === 'skill');
                    const projects = results.data.filter(row => (row as any).type === 'project').map(proj => ({...proj, technologies: (proj as any).technologies.split(',') }));

                    const resumeData: Partial<ResumeData> = {
                        personalInfo,
                        summary: (results.data.find(row => (row as any).summary) as any)?.summary || '',
                        experience,
                        education,
                        skills,
                        projects
                    };
                    
                    resolve(resumeData);
                } catch (error) {
                    console.error("Error processing CSV data:", error);
                    reject(new Error("Failed to process CSV data."));
                }
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
                reject(new Error("Invalid CSV file format."));
            }
        });
    });
};
