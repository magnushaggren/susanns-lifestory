import Timeline from '@/components/Timeline';
import { sampleEvents } from '@/data/sampleEvents';

export default function Home() {
  return (
    <div className="py-8">
      <Timeline events={sampleEvents} />
    </div>
  );
}
