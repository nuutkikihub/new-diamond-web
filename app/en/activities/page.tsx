import { ActivityGallery } from "../../activities/activity-gallery";
import { activityMetadata } from "../../activities/translations";

export const metadata = activityMetadata("en");

export default function ActivitiesPage() {
  return <ActivityGallery language="en" />;
}
