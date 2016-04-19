# s9s-filesystem
[![Build Status](https://travis-ci.org/simon-s9/s9s-filesystem.svg?branch=master)](https://travis-ci.org/simon-s9/s9s-filesystem)

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


## License

Copyright (c) 2016 Severalnines AB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
