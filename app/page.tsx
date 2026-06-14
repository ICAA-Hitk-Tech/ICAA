import { permanentRedirect } from "next/navigation";
import { ACTIVE_YEAR } from "@/lib/config";

export default function RootPage() {
  permanentRedirect(`/${ACTIVE_YEAR}`);
}
