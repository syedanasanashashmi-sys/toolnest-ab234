import React from 'react';
import {
  FileText,
  Type,
  CaseSensitive,
  ListFilter,
  Minimize2,
  Maximize2,
  FileImage,
  Image,
  QrCode,
  Calendar,
  Percent,
  Tag,
  Code2,
  Binary,
  Fingerprint,
  Calculator,
  Terminal,
  Sparkles,
  ArrowLeftRight,
  Wrench,
  HelpCircle
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, className = 'w-5 h-5', size }) => {
  const iconMap: Record<string, React.ElementType> = {
    FileText,
    Type,
    CaseSensitive,
    ListFilter,
    Minimize2,
    Maximize2,
    FileImage,
    Image,
    QrCode,
    Calendar,
    Percent,
    Tag,
    Code2,
    Binary,
    Fingerprint,
    Calculator,
    Terminal,
    Sparkles,
    ArrowLeftRight,
    Wrench
  };

  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} size={size} />;
};
