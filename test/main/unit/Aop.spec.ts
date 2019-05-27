import "jest";
import { Before } from "../../../lib";

class Test {
	@Before(param1 => {
		param1 = 222;
	})
	case1(param1: string) {
		return param1;
	}
}

let instance = new Test();

describe("Aop", () => {
	beforeAll(done => {
		instance = new Test();
	});

	describe("Before should change sync function params correct", () => {
		expect(instance.case1("test")).toEqual(222);
	});
});
