import { Http } from "../../api/Http"
import type { GetMeteoriteFilterRq, GetMeteoriteFilterRs } from "../../models/meteorites"

const apiOrigin = "https://localhost:7136/api/v1/IGamingTest"

export class MeteoritesService {
  public static async getFilteredMeteorites(input: GetMeteoriteFilterRq) {
    const response = await Http.post<GetMeteoriteFilterRs[]>(`${apiOrigin}/meteorites`, {
      data: input,
    })
    return response.data
  }
}