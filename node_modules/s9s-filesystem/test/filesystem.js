const filesystem = require(__dirname + '/../filesystem');
const path = require('path');
const assert = require('assert');

describe('Filesystem', function () {

    it('Should be an Object', function () {
        assert.strictEqual(typeof(filesystem), 'object');
    });

    it('Filesystem.getStat', function () {
        assert.strictEqual(typeof(filesystem.getStat), 'function');
        var stats = filesystem.getStat(__filename);
        assert.strictEqual(typeof(stats), 'object');
        assert.notStrictEqual(stats.mode, undefined);
        assert.notStrictEqual(stats.uid, undefined);
        assert.notStrictEqual(stats.gid, undefined);
    });

    it('Filesystem.isFile', function () {
        assert.strictEqual(typeof(filesystem.isFile), 'function');
        assert.strictEqual(filesystem.isFile(__filename), true);
        assert.strictEqual(filesystem.isFile(__filename + 'not_exists'), false);
    });

    it('Filesystem.isDirectory', function () {
        assert.strictEqual(typeof(filesystem.isDirectory), 'function');
        assert.strictEqual(filesystem.isDirectory(__dirname), true);
        assert.strictEqual(filesystem.isDirectory(__dirname + 'not_exists'), false);
    });

    it('Filesystem.fileExists', function () {
        assert.strictEqual(typeof(filesystem.fileExists), 'function');
        assert.strictEqual(filesystem.fileExists(__filename), true);
        assert.strictEqual(filesystem.fileExists(__filename + 'not_exists'), false);
    });

    it('Filesystem.directoryExists', function () {
        assert.strictEqual(typeof(filesystem.directoryExists), 'function');
        assert.strictEqual(filesystem.directoryExists(__dirname), true);
        assert.strictEqual(filesystem.directoryExists(__dirname + 'not_exists'), false);
    });

    var fileName = '/tmp/tmp_filesystem_file';
    var dirName = '/tmp/tmp_filesystem_directory';
    var json = '{"propName":42}';

    it('Filesystem.createDirectory', function () {
        assert.strictEqual(typeof(filesystem.createDirectory), 'function');
        assert.strictEqual(filesystem.createDirectory(dirName), true);
        assert.strictEqual(filesystem.directoryExists(dirName), true);
    });

    it('Filesystem.deleteDirectory', function () {
        assert.strictEqual(typeof(filesystem.deleteDirectory), 'function');
        assert.strictEqual(filesystem.deleteDirectory(dirName), true);
        assert.strictEqual(filesystem.directoryExists(dirName), false);
    });

    it('Filesystem.deleteFile', function () {
        assert.strictEqual(typeof(filesystem.deleteFile), 'function');
        assert.strictEqual(filesystem.writeFile(fileName, 'a'), true);
        assert.strictEqual(filesystem.deleteFile(fileName), true);
        assert.strictEqual(filesystem.fileExists(fileName), false);
    });

    it('Filesystem.rename', function () {
        assert.strictEqual(typeof(filesystem.rename), 'function');
        filesystem.createDirectory(dirName);
        assert.strictEqual(filesystem.rename(dirName, dirName + '_new'), true);
        assert.strictEqual(filesystem.directoryExists(dirName + '_new'), true);
        filesystem.writeFile(fileName);
        assert.strictEqual(filesystem.rename(fileName, fileName + '_new'), true);
        assert.strictEqual(filesystem.fileExists(fileName + '_new'), true);
    });

    it('Filesystem.readFile', function () {
        assert.strictEqual(typeof(filesystem.readFile), 'function');
        assert.strictEqual(filesystem.writeFile(fileName, 'test'), true);
        assert.strictEqual(filesystem.readFile(fileName), 'test');
    });

    it('Filesystem.writeFile', function () {
        assert.strictEqual(typeof(filesystem.writeFile), 'function');
        assert.strictEqual(filesystem.writeFile(fileName, 'test'), true);
        assert.strictEqual(filesystem.readFile(fileName), 'test');
    });

    it('Filesystem.readJson', function () {
        assert.strictEqual(typeof(filesystem.readJson), 'function');
        assert.strictEqual(filesystem.writeFile(fileName, json), true);
        assert.strictEqual(filesystem.readJson(fileName).propName, 42);
    });

    it('Filesystem.writeJson', function () {
        assert.strictEqual(typeof(filesystem.writeJson), 'function');
        assert.strictEqual(filesystem.writeJson(fileName, {propName: 42}), true);
        assert.strictEqual(filesystem.readFile(fileName), json);
    });

    it('Filesystem.appendFile', function () {
        assert.strictEqual(typeof(filesystem.appendFile), 'function');
        filesystem.deleteFile(fileName);
        assert.strictEqual(filesystem.writeFile(fileName, 'a'), true);
        assert.strictEqual(filesystem.readFile(fileName), 'a');
        assert.strictEqual(filesystem.appendFile(fileName, 'b'), true);
        assert.strictEqual(filesystem.readFile(fileName), 'ab');
    });

    it('Filesystem.prependFile', function () {
        assert.strictEqual(typeof(filesystem.prependFile), 'function');
        filesystem.deleteFile(fileName);
        assert.strictEqual(filesystem.writeFile(fileName, 'a'), true);
        assert.strictEqual(filesystem.readFile(fileName), 'a');
        assert.strictEqual(filesystem.prependFile(fileName, 'b'), true);
        assert.strictEqual(filesystem.readFile(fileName), 'ba');
    });

    it('Filesystem.listDirectory', function () {
        assert.strictEqual(typeof(filesystem.listDirectory), 'function');
        var directoryContent;
        directoryContent = filesystem.listDirectory(__dirname);
        assert.notStrictEqual(directoryContent, false);
        assert.notStrictEqual(directoryContent.indexOf(path.basename(__filename)), -1);
        directoryContent = filesystem.listDirectory('/tmp/s9s/' + Math.random() * 1e6);
        assert.strictEqual(directoryContent, false);
    });

});