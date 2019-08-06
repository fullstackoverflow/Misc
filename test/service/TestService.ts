import { Singleton } from "../../lib/index";
@Singleton
export class TestService {
	test() {
		return "success";
	}
}
