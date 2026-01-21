
export interface FormData {
  name: string;
  businessName: string;
  contact: string;
  moment: 'zero' | 'reforma' | 'aceleracao' | 'resgate' | '';
  pains: string[];
  otherPains: string;
  successGoal: string;
  brandVibe: string;
}

export enum FormStep {
  YOU = 1,
  BUSINESS = 2,
  FUTURE = 3
}
