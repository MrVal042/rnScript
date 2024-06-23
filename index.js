const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

const folderNames = [
  'assets',
  'base',
  'components',
  'constants',
  'hooks',
  'navigation',
  'screens',
  'service',
  'store',
  'types',
  'utils',
]
const subFolderNames = {
  assets: ['fonts', 'icons', 'images'],
  base: ['Component'],
  components: ['Elements', 'Form', 'Screen'],
  constants: [],
  hooks: [],
  navigation: ['AppNav', 'AuthNav', 'Onboard', 'types'],
  screens: ['App', 'Auth', 'Onboard'],
  service: ['.base'],
  store: ['actions', 'features', 'hooks', 'middleware', 'types'],
  types: ['app', 'services'],
  utils: [],
}

const createFolderStructure = async () => {
  let mainFolder
  // Prompt for user input
  await new Promise((resolve) =>
    readline.question(
      'Enter the name for the main/source folder: ',
      (answer) => {
        mainFolder = answer
        resolve()
      }
    )
  )
  readline.close()
  if (!mainFolder) {
    throw new Error('Please enter a name for the folder!')
  }
  for (const folder of folderNames) {
    const folderPath = `${mainFolder}/${folder}`
    for (const subfolder of subFolderNames[folder]) {
      const subFolderPath = `${folderPath}/${subfolder}`
      await createFolder(subFolderPath)
      await createEmptyFile(`${subFolderPath}/index.ts`)
    }
    await createFolder(folderPath)
    await createEmptyFile(`${folderPath}/index.ts`)
  }
  console.log(`${mainFolder} folder created successfully`)
}

const createFolder = async (path) => {
  const fs = require('fs').promises
  await fs.mkdir(path, { recursive: true })
}

const createEmptyFile = async (path) => {
  const fs = require('fs').promises
  await fs.writeFile(path, '')
}

createFolderStructure()
