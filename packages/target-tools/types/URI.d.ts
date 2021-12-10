export interface URI {
  url: string;
  path: string;
  query: string;
  fragment: string;
  subdomain?: string;
  domain?: string;
  topLevelDomain?: string;
}
