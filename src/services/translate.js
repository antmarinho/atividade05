import axios from "axios"

/**
 *
 * @param {string} selectedLanguage
 * @param {string} targetLanguage
 * @param {string} text
 * @returns {string}
 */
export async function getTranslate(selectedLanguage, targetLanguage, text) {
  const response = await axios.get(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${selectedLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURI(
      text
    )}`
  )

  return response.data[0][0][0]
}
