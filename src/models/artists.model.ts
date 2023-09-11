export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Artists {
  artists: {
    href: string;
    items: Array<Artist>;
    limit: number;
    next: string;
    offset: number;
    previous: number | null;
    total: number;
  };
}
