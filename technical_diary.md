### Technical Diary

#### 2024-07-25
**Feature: Added support for flexible YAML formats.**
- Made the data structure more flexible by making some fields optional in `src/lib/resume-data.ts`.
- Updated the resume preview component to handle optional fields in `src/components/resume-preview.tsx`.
- Implemented data mapping logic in `src/app/page.tsx` to transform different YAML formats into the application's internal data structure.
- Added a new example resume file in `public/new-format-resume.yaml`.
