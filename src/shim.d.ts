declare module 'testlink-xmlrpc' {
    interface SearchTestCaseOption {
        testcaseexternalid: string
    }

    interface TestStep {
        actions: string
        expected_results: string
    }

    interface TestCase {
        preconditions: string
        steps: Array<TestStep>
    }

    interface TestLinkOptions {
        host: string | undefined
        port?: string | undefined
        secure: boolean | undefined
        apiKey: string | undefined;
    }

    class TestLink {
        constructor(params: TestLinkOptions, autoConnect?: boolean)
        getTestCase(params: SearchTestCaseOption): Promise<Array<TestCase>>
    }

    export = TestLink;
}

declare module 'string-strip-html' {
    function stripHtml(text: string): string

    export = stripHtml
}
