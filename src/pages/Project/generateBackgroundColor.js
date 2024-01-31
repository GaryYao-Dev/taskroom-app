import stringAvatar from '../../utils/stringAvatar'

const generateBackgroundColor = (string, customizedColor) => {
  if (customizedColor) {
    if (customizedColor.length === 7) {
      return customizedColor + '2b'
    }
    return customizedColor
  }
  if (!string) {
    return '#fff'
  }
  const {
    sx: { bgcolor },
  } = stringAvatar(string)
  const opcityBgcolor = bgcolor + '2b'
  return opcityBgcolor
}

export default generateBackgroundColor
