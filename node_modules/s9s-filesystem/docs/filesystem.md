# Filesystem

File system module





## Class: Filesystem
File system class

### Filesystem.Filesystem.getStat(path) 

Returns stats for file/directory/symbolic link


**Parameters**

**path**: `string`, The path to check


**Returns**: `boolean | Object | *`

### Filesystem.Filesystem.isFile(path) 

Checks if the path is a file


**Parameters**

**path**: `string`, The path to check


**Returns**: `boolean`

### Filesystem.Filesystem.isDirectory(path) 

Checks if the path is a directory


**Parameters**

**path**: `string`, The path to check


**Returns**: `boolean`

### Filesystem.Filesystem.fileExists(path) 

Checks if files exists


**Parameters**

**path**: `string`, The path to check


**Returns**: `boolean`

### Filesystem.Filesystem.directoryExists(path) 

Checks if directory exists


**Parameters**

**path**: `string`, The path to check


**Returns**: `boolean`

### Filesystem.Filesystem.createDirectory(path, mode) 

Create a new directory (recursively)


**Parameters**

**path**: `string`, The path to create
**mode**: , The mode to create a directory with, default 0777 & (~process.umask())


**Returns**: `boolean`

### Filesystem.Filesystem.deleteDirectory(path) 

Deletes a directory


**Parameters**

**path**: `string`, The path to the directory to delete


**Returns**: `boolean`

### Filesystem.Filesystem.deleteFile(path) 

Delete a file


**Parameters**

**path**: `string`, Path to file


**Returns**: `boolean`

### Filesystem.Filesystem.rename(oldName, newName) 

Renames a file or directory


**Parameters**

**oldName**: `string`, Original name
**newName**: `string`, New name


**Returns**: `boolean`

### Filesystem.Filesystem.readFile(path, options) 

Reads file contents


**Parameters**

**path**: `string`, Path to file
**options**: `string`, Default 'utf8'


**Returns**: `boolean | string`

### Filesystem.Filesystem.writeFile(path, data, options) 

Write file contents


**Parameters**

**path**: `string`, Path to file
**data**: `string`, Data to write
**options**: `string`, Default 'utf8'


**Returns**: `boolean`

### Filesystem.Filesystem.readJson(path) 

Reads JSON files and returns a parsed json object


**Parameters**

**path**: `string`, Path to JSON file


**Returns**: `boolean | Object`

### Filesystem.Filesystem.writeJson(path, data) 

Converts data object to json string and writes to path


**Parameters**

**path**: `string`, Path to json file
**data**: `Object`, Data to write


**Returns**: `boolean`

### Filesystem.Filesystem.appendFile(path, data, options) 

Append data to the end of file


**Parameters**

**path**: `string`, Path to file
**data**: `string`, Data to append
**options**: `object | string`, Write options, default "utf8"


**Returns**: `boolean`

### Filesystem.Filesystem.prependFile(path, data, options) 

Prepend data to the end of file


**Parameters**

**path**: `string`, Path to file
**data**: `string`, Data to prepend
**options**: `object | string`, Read/Write options, default "utf8"


**Returns**: `boolean`

### Filesystem.Filesystem.listDirectory(path) 

Returns list of items in directory


**Parameters**

**path**: , Returns list of items in directory


**Returns**: `boolean`


* * *

**Author:** Severalnines AB

**License:** MIT





*© 2016 Severalnines AB*
