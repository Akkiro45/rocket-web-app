const getColor = (theme) => {
  const LIGHT_THEME = {
    theme: 'LIGHT',
    primary: '#ff7043',
    subPrimary: '#ff8a65',
    statusBar: '#ff5722',
    textColor: '#000000',
    primaryTextColor: '#ff7043',
    background: '#ffffff',
    spinner: '#ff8a65',
    danger: '#f44336',
    linkColor: '#2874ff',
    success: '#00d348'
  }
  const DARK_THEME = {
    theme: 'DARK',
    primary: '#ff7043',
    subPrimary: '#ff8a65',
    statusBar: '#ff5722',
    textColor: '#ffffff',
    primaryTextColor: '#ff7043',
    background: '#424242',
    spinner: '#ff8a65',
    danger: '#f44336',
    linkColor: '#2874ff',
    success: '#00d348'
  }
  if(theme === 'DARK') {
    return DARK_THEME;
  } else {
    return LIGHT_THEME;
  }
}

export default getColor;