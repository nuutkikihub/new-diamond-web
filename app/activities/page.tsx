import type { Metadata } from "next";
import { ActivityGallery } from "./activity-gallery";

export const metadata: Metadata = {
  title: "กิจกรรมสาธารณประโยชน์ | New Diamond Starch",
  description: "กิจกรรมสาธารณประโยชน์ของบริษัท นิว ไดมอนด์ สตาร์ช จำกัด เพื่อสังคม สิ่งแวดล้อม เกษตรกร และเยาวชน",
};

export default function ActivitiesPage() {
  return <ActivityGallery />;
}
