import posthog from "posthog-js";

type EventName =
  | "animal_search"
  | "animal_found"
  | "animal_not_found"
  | "random_clicked"
  | "brand_source_clicked"
  | "filter_changed"
  | "share_clicked"
  | "suggestion_clicked"
  | "alternative_animal_clicked";

type EventProps = Record<string, string | number | boolean | undefined>;

export function track(event: EventName, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.capture(event, props);
}
