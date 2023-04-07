import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .init({
    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json',
    },
    ns: ['common'],
    fallbackLng: 'fr',
    load: 'languageOnly',
  })

export default i18n
