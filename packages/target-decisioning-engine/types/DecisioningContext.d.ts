export interface UserContext {
  browserType: string,
  platform: string,
  locale: string,
  browserVersion: number
}

export interface PageContext {
  url: string,
  url_lc: string,
  path: string,
  path_lc: string,
  domain: string,
  domain_lc: string,
  subdomain: string,
  subdomain_lc: string,
  topLevelDomain: string,
  topLevelDomain_lc: string,
  query: string,
  query_lc: string,
  fragment: string,
  fragment_lc: string
}

export interface MboxContext {
  [key: string]: any;
}

export interface DecisioningContext {
  allocation: number,
  current_timestamp: number,
  current_time: string,
  current_day: number,
  user: UserContext,
  page: PageContext,
  referring: PageContext,
  mbox: MboxContext
}
