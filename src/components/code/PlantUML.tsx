import { execSync } from 'child_process'
import path from 'path'

type PlantUMLProps = {
  code: string
  [key: string]: any // for additional props
}

const PlantUML: React.FC<PlantUMLProps> = ({ code, ...props }) => {
  const plantumlJar = path.join('./src/lib/plantuml.jar')
  const svg = execSync(
    [
      'java',
      '-jar',
      '-Djava.awt.headless=true',
      '--add-opens=java.xml/com.sun.org.apache.xalan.internal.xsltc.trax="ALL-UNNAMED"',
      plantumlJar,
      '-theme',
      'materia',
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
