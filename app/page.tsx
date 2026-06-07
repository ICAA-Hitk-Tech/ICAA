import { redirect } from "next/navigation";
import { ACTIVE_YEAR } from "@/lib/config";

export default function RootPage() {
  redirect(`/${ACTIVE_YEAR}`);
}
