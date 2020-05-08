export class Response {
	code: number;
	message: string;
	data: any;
	constructor(code: number, data: any, message: string = '') {
		this.code = code;
		this.message = message;
		this.data = data;
	}
}