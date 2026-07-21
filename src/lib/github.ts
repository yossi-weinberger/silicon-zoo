export const GITHUB_REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO || "yossi-weinberger/silicon-zoo";

export function suggestResidentUrl() {
  return `https://github.com/${GITHUB_REPO}/issues/new?template=suggest-resident.yml`;
}
