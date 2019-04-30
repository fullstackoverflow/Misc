import glob from "glob";
import { statSync } from "fs";
import { resolve, join } from "path";

export class ClassScanner {
	private path: string[];
	constructor(path: string | string[]) {
		if (Array.isArray(path)) {
			this.path = path.map(p => {
				return this.pathResolve(p);
			});
		} else {
			this.path = [this.pathResolve(path)];
		}
	}

	private pathResolve(path: string) {
		return resolve(path);
	}

	scan() {
		return this.path
			.map(p => {
				return glob.sync(p).reduce((pre, curr) => {
					if (statSync(curr).isFile()) {
						console.log(curr);
						return pre.concat(Object.values(require(curr)));
					} else {
						return pre;
					}
				}, []);
			})
			.reduce((pre, curr) => {
				return pre.concat(curr);
			}, []);
	}
}
