import { Todos } from './kanban';

export const todos: Todos[] = [
  {
    id: 1,
    title: 'Choose thesis topic',
    description: 'Select a relevant and feasible topic based on your interests and field of study.',
    taskProperty: 'Research',
    imageUrl: '',
  },
  {
    id: 2,
    title: 'Find a thesis supervisor',
    description: 'Contact a professor and confirm their agreement to supervise your thesis.',
    taskProperty: 'Planning',
    imageUrl: '',
  },
  {
    id: 3,
    title: 'Define thesis objectives',
    description: 'Clearly state the goals, scope, and expected outcomes of your work.',
    taskProperty: 'Planning',
    imageUrl: '',
  },
  {
    id: 4,
    title: 'Conduct background research',
    description: 'Gather and study literature and existing work related to your topic.',
    taskProperty: 'Research',
    imageUrl: '',
  },
  {
    id: 5,
    title: 'Select methodology and tools',
    description: 'Decide on the approach, tools, or technologies you will use.',
    taskProperty: 'Planning',
    imageUrl: '',
  },
  {
    id: 6,
    title: 'Implement project or case study',
    description: 'Work on the practical part of your thesis (coding, modeling, case study, etc.).',
    taskProperty: 'Implementation',
    imageUrl: '',
  },
  {
    id: 7,
    title: 'Analyze and interpret results',
    description: 'Evaluate your findings and link them to your research objectives.',
    taskProperty: 'Documentation',
    imageUrl: '',
  },
  {
    id: 8,
    title: 'Write the thesis document',
    description: 'Compile all sections: introduction, literature, methodology, results, and conclusions.',
    taskProperty: 'Documentation',
    imageUrl: '',
  },
  {
    id: 9,
    title: 'Proofread and format the thesis',
    description: 'Check grammar, references, and layout according to guidelines.',
    taskProperty: 'Review',
    imageUrl: '',
  },
  {
    id: 10,
    title: 'Submit the final thesis',
    description: 'Prepare and send the final version to the institution and/or upload it online.',
    taskProperty: 'Review',
    imageUrl: '',
  },
  {
    id: 11,
    title: 'Prepare for thesis defense',
    description: 'Create a presentation and practice explaining your work clearly.',
    taskProperty: 'Presentation',
    imageUrl: '',
  },
  {
    id: 12,
    title: 'Defend the thesis',
    description: 'Present and discuss your work in front of the examination committee.',
    taskProperty: 'Presentation',
    imageUrl: '',
  }
];

export const inprogress: Todos[] = [];
export const completed: Todos[] = [];
export const onhold: Todos[] = [];
