export const get_weather = async (): Promise<string> => {
  const api = process.env['OPEN_WEATHER_API_URL']!

  return 'very cold. 17deg'
}
