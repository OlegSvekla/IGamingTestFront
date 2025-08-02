export interface GetMeteoriteFilterRq {
  YearFrom?: number | null
  YearTo?: number | null
  RecClass?: string | null
  NameContains?: string | null
  Amount?: number | null
  Offset?: number | null
  SortBy?: string | null
  SortDirection?: string | null
}

export interface GetMeteoriteFilterRs {
  Year?: number | null
  Count: number
  TotalMass?: number | null
}
