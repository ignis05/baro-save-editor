import { gzipSync, gunzipSync } from 'zlib'

/**
 * Uses zlib to decompress barotrauma savefiles and splits files from each other
 * @param {Buffer} saveContent  - raw savefile content as buffer
 * @returns {Object} object where keys are filenames and values are file contents
 */
export function DecompressSave(saveContent) {
  var result = {}

  var buffer = Buffer.from(gunzipSync(saveContent))

  var i = 0
  while (i < buffer.length) {
    // file name
    var name_length = buffer.readInt32LE(i)
    i += 4
    var name = buffer.toString('utf-16le', i, i + name_length * 2)
    i += name_length * 2

    //file contents
    var f_length = buffer.readInt32LE(i)
    i += 4
    var f_content = buffer.slice(i, i + f_length)
    i += f_length

    result[name] = f_content
  }
  return result
}

/**
 * Merges files within object into one and compresses them using zlib
 * @param {Object} save   - object where keys are filenames and values are file contents
 * @returns {Buffer} raw savefile content as buffer
 */
export function CompressSave(save) {
  var buffer = Buffer.alloc(0)
  for (let [filename, content] of Object.entries(save)) {
    var name = Buffer.from(filename, 'utf-16le')
    var nameLength = Buffer.alloc(4)
    nameLength.writeInt32LE(filename.length)

    // if content is string, convert it to buffer
    var file = typeof content === 'string' ? Buffer.from(content, 'utf-8') : content
    var fileLength = Buffer.alloc(4)
    fileLength.writeInt32LE(file.length)

    buffer = Buffer.concat([buffer, nameLength, name, fileLength, file])
  }
  return gzipSync(buffer)
}

/**
 * Uses zlib to decompress .sub (gzip) file
 * @param {Buffer} fileContent  - raw .sub file content as buffer
 * @returns {String} string with sub xml
 */
export function DecompressSub(fileContent) {
  return gunzipSync(fileContent).toString('utf-8')
}

/**
 * Uses zlib to created compresses .sub (gzip) file
 * @param {String} xmlString  - string with sub xml
 * @returns {Buffer} compressed file content as Buffer
 */
export function CompressSub(xmlString) {
  return gzipSync(Buffer.from(xmlString, 'utf-8'))
}