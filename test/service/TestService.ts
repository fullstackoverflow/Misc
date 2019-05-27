import { Singleton } from "../../lib";
@Singleton
export class TestService {
	test() {
		return "success";
	}
}
