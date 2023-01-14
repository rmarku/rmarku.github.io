import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const LangSelect: React.FC<{
  locale: string
  changeLocale: (lang: string) => void
}> = ({ locale, changeLocale }) => {
  console.log(locale)
  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Lang
      </InputLabel>
      <Select sx={{ background: 'white' }} value={locale} autoWidth onChange={(e) => changeLocale(e.target.value)}>
        <MenuItem value="es">🇪🇸 es</MenuItem>
        <MenuItem value="en">🇬🇧 en</MenuItem>
      </Select>
    </FormControl>
  )
}

export default LangSelect
