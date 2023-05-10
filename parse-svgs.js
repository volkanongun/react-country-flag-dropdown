// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require('os')

fs.writeFile('flags.tsx', '', (err) => {
  if (err) throw err

  console.log('flags.tsx created successfully')

  const fileNames = fs.readdirSync('public/images/flags')

  let code = ''

  code += "import React from 'react';"
  code += os.EOL
  code += 'interface FlagProps {'
  code += os.EOL
  code += 'flag: string;'
  code += os.EOL
  code += '}'
  code += os.EOL

  code += 'const Flag: React.FC<FlagProps> = ({ flag }) => {'
  code += os.EOL
  code += 'const getFlag = (flag: any) => {'
  code += os.EOL
  code += 'switch(flag){'
  code += os.EOL

  fileNames.forEach((data) => {
    code += `case ('${data.slice(0, 2)}'):`
    code += os.EOL
    let file = fs.readFileSync(`images/flags/${data}`, 'utf8')
    code += 'return ' + file
    code += os.EOL
  })

  code += '}'
  code += '}'
  code += os.EOL
  code += 'return <>{getFlag(flag)}</>;'
  code += '}'
  code += os.EOL
  code += 'export default Flag;'

  fs.appendFileSync('flags.tsx', code)

  console.log('flags.tsx filled with flags successfully')

  fs.renameSync('flags.tsx', 'PhoneNumberSelectorWithFlags/flags.tsx')
})
