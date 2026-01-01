# Susann's Lifestory

A personal web application celebrating Susann's 50th birthday! This app showcases her life journey through interactive timeline and map views, featuring photos, stories, and memories from throughout her life.

## Features

- **Timeline View**: Follow Susann's life in chronological order with beautifully styled event cards
- **Map View**: Explore memories and photos on an interactive world map showing locations of important life events
- **Photo Integration**: Ready for integration with Google Photos, OneDrive, and Immich (coming soon)
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic theme switching based on system preferences

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/magnushaggren/susanns-lifestory.git
cd susanns-lifestory
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
susanns-lifestory/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Timeline view (home page)
│   ├── map/               # Map view page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Navigation bar
│   ├── Timeline.tsx       # Timeline view component
│   └── MapView.tsx        # Map view component
├── data/                  # Data files
│   └── sampleEvents.ts    # Sample life events data
├── types/                 # TypeScript type definitions
│   └── index.ts          # Type definitions for events, photos, etc.
└── lib/                   # Utility functions
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet via react-leaflet
- **Date Handling**: date-fns
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Customization

### Adding Your Own Events

Edit `data/sampleEvents.ts` to add your own life events. Each event should include:

```typescript
{
  id: string;
  title: string;
  description: string;
  date: string; // ISO format: 'YYYY-MM-DD'
  location?: {
    name: string;
    lat: number;
    lng: number;
  };
  category: 'birth' | 'education' | 'travel' | 'family' | 'career' | 'milestone' | 'other';
}
```

### Photo Integration (Coming Soon)

The app is designed to integrate with:
- Google Photos API
- OneDrive API
- Immich self-hosted photo management

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## License

This is a personal project created with love for Susann's 50th birthday.

## Acknowledgments

Built with ❤️ using modern web technologies to celebrate 50 wonderful years!
