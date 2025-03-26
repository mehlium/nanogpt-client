import fs from 'node:fs'
import path from 'node:path'

// Directory where your files are located
const directoryPath = path.join(__dirname, '../../src/openapi-client')

// Function to process each file
function fixImportsAndExportsInFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf8')

  // Regex to match only local imports (relative paths starting with './' or '../')
  const importRegex =
    /import\s+(?:type\s+)?{[^}]+}\s+from\s+['"](\.\/[^\s'"]+|\.\.[^\s'"]+)(?=['"])/g

  // Regex to match local export statements (named exports or wildcard exports)
  const exportRegex =
    /export\s+(?:type\s+)?(\*|\{[^}]*\})\s+from\s+['"](\.\/[^\s'"]+|\.\.[^\s'"]+)(?=['"])/g

  // Replace import statements by adding .js suffix where applicable
  let updatedContent = fileContent.replace(importRegex, (match, importPath) => {
    // Only add '.js' if the import path doesn't already have it
    if (!importPath.endsWith('.js')) {
      return match.replace(importPath, `${importPath}.js`)
    }
    return match
  })

  // Replace export statements by adding .js suffix where applicable
  updatedContent = updatedContent.replace(exportRegex, (match, exportSpecifier, exportPath) => {
    // Only add '.js' if the export path doesn't already have it
    if (!exportPath.endsWith('.js')) {
      return match.replace(exportPath, `${exportPath}.js`)
    }
    return match
  })

  // If the content is modified, write the new content back to the file
  if (updatedContent !== fileContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8')
    console.log(`Updated imports and exports in: ${filePath}`)
  }
}

// Read the directory and process each file
fs.readdirSync(directoryPath).forEach((file) => {
  const filePath = path.join(directoryPath, file)

  // Check if the file is a JavaScript/TypeScript file
  if (filePath.endsWith('.ts') || filePath.endsWith('.js')) {
    fixImportsAndExportsInFile(filePath)
  }
})
