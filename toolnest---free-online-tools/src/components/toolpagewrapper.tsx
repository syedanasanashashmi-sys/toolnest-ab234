import React, { useEffect } from 'react';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolLayout } from './ToolLayout';
import { updateSEO } from '../utils/seo';
import { siteConfig } from '../config/siteConfig';

// Import all 15 tool components
import { WordCounterTool } from './tools/WordCounterTool';
import { CharacterCounterTool } from './tools/CharacterCounterTool';
import { CaseConverterTool } from './tools/CaseConverterTool';
import { DuplicateLinesTool } from './tools/DuplicateLinesTool';
import { ImageCompressorTool } from './tools/ImageCompressorTool';
import { ImageResizerTool } from './tools/ImageResizerTool';
import { JpgToWebpTool } from './tools/JpgToWebpTool';
import { PngToWebpTool } from './tools/PngToWebpTool';
import { QrGeneratorTool } from './tools/QrGeneratorTool';
import { AgeCalculatorTool } from './tools/AgeCalculatorTool';
import { PercentageCalculatorTool } from './tools/PercentageCalculatorTool';
import { DiscountCalculatorTool } from './tools/DiscountCalculatorTool';
import { JsonFormatterTool } from './tools/JsonFormatterTool';
import { Base64Tool } from './tools/Base64Tool';
import { UuidGeneratorTool } from './tools/UuidGeneratorTool';
import { NotFoundPage } from '../pages/NotFoundPage';

interface ToolPageWrapperProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onRecordVisit: (id: string) => void;
}

export const ToolPageWrapper: React.FC<ToolPageWrapperProps> = ({
  slug,
  onNavigate,
  onOpenSearch,
  isFavorite,
  onToggleFavorite,
  onRecordVisit
}) => {
  const tool = TOOLS_DATA.find(t => t.slug === slug || t.id === slug);

  useEffect(() => {
    if (tool) {
      onRecordVisit(tool.id);

      // Construct Schema.org JSON-LD for WebApplication and FAQPage
      const schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: `${tool.name} – ${siteConfig.name}`,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            description: tool.seo.description,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteConfig.url
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Tools',
                item: `${siteConfig.url}/tools`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: tool.name,
                item: `${siteConfig.url}/tools/${tool.slug}`
              }
            ]
          },
          ...(tool.faqs && tool.faqs.length > 0
            ? [
                {
                  '@type': 'FAQPage',
                  mainEntity: tool.faqs.map(f => ({
                    '@type': 'Question',
                    name: f.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: f.answer
                    }
                  }))
                }
              ]
            : [])
        ]
      };

      updateSEO({
        title: tool.seo.title,
        description: tool.seo.description,
        canonicalPath: `/tools/${tool.slug}`,
        schema: schemaData
      });
    }
  }, [tool, slug, onRecordVisit]);

  if (!tool) {
    return <NotFoundPage onNavigate={onNavigate} onOpenSearch={onOpenSearch} />;
  }

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'word-counter':
        return <WordCounterTool />;
      case 'character-counter':
        return <CharacterCounterTool />;
      case 'case-converter':
        return <CaseConverterTool />;
      case 'duplicate-lines':
        return <DuplicateLinesTool />;
      case 'image-compressor':
        return <ImageCompressorTool />;
      case 'image-resizer':
        return <ImageResizerTool />;
      case 'jpg-to-webp':
        return <JpgToWebpTool />;
      case 'png-to-webp':
        return <PngToWebpTool />;
      case 'qr-generator':
        return <QrGeneratorTool />;
      case 'age-calculator':
        return <AgeCalculatorTool />;
      case 'percentage-calculator':
        return <PercentageCalculatorTool />;
      case 'discount-calculator':
        return <DiscountCalculatorTool />;
      case 'json-formatter':
        return <JsonFormatterTool />;
      case 'base64':
        return <Base64Tool />;
      case 'uuid-generator':
        return <UuidGeneratorTool />;
      default:
        return <div>Tool coming soon...</div>;
    }
  };

  return (
    <ToolLayout
      tool={tool}
      isFavorite={isFavorite(tool.id)}
      checkFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
      onNavigate={onNavigate}
    >
      {renderToolComponent()}
    </ToolLayout>
  );
};
