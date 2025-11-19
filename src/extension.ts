import * as vscode from 'vscode';
import { welcomeCommand } from './commands/welcomeCommand.js';
import { configGeminiAPICommand } from './commands/configGeminiAPICommand.js';
import { generateCommitMessageCommand } from './commands/generateCommitMessageCommand.js';
import { executeCommitCommand } from './commands/executeCommitCommand.js';
import { executePullCommand } from './commands/executePullCommand.js';
import { executePushCommand } from './commands/executePushCommand.js';
import { executeCloneCommand } from './commands/executeCloneCommand.js';
import { executeCreateBranchCommand } from './commands/executeCreateBranchCommand.js';
import { executeStageAllCommand } from './commands/executeStageAllCommand.js';
import { executeCheckoutBranchCommand } from './commands/executeCheckoutBranchCommand.js';
import { executeMergeCommand } from './commands/executeMergeCommand.js';
import { executeDeleteLocalBranchCommand } from './commands/executeDeleteLocalBranchCommand.js';

export function activate(context: vscode.ExtensionContext) {
	//1. gitScope 시작 커맨드 등록
	let welcome = vscode.commands.registerCommand(
		'gitScope.startGitScope',
		() => welcomeCommand()
	);

	//2. API 키 설정 커맨드 등록
	let configAPIKey = vscode.commands.registerCommand(
		'gitScope.configGeminiAPIKey',
		() => configGeminiAPICommand(context)
	);

	//3. git Clone 커맨드
	let executeClone = vscode.commands.registerCommand(
		'gitScope.executeCloneCommand',
		() => executeCloneCommand()
	);

	//4. Branch 생성 커맨드
	let executeCreateBranch = vscode.commands.registerCommand(
		'gitScope.executeCreateBranchCommand',
		() => executeCreateBranchCommand(context)
	);

	//5. 브랜치 checkout 커맨드
	let executeCheckout = vscode.commands.registerCommand(
		'gitScope.executeCheckoutBranchCommand',
		() => executeCheckoutBranchCommand()
	);

	//6. 모든 변경사항 스테이징 커맨드
	let executeStageAll = vscode.commands.registerCommand(
		'gitScope.executeStageAllCommand',
		() => executeStageAllCommand()
	);

	//7. commit Message 생성 커맨드 등록
	let generateCommitMessage = vscode.commands.registerCommand(
		'gitScope.generateMessage',
		() => generateCommitMessageCommand(context)
	);

	//8. Commit 커맨드 등록
	let executeCommit = vscode.commands.registerCommand(
		'gitScope.executeCommitCommand',
		() => executeCommitCommand()
	);

	//9. Pull 커맨드 등록
	let executePull = vscode.commands.registerCommand(
		'gitScope.executePullCommand',
		() => executePullCommand()
	);

	//10. Push 커맨드 등록
	let executePush = vscode.commands.registerCommand(
		'gitScope.executePushCommand',
		() => executePushCommand()
	);

	//11. Merge 커맨드
	let executeMerge = vscode.commands.registerCommand(
		'gitScope.executeMergeCommand',
		() => executeMergeCommand()
	);

	//12. local branch 삭제 커맨드
	let executeDeleteBranch = vscode.commands.registerCommand(
		'gitScope.executeDeleteLocalBranchCommand',
		() => executeDeleteLocalBranchCommand()
	);

	context.subscriptions.push(welcome, configAPIKey, executeClone, executeCreateBranch, executeCheckout,
								executeStageAll, generateCommitMessage, executeCommit, executeCommit, executePull, executePush, executeMerge,
								executeDeleteBranch);
}

export function deactivate() {}