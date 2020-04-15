import TestLink = require('testlink-xmlrpc')
import stripHtml = require('string-strip-html')

export interface TestLinkOptions {
  host: string | undefined
  port?: string | undefined
  secure: boolean | undefined
  apiKey: string | undefined
}

export class API {
  testlink: TestLink
  constructor(params: TestLinkOptions) {
    this.testlink = new TestLink(params);
  }
  async getTestCaseById(id: string): Promise<string> {
    let steps = "Preconditions: \n"
    const option = {
      testcaseexternalid: id
    }
    let result = await this.testlink.getTestCase(option)
    steps = steps + result[0].preconditions + "\n"
    steps = steps + "Test Steps: \n"
    for (const step of result[0].steps) {
      steps = steps + step.actions + "\n"
      steps = steps + "Expected: \n"
      steps = steps + step.expected_results + "\n"
      steps = steps + "\n"
    }
    return stripHtml(steps)
  }
}
