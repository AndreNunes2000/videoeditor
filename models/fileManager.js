/**
 * @file Manager for work with media files
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

const { exec } = require('child_process');
import log from './logger';

export default {

	/**
	 * Get time duration of file. Return null when file is not video or audio.
	 *
	 * @param filepath
	 * @param mimeType
	 * @return {Promise<?string>}
	 */
	getDuration(filepath, mimeType) {
		return new Promise((resolve, reject) => {
			
			if (new RegExp(/^video\//).test(mimeType) || new RegExp(/^audio\//).test(mimeType)) {
				delete process.platform;
				process.platform = 'linux';

				let linuxFilepath = filepath.replaceAll("\\", "/");

				exec(`ffmpeg -i ${linuxFilepath} 2>&1 | grep Duration | cut -d ' ' -f 4`, {
					shell: "C:\\Program Files\\Git\\bin\\sh.exe"
				} ,(err, stdout) => {
					if (err) {
						log.error(err);
						resolve(null);
					}
					else {
						log.info("if2");
						
						let duration = stdout
						.trim()
						.replaceAll(",", "")
						.replaceAll(".", ",");

						if (duration !== '') duration += '0';
						resolve(duration);
					}
				});

				process.platform = 'win32';
			}
			else {
				resolve(null);
			}
		});
	}

};
