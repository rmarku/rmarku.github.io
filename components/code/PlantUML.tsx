import path from 'path'
import { execSync } from 'child_process'

type PlantUMLProps = {
  code: string
  [key: string]: any // for additional props
}

const PlantUML: React.FC<PlantUMLProps> = ({ code, ...props }) => {
  const plantumlJar = path.join('./lib/plantuml.jar')
  const svg = execSync(
    [
      'java',
      '-jar',
      '-Djava.awt.headless=true',
      '--add-opens=java.xml/com.sun.org.apache.xalan.internal.xsltc.trax="ALL-UNNAMED"',
      plantumlJar,
      '-tsvg',
      '-pipe',
    ].join(' '),
    { input: code },
  )

  return (
    // @ts-ignore
    <div {...props} dangerouslySetInnerHTML={{ __html: svg.toString() }} />
  )
}
export default PlantUML
