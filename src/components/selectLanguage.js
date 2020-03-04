import React from "react"
import { useIntl, changeLocale } from "gatsby-plugin-intl"

import blogStyles from "./selectLanguage.module.scss"

export default function() {
  const intl = useIntl()

  const handleChange = ev => {
      changeLocale(ev.target.value)
  }
  
  return (
    <label className={blogStyles.selectLanguage + " no-print"}>
      <select defaultValue={intl.locale} onChange={handleChange} onBlur={handleChange}>
        <option>es</option>
        <option>en</option>
      </select>
    </label> 
  )
}
