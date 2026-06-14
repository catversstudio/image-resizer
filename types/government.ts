// Government preset types

export interface GovernmentPreset {
  id: string;
  name: string;
  description: string;
  category: 'passport' | 'id' | 'exam' | 'education' | 'financial' | 'other';
  dimensions: {
    width: number;
    height: number;
  };
  fileSize?: number; // in KB
  format: string;
  quality: number;
  backgroundColor?: string;
  rules?: string[];
  icon: string;
}

export const GOVERNMENT_PRESETS: GovernmentPreset[] = [
  {
    id: 'india-passport',
    name: 'India Passport',
    description: 'Standard Indian passport photo dimensions',
    category: 'passport',
    dimensions: { width: 200, height: 250 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    rules: ['Plain white background', 'Face centered', 'Neutral expression', 'No glasses with glare'],
    icon: '🛂',
  },
  {
    id: 'visa',
    name: 'Visa Photo',
    description: 'International visa photograph',
    category: 'passport',
    dimensions: { width: 200, height: 240 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    rules: ['Plain background', 'Clear face', 'Neutral expression'],
    icon: '✈️',
  },
  {
    id: 'aadhaar',
    name: 'Aadhaar',
    description: 'Aadhaar card photograph',
    category: 'id',
    dimensions: { width: 200, height: 200 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    rules: ['Square frame', 'Recent photo', 'Clear face'],
    icon: '🆔',
  },
  {
    id: 'pan-card',
    name: 'PAN Card',
    description: 'PAN card photograph',
    category: 'financial',
    dimensions: { width: 193, height: 243 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    rules: ['Recent photo', 'Clear face', 'Neutral background'],
    icon: '💳',
  },
  {
    id: 'voter-id',
    name: 'Voter ID',
    description: 'Voter ID card photograph',
    category: 'id',
    dimensions: { width: 200, height: 200 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    icon: '🗳️',
  },
  {
    id: 'driving-license',
    name: 'Driving License',
    description: 'Driving license photograph',
    category: 'id',
    dimensions: { width: 200, height: 250 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    icon: '🚗',
  },
  {
    id: 'ssc-exam',
    name: 'SSC Exam',
    description: 'SSC exam form photograph',
    category: 'exam',
    dimensions: { width: 200, height: 200 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    icon: '📝',
  },
  {
    id: 'upsc-exam',
    name: 'UPSC Exam',
    description: 'UPSC exam form photograph',
    category: 'exam',
    dimensions: { width: 200, height: 200 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    icon: '🎓',
  },
  {
    id: 'banking',
    name: 'Bank Account',
    description: 'Bank account opening photograph',
    category: 'financial',
    dimensions: { width: 200, height: 200 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    icon: '🏦',
  },
  {
    id: 'scholarship',
    name: 'Scholarship',
    description: 'Scholarship application photograph',
    category: 'education',
    dimensions: { width: 200, height: 200 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    icon: '🎖️',
  },
  {
    id: 'university-admission',
    name: 'University Admission',
    description: 'University admission form photograph',
    category: 'education',
    dimensions: { width: 200, height: 200 },
    fileSize: 100,
    format: 'JPEG',
    quality: 95,
    backgroundColor: '#ffffff',
    icon: '🎓',
  },
];
