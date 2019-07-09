import "jest";
import { Before, After, Around, Catch } from "../../../lib";

class Test {
	@Catch(err => {
		throw new Error("Catched");
	})
	async case1(param1: object) {
		throw new Error('throwed');
	}
}

let instance = new Test();

describe("Catch", () => {
	it("Catch should catch sync exception", () => {
		try {
			instance.case1({});
		} catch (e) {
			expect(e.message).toStrictEqual("Catched");
		}
	});

	it("Catch should catch Async exception", async () => {
		try {
			await instance.case1({});
		} catch (e) {
			expect(e.message).toStrictEqual("Catched");
		}
	});
});
