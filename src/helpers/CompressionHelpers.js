import { gunzipSync } from 'zlib'

/**
 * Uses zlib to decompress barotrauma savefiles and splits files from each other
 * @param {Buffer} saveContent  - raw savefile content as buffer
 * @returns {Object} savefile   - object where keys are filenames and values are file contents
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
