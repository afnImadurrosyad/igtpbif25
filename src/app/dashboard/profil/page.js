
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"

export default function Dashboard() {
  return (
    <div>
      <Analytics />
      <SpeedInsights/>
    </div>
  );
}
