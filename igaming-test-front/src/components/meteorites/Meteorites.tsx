import { useState } from "react"
import classes from "@styles/meteorites/Meteorites.module.scss"

import { CustomDropdown } from "./CustomDropdown"
import { MeteoritesService } from "./MeteoritesService"
import type { GetMeteoriteFilterRq, GetMeteoriteFilterRs } from "../../models/meteorites"
import { HandleHttpError } from "../../api/HandleHttpError"
import { useTranslation } from "react-i18next"
import { classesOptions } from "../../models/meteorites/constants"
import { SortDirectionEnum } from "../../models/meteorites/enums"

export const Meteorites = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "meteorites",
  });

  const sortOptions = [
    { label: t("sorting.asc"), value: SortDirectionEnum.Asc },
    { label: t("sorting.desc"), value: SortDirectionEnum.Desc },
  ]

  const years = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => ({
    label: String(1900 + i),
    value: 1900 + i,
  }))

  const [yearFrom, setYearFrom] = useState(years[0])
  const [yearTo, setYearTo] = useState(years[years.length - 1])
  const [selectedClass, setSelectedClass] = useState(classesOptions[0])
  const [sortDirection, setSortDirection] = useState(sortOptions[0])
  const [meteorites, setMeteorites] = useState<GetMeteoriteFilterRs[]>([])
  const [namePart, setNamePart] = useState("")

  const handleYearFromChange = (newFrom: { label: string; value: number }) => {
    if (newFrom.value > yearTo.value) {
      setYearTo(newFrom)
    }
    setYearFrom(newFrom)
  }

  const handleYearToChange = (newTo: { label: string; value: number }) => {
    if (newTo.value < yearFrom.value) {
      setYearFrom(newTo)
    }
    setYearTo(newTo)
  }

  const handleNamePartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setNamePart(value)
    }
  }

  const handleFindMeteoritesButton = async () => {
    const request: GetMeteoriteFilterRq = {
      YearFrom: yearFrom.value,
      YearTo: yearTo.value,
      RecClass: selectedClass.value === "all" ? null : selectedClass.value,
      SortDirection: sortDirection.value,
      NameContains: namePart.trim() || null,
    }

    try {
      const result = await MeteoritesService.getFilteredMeteorites(request);
      setMeteorites(result);
    } catch (error) {
      HandleHttpError(error);
    }
  }

  return (
    <div className={classes.meteoritesContainer}>
      <div className={classes.filterPanel}>
        <div className={classes.dropdownGroup}>
          <span>{t("yearFrom")}:</span>
          <CustomDropdown options={years} value={yearFrom} onChange={handleYearFromChange} />
        </div>

        <div className={classes.dropdownGroup}>
          <span>{t("yearTo")}:</span>
          <CustomDropdown options={years} value={yearTo} onChange={handleYearToChange} />
        </div>

        <div className={classes.dropdownGroup}>
          <span>{t("class")}:</span>
          <CustomDropdown options={classesOptions} value={selectedClass} onChange={setSelectedClass} />
        </div>

        <div className={classes.dropdownGroup}>
          <span>{t("sorting")}:</span>
          <CustomDropdown options={sortOptions} value={sortDirection} onChange={setSortDirection} />
        </div>

        <div className={classes.dropdownGroup}>
          <label htmlFor="namePartInput">{t("namePart")}:</label>
          <input
            id="namePartInput"
            type="text"
            value={namePart}
            onChange={handleNamePartChange}
            maxLength={10}
            placeholder={t("namePartPlaceholder")}
          />
        </div>

        <button className={classes.findMeteoritesButton} onClick={handleFindMeteoritesButton}>
          {t("findMeteorites")}
        </button>
      </div>

      <div className={classes.tableWrapper}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>{t("year")}</th>
              <th>{t("meteoritesCount")}</th>
              <th>{t("massSum")}</th>
            </tr>
          </thead>
          <tbody>
            {meteorites.map((item, index) => (
              <tr key={index}>
                <td>{item.Year ?? "—"}</td>
                <td>{item.Count}</td>
                <td>{item.TotalMass ?? "—"}</td>
              </tr>
            ))}

          <tr>
            <td><strong>{t("total")}</strong></td>
            <td>
              <strong>
                {meteorites.reduce((sum, item) => sum + item.Count, 0)}
              </strong>
            </td>
            <td>
              <strong>
                {meteorites.reduce((sum, item) => sum + (item.TotalMass ?? 0), 0)}
              </strong>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
      
    </div>
  )
}
