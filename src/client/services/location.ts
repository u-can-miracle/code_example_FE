import countryCityState, { IState, ICity } from 'country-state-city'

export const countries = countryCityState.getAllCountries()
export const countriesDataSource: string[] = countries.map(({ name }) => name)

export function getCitiesByCountryName(countryName: string){
  const country = countries.find(c => c.name === countryName)
  const countryId = country ? country.id : ''
  const states: IState[] = countryCityState.getStatesOfCountry(countryId)
  const cities: ICity[] = states.reduce(
    (acc: ICity[], state: IState) => acc.concat(countryCityState.getCitiesOfState(state.id)),
    [],
  )

  return cities.map(({ name }) => name)
}
