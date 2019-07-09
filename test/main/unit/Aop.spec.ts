import "jest";
import { Before, After, Around } from "../../../lib";

class Test {
	@Before(param1 => {
		param1.test = 222;
	})
	case1(param1: object) {
		return param1;
	}

	@After(param1 => {
		param1.test = 333;
	})
	case2(param1: any) {
		param1.test = 111;
		return param1;
	}

	@Around(param1 => {
		param1.test = 111;
	})
	case3(param1: any) {
		param1.test = 222;
		return param1;
	}

	@Before(param1 => {
		param1.test = 222;
	})
	async case4(param1: object) {
		return param1;
	}

	@After(param1 => {
		param1.test = 333;
	})
	async case5(param1: any) {
		param1.test = 111;
		return param1;
	}

	@Around(param1 => {
		param1.test = 111;
	})
	async case6(param1: any) {
		param1.test = 222;
		return param1;
	}
}

let instance = new Test();

describe("Aop", () => {
	it("Before should change sync function params correct", () => {
		expect(instance.case1({})).toStrictEqual({ test: 222 });
	});

	it("After should change sync function params correct", () => {
		expect(instance.case2({})).toStrictEqual({ test: 333 });
	});

	it("Around should change sync function params correct", () => {
		expect(instance.case3({})).toStrictEqual({ test: 111 });
	});

	it("Before should change Async function params correct", async () => {
		expect(await instance.case4({})).toStrictEqual({ test: 222 });
	});

	it("After should change Async function params correct", async () => {
		expect(await instance.case5({})).toStrictEqual({ test: 333 });
	});

	it("Around should change Async function params correct", async () => {
		expect(await instance.case6({})).toStrictEqual({ test: 111 });
	});
});
