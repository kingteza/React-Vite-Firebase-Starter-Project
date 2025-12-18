export const onClickChangeLanguage = async (i18n) => {
  const lang = i18n.language === 'en' ? 'si' : 'en';
  i18n.changeLanguage(lang);
  localStorage.setItem('language', lang);
};
