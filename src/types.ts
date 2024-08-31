export interface Fetch {
  userid: string;
  status: string;
  time: string;
}

export interface Params {
  request_id: string;
  user_id: string;
  time_generated: string;
  ofp_layout: string;
  airac: string;
  units: string;
}

export interface General {
  release: string;
  icao_airline: string;
  flight_number: string;
  is_etops: string;
  dx_rmk: string;
  is_detailed_profile: string;
  cruise_profile: string;
  climb_profile: string;
  descent_profile: string;
  alternate_profile: string;
  reserve_profile: string;
  costindex: string;
  cont_rule: string;
  initial_altitude: string;
  stepclimb_string: string;
  avg_temp_dev: string;
  avg_tropopause: string;
  avg_wind_comp: string;
  avg_wind_dir: string;
  avg_wind_spd: string;
  gc_distance: string;
  route_distance: string;
  air_distance: string;
  total_burn: string;
  cruise_tas: string;
  cruise_mach: string;
  passengers: string;
  route: string;
  route_ifps: string;
  route_navigraph: string;
}

export interface Airport {
  icao_code: string;
  iata_code: string;
  elevation: string;
  pos_lat: string;
  pos_long: string;
  name: string;
  timezone: string;
  plan_rwy: string;
  trans_alt: string;
  trans_level: string;
  metar: string;
  metar_time: string;
  metar_category: string;
  metar_visibility: string;
  metar_ceiling: string;
  taf: string;
  taf_time: string;
  atis: Atis;
}

export interface Atis {
  network: string;
  issued: string;
  letter: string;
  phonetic: string;
  type: string;
  message: string;
}

export interface Route {
  origin: string;
  destination: string;
}

export interface Fuel {
  taxi: string;
  enroute_burn: string;
  contingency: string;
  alternate_burn: string;
  reserve: string;
  etops: string;
  extra: string;
  min_takeoff: string;
  plan_takeoff: string;
  plan_ramp: string;
  plan_landing: string;
  avg_fuel_flow: string;
  max_tanks: string;
}
export interface Weights {
  oew: string;
  pax_count: string;
  bag_count: string;
  pax_count_actual: string;
  bag_count_actual: string;
  pax_weight: string;
  bag_weight: string;
  freight_added: string;
  cargo: string;
  payload: string;
  est_zfw: string;
  max_zfw: string;
  est_tow: string;
  max_tow: string;
  max_tow_struct: string;
  tow_limit_code: string;
  est_ldw: string;
  max_ldw: string;
  est_ramp: string;
}

export interface Aircraft {
  icaocode: string;
  iatacode: string;
  base_type: string;
  icao_code: string;
  iata_code: string;
  name: string;
  reg: string;
  fin: string;
  equip: string;
  fuelfact: string;
  fuelfactor: string;
  max_passengers: string;
  internal_id: string;
  is_custom: string;
}

export interface Images {
  directory: string;
  map: Map[];
}

export interface Map {
  name: string;
  link: string;
}

export interface Links {
  skyvector: string;
}

export interface PrefileNetwork {
  form: string;
  link: string;
  name: string;
  site: string;
}

export interface Prefile {
  vatsim: PrefileNetwork;
  ivao: PrefileNetwork;
  pilotedge: PrefileNetwork;
  poscon: PrefileNetwork;
}

export interface SimbriefFlightplan {
  fetch: Fetch;
  params: Params;
  general: General;
  origin: Airport;
  destination: Airport;
  alternate: Airport;
  fuel: Fuel;
  weights: Weights;
  images: Images;
  links: Links;
  aircraft: Aircraft;
  prefile: Prefile;
}
