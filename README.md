# Image Resizer - Advanced AI Image Editing Platform

A production-ready, lightning-fast image editing web application designed specifically for government applications, official documents, passports, IDs, scholarships, admissions, and more.

## 🎯 Key Features

### Core Tools
- **Image Resize** - Custom dimensions, percentage, aspect ratio preservation
- **Smart Crop** - Free crop, preset ratios (Passport, Aadhaar, Instagram, etc.)
- **KB Size Converter** - Convert to exact file sizes (10KB to 500KB+)
- **Pixel Converter** - Resize to exact pixel dimensions
- **Format Converter** - JPG, PNG, WEBP, HEIC, AVIF, BMP, TIFF
- **Image Compression** - Low/Medium/High/Smart/Lossless modes
- **Background Removal** - Auto removal with color replacement
- **Batch Processing** - Process 100+ images at once

### Advanced Features
- **AI Face Detection** - Auto-center, align, and frame faces
- **Passport Photo Generator** - Presets for India Passport, Visa, Aadhaar, PAN, etc.
- **Signature Tool** - Remove background, convert to PNG, auto-compress
- **Document Scanner** - Edge detection, perspective correction, shadow removal
- **Image Enhancement** - Brightness, contrast, saturation, sharpness, AI enhancement
- **Metadata Cleaner** - Remove EXIF, GPS, camera info
- **Watermark Tool** - Text/logo with custom opacity and rotation
- **Rotate & Flip** - 90°, 180°, 270°, horizontal, vertical
- **Color Filters** - B&W, Sepia, Vintage, Grayscale, Cool, Warm

### User Experience
- **One-Click Government Ready** - Single click for official submissions
- **Live Preview** - Before/after comparison slider
- **Unlimited Undo/Redo** - Full editing history
- **Drag & Drop** - Easy file upload
- **Dark/Light Mode** - Full theme support
- **PWA Support** - Works offline after loading
- **Mobile-First** - Fully responsive design

## 🚀 Technology Stack

### Frontend
- **React 18** - UI library
- **Next.js 14** - Framework with SSR/SSG
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management

### Image Processing
- **Canvas API** - Core image manipulation
- **Sharp** - Server-side processing
- **OpenCV.js** - Face detection and alignment
- **TensorFlow.js** - AI models for detection
- **Pica** - High-quality image resizing
- **jsZip** - Batch download support

### Backend
- **Next.js API Routes** - Serverless functions
- **Node.js** - Runtime

## 📋 Project Structure

```
├── pages/
│   ├── index.tsx                 # Homepage
│   ├── dashboard.tsx             # Main dashboard
│   ├── about.tsx                 # About page
│   ├── privacy.tsx               # Privacy policy
│   ├── terms.tsx                 # Terms of service
│   ├── contact.tsx               # Contact page
│   └── api/
│       ├── upload.ts             # Upload endpoint
│       ├── process.ts            # Image processing
│       └── batch.ts              # Batch processing
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── HeroSection.tsx           # Landing hero
│   ├── UploadArea.tsx            # Drag-drop upload
│   ├── ToolCard.tsx              # Tool card component
│   ├── Editor/
│   │   ├── ImageEditor.tsx       # Main editor
│   │   ├── Toolbar.tsx           # Editor toolbar
│   │   ├── Canvas.tsx            # Canvas component
│   │   └── Preview.tsx           # Preview panel
│   ├── Tools/
│   │   ├── Resize.tsx            # Resize tool
│   │   ├── Crop.tsx              # Crop tool
│   │   ├── Compress.tsx          # Compression
│   │   ├── Format.tsx            # Format converter
│   │   ├── BackgroundRemoval.tsx # BG removal
│   │   ├── FaceDetection.tsx     # Face detection
│   │   ├── PassportGenerator.tsx # Passport photos
│   │   ├── SignatureTool.tsx     # Signature tool
│   │   ├── DocumentScanner.tsx   # Document scanner
│   │   ├── Enhancement.tsx       # Enhancement
│   │   ├── MetadataCleaner.tsx   # Metadata
│   │   ├── Watermark.tsx         # Watermark
│   │   ├── RotateFlip.tsx        # Rotate/flip
│   │   └── Batch.tsx             # Batch processing
│   └── Government/
│       ├── PresetSelector.tsx    # Government presets
│       └── OneClickReady.tsx      # One-click processing
├── lib/
│   ├── image-processing.ts       # Core image processing
│   ├── canvas-utils.ts           # Canvas utilities
│   ├── face-detection.ts         # Face detection logic
│   ├── file-utils.ts             # File handling
│   ├── validators.ts             # Input validation
│   └── constants.ts              # App constants
├── types/
│   ├── index.ts                  # Global types
│   ├── image.ts                  # Image types
│   ├── tool.ts                   # Tool types
│   └── government.ts             # Government presets
├── utils/
│   ├── storage.ts                # Local storage
│   ├── download.ts               # Download utilities
│   ├── color.ts                  # Color utilities
│   └── format.ts                 # Format utilities
├── styles/
│   └── globals.css               # Global styles
├── public/
│   ├── icons/                    # App icons
│   ├── images/                   # Static images
│   ├── manifest.json             # PWA manifest
│   └── robots.txt                # SEO robots
└── .env.local.example            # Environment template
```

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/catversstudio/Image-Resizer-.git
cd Image-Resizer-

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
# or
yarn dev

# Open http://localhost:3000
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel deploy

# Deploy to Netlify
netlify deploy
```

## ✨ Key Performance Metrics

- ⚡ Under 2-second processing for common tasks
- 📱 Mobile-first responsive design
- 🔒 Privacy-focused (client-side processing)
- 📴 PWA support for offline use
- 🎨 Beautiful, intuitive UI
- ♿ Accessibility friendly
- 🔍 SEO optimized

## 🔐 Privacy & Security

- All image processing happens client-side
- Temporary data is deleted immediately
- No permanent storage of user images
- No tracking or analytics
- XSS prevention
- File validation and sanitization
- Secure upload limits

## 🎓 Government Presets Included

- India Passport
- Visa
- Aadhaar
- PAN Card
- Voter ID
- Driving Licence
- SSC Exam
- UPSC Exam
- Railway
- Banking
- Scholarship
- University Admission

## 📄 License

MIT License - feel free to use this project for your needs.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and feature requests, please use the GitHub issues page.

---

**Built with ❤️ for government applications and official documents**