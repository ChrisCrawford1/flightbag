import axios from 'axios';
import { SimbriefFlightplan } from '../types';

export const FetchLatestFlightplan = async (username: string) => {
  const result = await axios(
    `https://www.simbrief.com/api/xml.fetcher.php?username=${username}&json=1`
  );

  return result.data as SimbriefFlightplan;
};
