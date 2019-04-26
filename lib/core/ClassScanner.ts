import glob from "glob";
import "reflect-metadata";

export class ClassScanner {
	private path: string;
	constructor(path: string) {
		this.path = path;
	}

	scan() {
		return glob.sync(this.path).reduce((pre, curr) => {
			return pre.concat(Object.values(require(curr)));
		}, []);
	}
}