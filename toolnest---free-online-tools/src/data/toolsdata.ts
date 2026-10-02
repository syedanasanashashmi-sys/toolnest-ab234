import { ToolDefinition, ToolCategory } from '../types';

export const TOOLS_DATA: ToolDefinition[] = [
  // 1. Text Tools
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'Text Tools',
    icon: 'FileText',
    popular: true,
    shortDescription: 'Count words, characters, sentences, paragraphs, and estimate reading time in real time.',
    keywords: ['word counter', 'character count', 'reading time', 'essay counter', 'text stats', 'characters without spaces'],
    relatedToolIds: ['character-counter', 'case-converter', 'duplicate-lines'],
    seo: {
      title: 'Free Word Counter & Text Statistics Online | ToolNest',
      description: 'Accurately count words, characters, sentences, and paragraphs in real-time. Calculate reading speed and speech duration privately in your browser.',
      keywords: 'word counter, count words, online word count, character counter, speech timer, reading time calculator'
    },
    howToUse: [
      'Type or paste your text directly into the input area.',
      'View real-time statistics updating automatically: words, characters, sentences, paragraphs, and reading duration.',
      'Check keyword frequency and character density tables below the main counters.',
      'Use the Copy or Download button to save your text whenever needed.'
    ],
    howItWorks: 'The tool uses standard natural language regex tokenizers directly inside your browser memory to identify words (sequences of non-whitespace characters separated by delimiters), sentences (delimited by periods, exclamation marks, or question marks), and paragraph line breaks. Zero data is sent across the network.',
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer: 'Average adult reading speed is estimated at 200 words per minute (WPM). The speech duration is estimated at 130 WPM.'
      },
      {
        question: 'Are hyphens and contractions counted as single words?',
        answer: 'Yes, hyphenated words (e.g. state-of-the-art) and standard contractions (e.g. don\'t) are calculated cleanly according to standard publishing count guidelines.'
      },
      {
        question: 'Is my text private?',
        answer: 'Absolutely. Your text stays entirely in your browser window and is never uploaded to any server or recorded anywhere.'
      }
    ],
    privacyNote: 'Your text is analyzed exclusively in your browser memory and never leaves your computer.'
  },
  {
    id: 'character-counter',
    slug: 'character-counter',
    name: 'Character Counter',
    category: 'Text Tools',
    icon: 'Type',
    popular: false,
    shortDescription: 'Count characters with and without spaces, digits, punctuation, and check limits for Twitter, SMS & SEO.',
    keywords: ['character counter', 'letter counter', 'twitter character limit', 'sms counter', 'meta title length'],
    relatedToolIds: ['word-counter', 'case-converter', 'duplicate-lines'],
    seo: {
      title: 'Character Counter with Social Media & SEO Limits | ToolNest',
      description: 'Free online character counter with and without spaces. Includes live meters for Twitter (280), SMS (160), Meta Title (60), and Meta Description (160).',
      keywords: 'character counter, character limit checker, twitter 280 counter, sms 160 characters, seo title length'
    },
    howToUse: [
      'Enter or paste your text into the text box.',
      'Examine the character breakdowns (total, without whitespace, digits, punctuation, and vowels/consonants).',
      'Track live social media and search engine snippet limit meters (Twitter/X, SMS, Meta Title, Meta Description).',
      'Click the Copy button to take your finalized text to your destination.'
    ],
    howItWorks: 'ToolNest evaluates UTF-16 code units and grapheme clusters in real time to calculate exact character counts matching platform-specific character counting standards.',
    faqs: [
      {
        question: 'What is the difference between characters with and without spaces?',
        answer: 'Characters with spaces counts every keystroke including spacebars, tabs, and line breaks. Characters without spaces excludes all whitespace characters, which is frequently used by academic publishers.'
      },
      {
        question: 'How long can a Twitter (X) post be?',
        answer: 'Standard Twitter/X posts have a 280-character limit. Our meter shows your remaining characters and turns red if you exceed the limit.'
      }
    ],
    privacyNote: 'All character calculations run locally on your device.'
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'Text Tools',
    icon: 'CaseSensitive',
    popular: false,
    shortDescription: 'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more.',
    keywords: ['case converter', 'uppercase', 'lowercase', 'title case', 'sentence case', 'camelcase', 'snake case', 'kebab case'],
    relatedToolIds: ['word-counter', 'duplicate-lines', 'json-formatter'],
    seo: {
      title: 'Case Converter – UPPERCASE, lowercase, Title Case | ToolNest',
      description: 'Easily convert text cases online for free: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, and alternating cAsE.',
      keywords: 'case converter, capitalize text, uppercase converter, lowercase converter, title case generator'
    },
    howToUse: [
      'Paste or type the text you wish to format.',
      'Click on any case conversion style button or inspect the live converted preview boxes.',
      'Click "Copy" next to your desired style to copy it immediately to your clipboard.',
      'Use "Apply" if you want to replace your main editor text with the selected case.'
    ],
    howItWorks: 'Applies rigorous casing rules including capitalization of first letters of sentences, standard English title casing (preserving short prepositions/articles like of, in, the), and programming naming conventions.',
    faqs: [
      {
        question: 'What is Title Case?',
        answer: 'Title Case capitalizes the first letter of major words while leaving minor words (articles, conjunctions, short prepositions like a, an, the, and, but, in, on) in lowercase, unless they begin the sentence.'
      },
      {
        question: 'What are camelCase, snake_case, and kebab-case?',
        answer: 'These are standard developer naming conventions. camelCase lowercases the first word and capitalizes subsequent words with no spaces; snake_case uses underscores (e.g. user_id); and kebab-case uses hyphens (e.g. user-id).'
      }
    ]
  },
  {
    id: 'duplicate-lines',
    slug: 'duplicate-lines',
    name: 'Remove Duplicate Lines',
    category: 'Text Tools',
    icon: 'ListFilter',
    popular: false,
    shortDescription: 'Clean lists, delete repeated lines, trim whitespace, and sort text alphabetically.',
    keywords: ['remove duplicate lines', 'deduplicate list', 'delete duplicate text', 'unique lines', 'sort list'],
    relatedToolIds: ['word-counter', 'case-converter', 'json-formatter'],
    seo: {
      title: 'Remove Duplicate Lines Online – Clean & Sort Lists | ToolNest',
      description: 'Instantly remove duplicate lines from lists and text documents. Options for case sensitivity, trimming whitespace, and alphabetical sorting. 100% free.',
      keywords: 'remove duplicate lines, deduplicate list online, unique lines filter, remove duplicates from text'
    },
    howToUse: [
      'Paste your multiline list or dataset into the input textarea.',
      'Toggle preferences: Case Sensitivity, Whitespace Trimming, Empty Line Removal, or Sorting (A-Z or Z-A).',
      'The cleaned, deduplicated output appears instantly with statistics on removed duplicates.',
      'Copy the clean list or download it as a plain .txt file.'
    ],
    howItWorks: 'The tool splits the text into line arrays, normalizes based on your chosen trim and case sensitivity rules, filters through a JavaScript Set for O(N) deduplication, and reconstructs the output.',
    faqs: [
      {
        question: 'Is case sensitivity supported?',
        answer: 'Yes. When case sensitivity is enabled, "Apple" and "apple" are treated as distinct lines. When disabled, they are treated as duplicates.'
      },
      {
        question: 'Can I sort the lines alphabetically after deduplication?',
        answer: 'Yes, you can sort A to Z, Z to A, or preserve the original line order.'
      }
    ]
  },

  // 2. Image Tools
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'Image Tools',
    icon: 'Minimize2',
    popular: true,
    shortDescription: 'Compress JPG, PNG, and WebP images directly in your browser with quality slider and size comparison.',
    keywords: ['image compressor', 'compress image online', 'reduce image size', 'shrink photo', 'compress jpg', 'compress png'],
    relatedToolIds: ['image-resizer', 'jpg-to-webp', 'png-to-webp'],
    seo: {
      title: 'Free Browser-Based Image Compressor – JPG, PNG, WebP | ToolNest',
      description: 'Compress images securely in your browser without uploading to any server. Reduce file size up to 85% while preserving visual clarity. Download instantly.',
      keywords: 'image compressor, compress jpg, compress png online, free image reducer, privacy image compressor'
    },
    howToUse: [
      'Drag and drop an image (JPG, PNG, or WebP) or click to browse from your device.',
      'Adjust the compression quality slider to your desired balance of size and visual fidelity.',
      'Inspect the live comparison showing original size, compressed size, and percentage saved.',
      'Click "Download Compressed Image" to save the optimized file directly to your computer.'
    ],
    howItWorks: 'ToolNest loads your image into an in-memory HTML5 Canvas and applies native browser image compression algorithms (JPEG/WebP encoding). Because the processing is 100% client-side, your private photos are never uploaded or stored anywhere.',
    faqs: [
      {
        question: 'Are my images uploaded to your servers?',
        answer: 'Never! All image compression occurs right inside your browser using the HTML5 Canvas API. Your pictures never leave your computer or phone.'
      },
      {
        question: 'What is the recommended quality setting?',
        answer: 'A quality between 75% and 85% typically reduces file size by 60% to 80% with virtually zero perceptible loss in visual quality for human eyes.'
      }
    ],
    privacyNote: '100% private: Your photos remain strictly on your local device.'
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    name: 'Image Resizer',
    category: 'Image Tools',
    icon: 'Maximize2',
    popular: false,
    shortDescription: 'Resize images by custom width/height pixels, percentage, or social media presets with aspect ratio lock.',
    keywords: ['image resizer', 'resize photo', 'change image dimensions', 'crop image', 'social media image size'],
    relatedToolIds: ['image-compressor', 'jpg-to-webp', 'png-to-webp'],
    seo: {
      title: 'Free Online Image Resizer – Pixels, Percentage & Presets | ToolNest',
      description: 'Resize images by width and height in pixels or percentage with aspect ratio lock. Includes presets for YouTube, Instagram, and Twitter. 100% private.',
      keywords: 'image resizer, resize image online, change photo size, scale picture, youtube thumbnail resizer'
    },
    howToUse: [
      'Select or drag-and-drop an image file.',
      'Choose resize mode: Custom Dimensions (pixels), Scale Percentage, or Social Media Presets (YouTube Thumbnail, Instagram, Twitter, etc.).',
      'Keep "Maintain Aspect Ratio" checked to avoid distortion.',
      'Select the output format and click "Download Resized Image".'
    ],
    howItWorks: 'The image is rendered onto a canvas element scaled with high-precision bicubic smoothing enabled, producing crisp resized images ready for web, print, or social media.',
    faqs: [
      {
        question: 'Will resizing distort my picture?',
        answer: 'No, as long as "Maintain Aspect Ratio" is enabled, entering a new width will automatically calculate the proportional height.'
      },
      {
        question: 'What social media presets are available?',
        answer: 'We provide one-click presets for YouTube Thumbnails (1280x720), Instagram Square (1080x1080), Instagram Story (1080x1920), Twitter/X Header (1500x500), and Facebook Cover (820x312).'
      }
    ],
    privacyNote: 'Your images are never sent to a server. Resizing is conducted locally.'
  },
  {
    id: 'jpg-to-webp',
    slug: 'jpg-to-webp',
    name: 'JPG to WebP Converter',
    category: 'Converters',
    icon: 'FileImage',
    popular: false,
    shortDescription: 'Convert JPG/JPEG images to modern WebP format for faster web page loading and smaller file sizes.',
    keywords: ['jpg to webp', 'jpeg to webp', 'convert jpg', 'modern image format', 'next gen image format'],
    relatedToolIds: ['png-to-webp', 'image-compressor', 'image-resizer'],
    seo: {
      title: 'JPG to WebP Converter Online – Free & High Quality | ToolNest',
      description: 'Convert JPG and JPEG pictures into modern Google WebP format. Improve website performance and Google PageSpeed scores with smaller image sizes.',
      keywords: 'jpg to webp converter, convert jpeg to webp, webp image online, free jpg to webp'
    },
    howToUse: [
      'Upload your JPG or JPEG image file.',
      'Adjust the quality slider (85% recommended for web performance).',
      'Compare original and new WebP file size savings.',
      'Download your optimized .webp file instantly.'
    ],
    howItWorks: 'Uses the browser\'s native WebP encoder to convert raster JPEG imagery into Google\'s WebP compression format, typically achieving 25-35% smaller file sizes at identical visual fidelity.',
    faqs: [
      {
        question: 'Why convert JPG to WebP?',
        answer: 'WebP provides superior lossless and lossy compression for web images. Converting reduces page load times and boosts SEO Core Web Vitals.'
      },
      {
        question: 'Do modern browsers support WebP?',
        answer: 'Yes! Over 97% of global web browsers including Chrome, Safari, Firefox, Edge, and mobile browsers support WebP.'
      }
    ],
    privacyNote: 'Converted in-browser using standard WebP canvas APIs.'
  },
  {
    id: 'png-to-webp',
    slug: 'png-to-webp',
    name: 'PNG to WebP Converter',
    category: 'Converters',
    icon: 'Image',
    popular: false,
    shortDescription: 'Convert PNG graphics to WebP while maintaining full alpha transparency and reducing file size by up to 80%.',
    keywords: ['png to webp', 'convert png', 'transparent webp', 'reduce png size', 'transparent image converter'],
    relatedToolIds: ['jpg-to-webp', 'image-compressor', 'image-resizer'],
    seo: {
      title: 'PNG to WebP Converter with Transparency Support | ToolNest',
      description: 'Convert PNG images to WebP format online while preserving transparent backgrounds. Slash file size by up to 80% without losing quality.',
      keywords: 'png to webp, convert png to webp transparent, transparent image converter, webp lossless'
    },
    howToUse: [
      'Drop your PNG file (with or without transparency) into the upload zone.',
      'Preview your image over a transparent checkerboard backdrop.',
      'Tune quality to your preference.',
      'Download the sleek WebP file.'
    ],
    howItWorks: 'WebP has full 24-bit RGB color with 8-bit alpha channel support. Our client-side canvas extracts pixel data and encodes it into WebP with full transparency preserved.',
    faqs: [
      {
        question: 'Will transparency be preserved?',
        answer: 'Yes! Unlike JPG which converts transparent pixels to white or black, WebP supports full alpha channel transparency.'
      },
      {
        question: 'How much smaller will the file be?',
        answer: 'PNG files are often 3x to 5x larger than necessary. WebP typically shrinks PNG files by 60% to 80%.'
      }
    ],
    privacyNote: 'Zero uploads. Your artwork and screenshots remain private.'
  },

  // 3. Generator
  {
    id: 'qr-generator',
    slug: 'qr-generator',
    name: 'QR Code Generator',
    category: 'Generators',
    icon: 'QrCode',
    popular: true,
    shortDescription: 'Create custom QR codes for URLs, text, Wi-Fi networks, emails, and phone numbers with custom colors.',
    keywords: ['qr code generator', 'free qr code', 'wifi qr code', 'url qr code', 'custom qr code', 'download qr png'],
    relatedToolIds: ['uuid-generator', 'base64', 'word-counter'],
    seo: {
      title: 'Free QR Code Generator Online – URL, Text, Wi-Fi, Phone | ToolNest',
      description: 'Generate high-resolution QR codes instantly for websites, Wi-Fi login, plain text, emails, and phone numbers. Customize colors and download in PNG.',
      keywords: 'qr code generator, make qr code, free qr code creator, wifi qr code generator, custom color qr code'
    },
    howToUse: [
      'Select your QR code type (URL, Plain Text, Wi-Fi, Email, Phone, or SMS).',
      'Fill in the relevant details (e.g. website address or Wi-Fi network name & password).',
      'Customize foreground and background colors, size, and error correction level.',
      'Download the generated QR code in crisp high-resolution PNG or copy the image.'
    ],
    howItWorks: 'Encodes data strings into standardized 2D matrix symbology (ISO/IEC 18004) with Reed-Solomon error correction, rendered directly onto a vector or bitmap canvas.',
    faqs: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No! These are static QR codes containing the direct data you entered. They work forever and never expire.'
      },
      {
        question: 'How does the Wi-Fi QR code work?',
        answer: 'When scanned with an iPhone or Android camera, a prompt will appear asking "Join this network?". It connects guests without typing long passwords.'
      }
    ]
  },

  // 4. Calculator Tools
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'Calculators',
    icon: 'Calendar',
    popular: true,
    shortDescription: 'Calculate exact age in years, months, days, hours, and minutes, plus next birthday countdown and milestones.',
    keywords: ['age calculator', 'calculate age', 'date of birth calculator', 'how old am i', 'birthday countdown', 'days lived'],
    relatedToolIds: ['percentage-calculator', 'discount-calculator', 'uuid-generator'],
    seo: {
      title: 'Exact Age Calculator – Years, Months, Days & Next Birthday | ToolNest',
      description: 'Calculate your exact age in years, months, weeks, days, hours, and seconds. Find out days until your next birthday, zodiac signs, and life milestones.',
      keywords: 'age calculator, exact age calculator, birthday calculator, calculate days lived, how old am i calculator'
    },
    howToUse: [
      'Select your Date of Birth in the date picker.',
      'Optionally adjust the "Calculate Age As Of" date if you want to know your age at a specific past or future date.',
      'View your exact chronological age in Years, Months, and Days.',
      'Explore deep statistics including total days lived, hours, minutes, next birthday day of the week, and astrological sign.'
    ],
    howItWorks: 'Calculates the elapsed calendar interval between two timestamps, accurately compensating for variable month lengths (28, 29, 30, and 31 days) and leap years.',
    faqs: [
      {
        question: 'Does this calculator account for leap years?',
        answer: 'Yes, full leap-year calculations (February 29) are accounted for based on Gregorian calendar rules.'
      },
      {
        question: 'Can I calculate age for historical dates?',
        answer: 'Yes, you can choose any birth date and target comparison date.'
      }
    ]
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'Calculators',
    icon: 'Percent',
    popular: true,
    shortDescription: 'Calculate percentage of a number, percentage change/difference, ratio, and add/subtract percentages with formulas.',
    keywords: ['percentage calculator', 'calculate percent', 'percent increase', 'percentage decrease', 'percent of number'],
    relatedToolIds: ['discount-calculator', 'age-calculator', 'json-formatter'],
    seo: {
      title: 'Percentage Calculator – What is X% of Y, Percentage Change | ToolNest',
      description: 'Free multi-mode percentage calculator. Quickly compute what is X% of Y, percentage increase/decrease, ratios, and price adjustments with step-by-step math.',
      keywords: 'percentage calculator, calculate percentage, percent increase calculator, percentage difference, math calculator'
    },
    howToUse: [
      'Choose the calculation mode (What is X% of Y, X is what % of Y, Percentage Increase/Decrease, or Add/Subtract %).',
      'Enter the numbers in the designated input fields.',
      'The exact result and the step-by-step mathematical breakdown are calculated instantaneously.',
      'Click the Copy button to copy the answer.'
    ],
    howItWorks: 'Executes standard arithmetic formulas: `(X / 100) * Y` for percentage of a number, `((New - Old) / Old) * 100` for percentage difference, and provides full step-by-step mathematical reasoning.',
    faqs: [
      {
        question: 'How do you calculate percentage increase?',
        answer: 'Subtract the old value from the new value, divide by the absolute old value, and multiply by 100: ((New - Old) / Old) * 100.'
      },
      {
        question: 'Can I calculate sales tax and tips with this?',
        answer: 'Yes! Use the "Add/Subtract Percentage" tab to add tax (e.g. $50 + 8%) or tips (e.g. $80 + 18%) instantly.'
      }
    ]
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    category: 'Calculators',
    icon: 'Tag',
    popular: false,
    shortDescription: 'Calculate sale prices, savings amount, double discounts, and sales tax with clear visual breakdown.',
    keywords: ['discount calculator', 'sale calculator', 'calculate savings', 'coupon calculator', 'double discount'],
    relatedToolIds: ['percentage-calculator', 'age-calculator', 'word-counter'],
    seo: {
      title: 'Discount & Sale Calculator – Savings & Sales Tax | ToolNest',
      description: 'Calculate sale prices, total money saved, extra coupon discounts, and sales tax easily. Perfect for shopping sales, Black Friday, and clearance deals.',
      keywords: 'discount calculator, sale price calculator, percent off calculator, shopping savings calculator, sales tax'
    },
    howToUse: [
      'Enter the original price and select your currency symbol.',
      'Enter the primary discount percentage (e.g. 25% off) or fixed dollar amount.',
      'Optionally enter an additional discount (e.g. "Take an extra 10% off with coupon") and local sales tax.',
      'Review your Final Price, Total Money Saved, and Effective Discount Percentage.'
    ],
    howItWorks: 'Applies compound percentage reductions sequentially: Original Price * (1 - Discount 1) * (1 - Discount 2), and adds applicable sales tax to show the exact final out-of-pocket cost.',
    faqs: [
      {
        question: 'How does an "extra discount" work?',
        answer: 'In stores, an "extra 20% off a 50% off item" does NOT mean 70% off. It means 50% is taken off first, then 20% is taken off the discounted subtotal. Our calculator handles this exact retail logic.'
      },
      {
        question: 'Can I include sales tax?',
        answer: 'Yes, you can toggle sales tax to see the final post-tax checkout price.'
      }
    ]
  },

  // 5. Developer Tools
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'Developer Tools',
    icon: 'Code2',
    popular: true,
    shortDescription: 'Format, validate, prettify, and minify JSON data with syntax highlighting and clear error messages.',
    keywords: ['json formatter', 'json validator', 'beautify json', 'prettify json', 'minify json', 'json viewer'],
    relatedToolIds: ['base64', 'uuid-generator', 'case-converter'],
    seo: {
      title: 'Free JSON Formatter & Validator Online | ToolNest',
      description: 'Format, validate, beautify, and minify JSON strings online. Identifies syntax errors with line and column numbers. 100% private in-browser tool.',
      keywords: 'json formatter, json beautifier, json validator online, minify json, format json, clean json'
    },
    howToUse: [
      'Paste your raw JSON into the editor or click "Load Sample" to try an example.',
      'Click "Format / Prettify" to indent neatly, or "Minify" to strip all unnecessary whitespace.',
      'If your JSON contains syntax errors, a precise error banner will pinpoint the exact issue and location.',
      'Copy the clean JSON or download it as a `.json` file.'
    ],
    howItWorks: 'Uses browser JSON parsing engines along with custom syntax linting to parse tokens and generate structured, indented, or minified text with zero latency.',
    faqs: [
      {
        question: 'Does this tool validate invalid JSON?',
        answer: 'Yes! If there is a missing comma, unescaped quote, or trailing bracket, it highlights the exact error line and explanation.'
      },
      {
        question: 'Are my JSON APIs or tokens secure?',
        answer: '100% yes. ToolNest processes all JSON locally in your browser memory. We never transmit your data, API keys, or JSON payloads.'
      }
    ],
    privacyNote: 'Zero server uploads. Your JSON code stays private on your machine.'
  },
  {
    id: 'base64',
    slug: 'base64',
    name: 'Base64 Encoder / Decoder',
    category: 'Developer Tools',
    icon: 'Binary',
    popular: false,
    shortDescription: 'Encode and decode Base64 text and convert files or images to Base64 Data URLs with UTF-8 support.',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 to image', 'image to base64', 'data url generator'],
    relatedToolIds: ['json-formatter', 'uuid-generator', 'qr-generator'],
    seo: {
      title: 'Base64 Encoder & Decoder Online – Text & Files | ToolNest',
      description: 'Encode and decode Base64 strings online with full UTF-8 emoji support. Convert images and documents into Base64 Data URLs for web development.',
      keywords: 'base64 encoder, base64 decoder, base64 encode online, base64 to text, image to base64 data url'
    },
    howToUse: [
      'Select mode: "Text to Base64" or "File / Image to Base64 Data URL".',
      'For text, type or paste your content and choose "Encode" or "Decode".',
      'For files, drop an image to generate an inline `data:image/...;base64,...` string.',
      'Copy the output with a single click.'
    ],
    howItWorks: 'Utilizes modern standard `TextEncoder`/`TextDecoder` and `FileReader` APIs for UTF-8 compliant binary serialization into standard RFC 4648 Base64 representations.',
    faqs: [
      {
        question: 'Does this support non-English characters and emojis?',
        answer: 'Yes! Standard JavaScript `btoa()` fails on UTF-8 strings like emojis or accented letters. Our tool uses UTF-8 byte stream encoding so emojis and all international characters encode and decode perfectly.'
      },
      {
        question: 'What is a Base64 Data URL used for?',
        answer: 'Data URLs allow you to embed images directly into HTML, CSS, or JSON without requiring a separate network request.'
      }
    ]
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    category: 'Developer Tools',
    icon: 'Fingerprint',
    popular: false,
    shortDescription: 'Generate cryptographically secure Version 4 UUIDs in bulk with uppercase, hyphen, and brace options.',
    keywords: ['uuid generator', 'guid generator', 'v4 uuid', 'random uuid', 'bulk uuid generator'],
    relatedToolIds: ['json-formatter', 'base64', 'qr-generator'],
    seo: {
      title: 'UUID Generator – Free Version 4 (v4) UUIDs & GUIDs | ToolNest',
      description: 'Generate cryptographically random UUID v4 identifiers instantly. Supports bulk generation (up to 100), uppercase/lowercase, hyphens, and braces.',
      keywords: 'uuid generator, guid generator, random uuid v4, generate uuid online, bulk uuid'
    },
    howToUse: [
      'Select how many UUIDs you want to generate (from 1 up to 100).',
      'Customize options: Uppercase, Hyphens, or Braces {}.',
      'Click "Generate UUIDs" to produce new random identifiers.',
      'Copy individual UUIDs or click "Copy All" / "Download as .txt".'
    ],
    howItWorks: 'Generates RFC 4122 compliant Version 4 UUIDs using the browser\'s cryptographically secure pseudo-random number generator (`crypto.randomUUID()` and `crypto.getRandomValues()`).',
    faqs: [
      {
        question: 'Are these UUIDs cryptographically random?',
        answer: 'Yes. They utilize browser Web Cryptography APIs (`crypto.randomUUID`), ensuring high cryptographic entropy suitable for database primary keys and secure session tokens.'
      },
      {
        question: 'What is the probability of a collision in UUID v4?',
        answer: 'The probability of generating a duplicate UUID v4 is approximately 1 in 2.71 quintillion, making collisions virtually impossible in practice.'
      }
    ]
  }
];

