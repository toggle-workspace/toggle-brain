import { OnboardingVideo } from "./kit/types";
import { welcome } from "./videos/welcome";
import { metaAds } from "./videos/meta-ads";
import { googleAds } from "./videos/google-ads";
import { tiktokAds } from "./videos/tiktok-ads";
import { seo } from "./videos/seo";
import { permissions } from "./videos/permissions";

// The client-onboarding series, in viewing order. Root.tsx maps this into one
// <Composition> per video. Add a video by adding a config here.
export const ONBOARDING_VIDEOS: readonly OnboardingVideo[] = [
  welcome,
  metaAds,
  googleAds,
  tiktokAds,
  seo,
  permissions,
];
