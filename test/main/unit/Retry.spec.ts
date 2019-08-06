import { Retry } from "../../../lib/index";

class Test {
	retry = 0;

	@Retry(3)
	case1(param1: object) {
		this.retry++;
		throw new Error('throwed');
	}

	@Retry(3)
	async case2(param1: object) {
		this.retry++;
		throw new Error('throwed');
	}
}

describe("Retry", () => {
	it("Retry Sync should work", () => {
		let instance = new Test();
		try {
			instance.case1({});
		} catch (e) {
			expect(instance.retry).toStrictEqual(3);
		}
	});

	it("Retry Async should work", async () => {
		let instance = new Test();
		try {
			await instance.case1({});
		} catch (e) {
			expect(instance.retry).toStrictEqual(3);
		}
	});
});