export const CATEGORIES_LIST: ToolCategory[] = [
  'Text Tools',
  'Image Tools',
  'Calculators',
  'Developer Tools',
  'Generators',
  'Converters'
];

export const CATEGORY_DETAILS: Record<ToolCategory, { description: string; icon: string; count: number }> = {
  'Text Tools': {
    description: 'Format, count, inspect, deduplicate, and transform text content quickly and effortlessly.',
    icon: 'FileText',
    count: 4
  },
  'Image Tools': {
    description: 'Compress, resize, and optimize images directly on your machine without quality loss or server uploads.',
    icon: 'Image',
    count: 2
  },
  'Calculators': {
    description: 'Fast, intuitive calculators for everyday math, age breakdowns, percentages, and retail discounts.',
    icon: 'Calculator',
    count: 3
  },
  'Developer Tools': {
    description: 'Essential utilities for web developers: JSON formatting, Base64 conversion, and cryptographic UUIDs.',
    icon: 'Terminal',
    count: 3
  },
  'Generators': {
    description: 'Create customized QR codes, security tokens, and barcodes ready for digital or print usage.',
    icon: 'Sparkles',
    count: 1
  },
  'Converters': {
    description: 'Convert between next-gen web image formats like WebP, JPEG, and PNG in seconds.',
    icon: 'ArrowLeftRight',
    count: 2
  }
};
