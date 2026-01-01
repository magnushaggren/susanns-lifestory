# Customization Guide

This guide will help you customize Susann's Lifestory app with your own content.

## Adding Your Own Life Events

### Step 1: Edit the Sample Data

Open `data/sampleEvents.ts` and replace the sample events with real life events.

Each event has this structure:

```typescript
{
  id: '1',                    // Unique identifier
  title: 'Birth',             // Event title
  description: 'Born!',       // Event description
  date: '1976-01-01',        // Date in YYYY-MM-DD format
  location: {                // Optional location
    name: 'Stockholm',
    lat: 59.3293,           // Latitude
    lng: 18.0686,           // Longitude
  },
  category: 'birth',         // Category (see below)
}
```

### Event Categories

Available categories (each has a unique color):
- `birth` - Pink
- `education` - Blue
- `travel` - Green
- `family` - Purple
- `career` - Orange
- `milestone` - Yellow
- `other` - Gray

### Step 2: Find Coordinates for Locations

To get latitude and longitude for locations:
1. Go to [Google Maps](https://maps.google.com)
2. Search for your location
3. Right-click on the map at the exact spot
4. Click the coordinates at the top to copy them

## Adding Photos

### Photo Data Structure

Photos can be added to events. Extend the event object:

```typescript
{
  id: '1',
  title: 'Wedding Day',
  description: 'Best day ever!',
  date: '2005-06-15',
  photos: [
    {
      id: 'photo1',
      url: '/images/wedding.jpg',    // Photo URL or path
      caption: 'The happy couple',
      date: '2005-06-15',
      location: {
        name: 'Wedding Venue',
        lat: 59.3293,
        lng: 18.0686,
      },
      source: 'local',  // or 'google-photos', 'onedrive', 'immich'
    }
  ],
  location: { ... },
  category: 'family',
}
```

### Storing Photos

Option 1: **Local Photos** (Simple)
- Create a `public/images` folder
- Place photos there
- Reference as `/images/photo.jpg`

Option 2: **External URLs** (Cloud)
- Upload photos to any image hosting service
- Use the full URL in the `url` field

Option 3: **Photo APIs** (Advanced, coming soon)
- Google Photos API integration
- OneDrive API integration
- Immich API integration

## Styling Customization

### Changing Colors

Edit `app/globals.css` to change theme colors:

```css
:root {
  --background: #ffffff;    /* Page background */
  --foreground: #171717;    /* Text color */
}
```

### Changing Category Colors

Edit the `categoryColors` object in:
- `components/Timeline.tsx` (lines 10-17)
- `components/MapView.tsx` (lines 13-20)

Example:
```typescript
const categoryColors: Record<LifeEvent['category'], string> = {
  birth: 'bg-pink-500',     // or '#ec4899' for MapView
  education: 'bg-blue-500', // Change to your preferred color
  // ... etc
};
```

## Personalizing Text

### Navigation Header

Edit `components/Navigation.tsx`:
- Change "Susann's Lifestory" to another name (line 15)
- Change "Celebrating 50 wonderful years!" (line 37)

### Timeline Title

Edit `components/Timeline.tsx`:
- Change "Susann's Life Journey" (line 26)

### Page Metadata

Edit `app/layout.tsx`:
- Change the title and description (lines 5-8)

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

Vercel will automatically detect Next.js and configure everything!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

### Other Hosting Options

The app can be deployed to any static hosting service that supports Next.js:
- GitHub Pages (with some configuration)
- AWS Amplify
- Azure Static Web Apps
- Google Cloud Run

## Future Enhancements

Ideas for extending the app:

1. **Photo Gallery View** - Add a third view showing all photos
2. **Search & Filter** - Filter events by category, year, or location
3. **Comments System** - Let family/friends add memories
4. **Print Timeline** - Generate a printable version
5. **API Integration** - Connect to Google Photos, OneDrive, or Immich
6. **Authentication** - Make it private with login
7. **Admin Panel** - Add/edit events without touching code
8. **Multiple People** - Track multiple family members

## Need Help?

- Check the main [README.md](README.md) for basic setup
- Review the [Next.js documentation](https://nextjs.org/docs)
- Inspect the existing code for examples
- The code is well-commented and follows React best practices

Enjoy creating your personal lifestory app! 🎉
