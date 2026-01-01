export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location?: {
    name: string;
    lat: number;
    lng: number;
  };
  photos?: Photo[];
  category: 'birth' | 'education' | 'travel' | 'family' | 'career' | 'milestone' | 'other';
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  date?: string;
  location?: {
    name: string;
    lat: number;
    lng: number;
  };
  source?: 'google-photos' | 'onedrive' | 'immich' | 'local';
}

export interface Memory {
  id: string;
  title: string;
  content: string;
  date?: string;
  photos?: Photo[];
  author?: string;
}
