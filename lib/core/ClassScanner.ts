import glob from "glob";
import { statSync } from "fs";

export class ClassScanner {
	private path: string | string[];
	constructor(path: string | string[]) {
		this.path = path;
	}

	scan() {
		if (Array.isArray(this.path)) {
			return this.path
				.map(p => {
					return glob.sync(p).reduce((pre, curr) => {
						if(statSync(curr).isFile()){
							return pre.concat(Object.values(require(curr)));
						}else{
							return pre;
						}
					}, []);
				})
				.reduce((pre, curr) => {
					return pre.concat(curr);
				}, []);
		} else {
			return glob.sync(this.path).reduce((pre, curr) => {
				if(statSync(curr).isFile()){
					return pre.concat(Object.values(require(curr)));
				}else{
					return pre;
				}
			}, []);
		}
	}
}
