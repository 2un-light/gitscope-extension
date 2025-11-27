import * as vscode from 'vscode';
import { ICommand } from './interfaces/ICommand';
import { IGitService } from './interfaces/IGitService';
import { IGeminiService } from './interfaces/IGeminiService';
import { IGeminiClient } from './interfaces/IGeminiClientService';
import { IUserInteraction } from './interfaces/IUserInteraction';

import { GeminiService } from './service/geminiService';
import { GeminiClient } from './service/geminiClientService';
import { UserInteraction } from './ui/userInteraction';
import { GitService } from './service/gitService';

import { ExecuteCheckoutBranchCommand } from './commands/CheckoutBranchCommand';
import { ExecuteCloneCommand } from './commands/CloneCommand';
import { ExecuteCommitCommand } from './commands/CommitCommand';
import { ConfigGeminiAPICommand } from './commands/GeminiAPICommand';
import { ExecuteRecommandAndCreateBranchCommand } from './commands/RecommandAndCreateBranchCommand';
import { ExecuteStageAllCommand } from './commands/StageAllCommand';
import { ExecutePullCommand } from './commands/PullCommand';
import { ExecutePushCommand } from './commands/PushCommand';
import { ExecuteMergeCommand } from './commands/MergeCommand';
import { ExecuteDeleteLocalBranchCommand } from './commands/DeleteLocalBranchCommand';

import { GenerateCommitMessageCommand } from './commands/generateCommitMessageCommand';
import { WelcomeCommand } from './commands/WelcomeCommand';
import { ShowFlowNavigator } from './commands/ShowFlowNavigator';
import { ExecuteCreateTagAndPush } from './commands/CreateTagAndPush';

export function activate(context: vscode.ExtensionContext) {

    // --- 1. 의존성 객체 생성 ---

    // 1-1. GitService 주입
    const workspaceFolders = vscode.workspace.workspaceFolders;
    const rootPath = workspaceFolders?.[0].uri.fsPath ?? process.cwd();
    const gitService: IGitService = new GitService(rootPath);

    // 1-2. Gemini Service 주입
    const clientFactory = (apiKey: string): IGeminiClient => {
        return new GeminiClient(apiKey);
    };
    const geminiService: IGeminiService = new GeminiService(context, clientFactory);

    // 1-3. User Interaction 주입
    const userInteraction: IUserInteraction = new UserInteraction("GitScope Output Channel");


    // --- 2. 커맨드 인스턴스 생성 및 의존성 주입 (DI) ---
    
    // (Command, ID, 필요한 의존성)을 포함하는 배열
    const commandsToRegister: { id: string, command: ICommand }[] = [

      //0. webView 커맨드
      { id: 'gitScope.showGitScopeNavigator',
        command: new ShowFlowNavigator(context, userInteraction)},

      // 1. gitScope 시작 커맨드
      { id: 'gitScope.startGitScope', 
        command: new WelcomeCommand(userInteraction) }, 

      // 2. API 키 설정 커맨드
      { id: 'gitScope.configGeminiAPIKey', 
        command: new ConfigGeminiAPICommand(context, userInteraction) },

      // 3. git Clone 커맨드
      { id: 'gitScope.executeCloneCommand', 
        command: new ExecuteCloneCommand(gitService, userInteraction) },

      // 4. Branch 생성 커맨드
      { id: 'gitScope.executeCreateBranchCommand', 
        command: new ExecuteRecommandAndCreateBranchCommand(context, gitService, geminiService, userInteraction) },

      // 5. 브랜치 checkout 커맨드
      { id: 'gitScope.executeCheckoutBranchCommand', 
        command: new ExecuteCheckoutBranchCommand(gitService, userInteraction) },

      // 6. 모든 변경사항 스테이징 커맨드
      { id: 'gitScope.executeStageAllCommand', 
        command: new ExecuteStageAllCommand(gitService, userInteraction) },
      
      // 7. commit Message 생성 커맨드 
      { id: 'gitScope.generateMessage', 
        command: new GenerateCommitMessageCommand(context, gitService, geminiService, userInteraction) },

      // 8. Commit 커맨드
      { id: 'gitScope.executeCommitCommand', 
        command: new ExecuteCommitCommand(gitService, userInteraction) },

      // 9. Pull 커맨드
      { id: 'gitScope.executePullCommand', 
        command: new ExecutePullCommand(gitService, userInteraction) },

      // 10. Push 커맨드
      { id: 'gitScope.executePushCommand', 
        command: new ExecutePushCommand(gitService, userInteraction) },

      // 11. Merge 커맨드
      { id: 'gitScope.executeMergeCommand', 
        command: new ExecuteMergeCommand(gitService, userInteraction) },

      // 12. local branch 삭제 커맨드
      { id: 'gitScope.executeDeleteLocalBranchCommand', 
        command: new ExecuteDeleteLocalBranchCommand(gitService, userInteraction) },

      //13. Tag 생성 및 push 커맨드
      { id: 'gitScope.createTagAndPushCommand', 
        command: new ExecuteCreateTagAndPush(gitService, userInteraction) },
  ];
  
  // --- 3. VS Code 등록 ---
  commandsToRegister.forEach(({ id, command }) => {
      // 모든 커맨드는 인스턴스의 execute() 메서드를 호출
      context.subscriptions.push(
          vscode.commands.registerCommand(id, () => command.execute())
      );
  });
}

export function deactivate() {}