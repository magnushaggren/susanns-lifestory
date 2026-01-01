'use client';

import { LifeEvent } from '@/types';
import { format } from 'date-fns';

interface TimelineProps {
  events: LifeEvent[];
}

const categoryColors: Record<LifeEvent['category'], string> = {
  birth: 'bg-pink-500',
  education: 'bg-blue-500',
  travel: 'bg-green-500',
  family: 'bg-purple-500',
  career: 'bg-orange-500',
  milestone: 'bg-yellow-500',
  other: 'bg-gray-500',
};

export default function Timeline({ events }: TimelineProps) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Susann&apos;s Life Journey
      </h1>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700"></div>

        {/* Events */}
        <div className="space-y-8">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative pl-20">
              {/* Dot on timeline */}
              <div
                className={`absolute left-6 w-5 h-5 rounded-full ${
                  categoryColors[event.category]
                } border-4 border-white dark:border-gray-900`}
              ></div>

              {/* Event card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(event.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {event.description}
                </p>
                {event.location && (
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location.name}
                  </div>
                )}
                <div className="mt-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${
                      categoryColors[event.category]
                    }`}
                  >
                    {event.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
