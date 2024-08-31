/**
 *
 * @param {string} date
 * @returns
 */
export function dateConveror(date) {
  const dateConverted = new Date(date + "T00:00").toLocaleDateString()
  return dateConverted
}
