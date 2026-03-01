import { GeniusSong } from "./geniusSong";

export interface GeniusSearchResponse {
  response: {
    hits: Array<{
      type: string;
      result: GeniusSong;
    }>;
  };
}
