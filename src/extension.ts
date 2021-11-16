import * as vscode from 'vscode';
import * as fs from 'fs';
import * as cp from "child_process";
import { conf } from './conf';
import { posix } from 'path';

var terminal : vscode.Terminal;

export function activate(context: vscode.ExtensionContext) {
	terminal = vscode.window.createTerminal("c-runner terminal");

	// Config
	const workspaceUri = vscode.workspace.workspaceFolders![0].uri;
	const fileUri = workspaceUri.with({ path:posix.join(workspaceUri.path + "/c-runner.json")});

	if(!fs.existsSync(fileUri.fsPath))
	{
		// Todo: save currently opened file to config
let template = `{
	"EntryFile" : "main.c",
	"IncludeDirectories" : [""],
	"LibraryDirectories" : [""],
	"Libraries" : [""],
	"AdditionalParameters" : ""
}`
		
		fs.writeFileSync(fileUri.fsPath, template, { encoding: 'utf-8' });

		vscode.window.showInformationMessage('Added c-runner.json to the current workspace');
	}

	let runc = vscode.commands.registerCommand('c-runner.runc', async () => {
		// Loading the data every run because it can be changed when the extension is already activated
		let configData = await vscode.workspace.fs.readFile(fileUri);
		let config = new conf(Buffer.from(configData).toString());

		// Output to eventually display errors
		let outputChannel = vscode.window.createOutputChannel("c-runner");
		outputChannel.clear();

		let path = workspaceUri.with({path: posix.join(workspaceUri.path + "/" + config.entry)}).fsPath;
		let command = "gcc " + path + " -o " + path.substring(0, path.lastIndexOf("."));

		// 
		if(config.incDir[0] != "")
		{
			config.incDir.forEach(dir => {
				command += " -I" + workspaceUri.fsPath + "/" + dir;
			});
			
		}
		if(config.libDir[0] != "")
		{
			config.libDir.forEach(dir => {
				command += " -L" + workspaceUri.fsPath + "/" + dir;
			});
		}
		if(config.libs[0] != "")
		{
			config.libs.forEach(lib => {
				command += " -l" + lib;
			});
		}
		if(config.addi != "")
			command += " " + config.addi;

		//
		let compile = cp.spawn(command, [], { shell: true });
		let err = false;

		//
		outputChannel.appendLine("[Error while compiling!]");
		compile.stdout.on("data", (data) => {
			outputChannel.append(data.toString());
		});

		compile.stderr.on("data", (data) => {
			outputChannel.append(data.toString());
			err = true;
		});

		// On finished compiling
		compile.on("close", (code) => {
			if(err)
			{
				outputChannel.show();
				return;
			}
			outputChannel.dispose();
			
			// Reset the terminal in case it got closed
			terminal.dispose();
			terminal = vscode.window.createTerminal("c-runner terminal");

			// Run program in terminal
			terminal.sendText("cls");
			terminal.show();
			terminal.sendText(path.substring(0, path.lastIndexOf(".")) + ".exe");
		});
	});

	context.subscriptions.push(runc);
}

export function deactivate() {
	// Todo: when reloading the window the terminal doesn't dispose and it creates a new instance 
	terminal.dispose();
}
