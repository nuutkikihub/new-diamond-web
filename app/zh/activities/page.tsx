import { ActivityGallery } from "../../activities/activity-gallery";
import { activityMetadata } from "../../activities/translations";

export const metadata = activityMetadata("zh");

export default function ActivitiesPage() {
  return <ActivityGallery language="zh" />;
}
