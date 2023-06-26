import { execSync } from 'child_process'

export default function syncfetch(url: string): string {
  if (url == '') return ''
  const content = execSync(`curl ${url}`, { encoding: 'utf8', stdio: 'pipe' })
  return content
}
