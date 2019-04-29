import glob from "glob";
import { statSync } from "fs";
import { resolve, join } from "path";

export class ClassScanner {
	private path: string | string[];
	constructor(path: string | string[]) {
		if (Array.isArray(path)) {
			this.path = path.map(p => resolve(p));
		} else {
			this.path = resolve(path);
		}
	}

	scan() {
		if (Array.isArray(this.path)) {
			return this.path
				.map(p => {
					return glob.sync(p).reduce((pre, curr) => {
						if (statSync(curr).isFile()) {
							return pre.concat(Object.values(require(curr)));
						} else {
							return pre;
						}
					}, []);
				})
				.reduce((pre, curr) => {
					return pre.concat(curr);
				}, []);
		} else {
			return glob.sync(this.path).reduce((pre, curr) => {
				if (statSync(curr).isFile()) {
					return pre.concat(Object.values(require(curr)));
				} else {
					return pre;
				}
			}, []);
		}
	}
}
