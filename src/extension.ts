import * as vscode from 'vscode';
import { TestLinkOptions, API } from './api';

export function activate({ subscriptions }: vscode.ExtensionContext) {

	// register a content provider for the cowsay-scheme
	const myScheme = 'testlink';
	const testlinkSettings: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('testlink')
	const testlinkOptions: TestLinkOptions = {
		host: testlinkSettings.get('host'),
		port: testlinkSettings.get('port'), // Set if you are not using default port
		secure: testlinkSettings.get('secure'), // Use https, if you are using http, set to false.
		apiKey: testlinkSettings.get('apiToken'), // The API KEY from TestLink. Get it from user profile.
	}
	const testlinkAPI = new API(testlinkOptions)

	const myProvider = new class implements vscode.TextDocumentContentProvider {
		// emitter and its event
		onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
		onDidChange = this.onDidChangeEmitter.event;
		async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
			return await testlinkAPI.getTestCaseById(uri.path)
		}
	}

	subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider));

	// register a command that opens a testlink-document
	subscriptions.push(vscode.commands.registerCommand('testlink.testSteps', async () => {
		let what = await vscode.window.showInputBox({ placeHolder: 'testlink id...' });
		if (what) {
			let uri = vscode.Uri.parse('testlink:' + what);
			let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
			await vscode.window.showTextDocument(doc, { preview: false });
		}
	}));
}
