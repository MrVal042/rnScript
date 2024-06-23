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

  readline.close() // Close the prompt

  if (!mainFolder) {
    throw new Error('Please enter a name for the main folder.')
  }

  // Create folders
  for (const folder of folderNames) {
    const folderPath = `${mainFolder}/${folder}`
    await createFolder(folderPath)
    await createEmptyFile(`${folderPath}/index.ts`)
  }

  console.log(`Folder structure created successfully in: ${mainFolder}`)
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
