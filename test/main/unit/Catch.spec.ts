import { Before, After, Around, Catch } from "../../../lib";
import { Expect, TestFixture, AsyncTest, SetupFixture, Test } from 'alsatian';

class test {
	@Catch(err => {
		throw new Error("Catched");
	})
	async case1(param1: object) {
		throw new Error('throwed');
	}
}

let instance = new test();


@TestFixture('Catch test')
export class ExampleTestFixture {
	@Test('test')
	public async test1() {
		try {
			instance.case1({});
		} catch (e) {
			Expect(e.message).toEqual("Catched");
		}
	}

	@Test('test')
	public async test2() {
		try {
			await instance.case1({});
		} catch (e) {
			Expect(e.message).toEqual("Catched");
		}
	}
}