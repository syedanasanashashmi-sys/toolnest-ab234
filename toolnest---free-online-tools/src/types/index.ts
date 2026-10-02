export type ToolCategory =
  | 'Text Tools'
  | 'Image Tools'
  | 'Calculators'
  | 'Developer Tools'
  | 'Generators'
  | 'Converters';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  category: ToolCategory;
  icon: string;
  popular?: boolean;
  keywords: string[];
  relatedToolIds: string[];
  seo: {
    title: string;
    description: string;
    keywords?: string;
  };
  howToUse: string[];
  howItWorks: string;
  faqs: ToolFaq[];
  privacyNote?: string;
}

export interface RecentToolItem {
  id: string;
  visitedAt: number;
}
