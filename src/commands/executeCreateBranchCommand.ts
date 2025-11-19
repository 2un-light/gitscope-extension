import * as vscode from 'vscode';
import { checkout, createBranch, getGitDiff, getModifiedFiles, stageSelectedFiles, unstageSelectedFiles } from '../service/gitService';
import { selectFiles } from '../core/fileSelection';
import { generateBranchNames } from '../service/geminiService';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import { clearLastStagedFiles, getLastStagedFiles, saveLastStagedFiles } from '../core/fileScopeManager';

//사용자로부터 브랜치 생성 방식 입력받기
async function promptBranchCreationMethod(): Promise<'manualMode' | 'geminiMode' | undefined> {
    const manualOption = '✨ 새로운 브랜치 이름 수동 입력';
    const geminiRecommandOption = '🤖 Gemini AI에게 브랜치 이름 추천받기 (3가지)';

    const selection = await vscode.window.showQuickPick(
        [manualOption, geminiRecommandOption],
        { placeHolder: '브랜치 생성 방식을 선택해주세요.' }
    );

    if(!selection) return undefined;
    return selection === manualOption ? 'manualMode' : 'geminiMode';

}

//브랜치 이름 수동으로 입력하기
async function inputBranchName(): Promise<string | undefined> {
    return await vscode.window.showInputBox({
        prompt: '새로운 브랜치 이름을 입력하세요 (예: feat/my-new-feature)',
        ignoreFocusOut: true
    });
}

export async function executeCreateBranchCommand(context: vscode.ExtensionContext) {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);
    output.appendLine('🌳 Git 브랜치명 추천 시작');
    
    let selectedFiles: string[] = [];
    let diff: string;
    let branchName: string | undefined;

    try {
        
        //이전 스테이징 기록 정리
        const lastFiles = await getLastStagedFiles(context);

        if(lastFiles.length > 0) {
            output.appendLine('🧹 **정리 작업:** 이전에 선택된 파일 작업 디렉토리로 되돌리는 중...');
            await unstageSelectedFiles(lastFiles);
            await clearLastStagedFiles(context);
        }
        

        const mode = await promptBranchCreationMethod();
        if(!mode) {
            output.appendLine('❌ 브랜치 생성 방식 선택이 취소되었습니다.');
            return;
        }

        //수동 입력인 경우
        if(mode == 'manualMode') {
            branchName = await inputBranchName();
            if(!branchName) return;
        }

        //Gemini 추천인 경우
        if(mode == 'geminiMode') {
            output.appendLine('🔄 수정된 파일 목록 확인 중...');
            const modifiedFiles = await getModifiedFiles();

            if (modifiedFiles.length === 0) {
                output.appendLine('⚠️ 변경된 코드가 없습니다.');
                return;
            }

            const selected = await selectFiles(
                modifiedFiles,
                "브랜치명을 추천받을 파일을 선택하세요 (복수 선택 가능)"
            )

            if (!selected) {
                output.appendLine('❌ 파일 선택이 취소되었습니다.');
                return;
            }

            selectedFiles = selected;

            //작업 공간 저장
            output.appendLine(`✅ **${selectedFiles.length}개 파일** 선택 완료.`);
            if(selectedFiles.length > 0) {
                await saveLastStagedFiles(context, selectedFiles);
                output.appendLine('💾 현재 작업 범위 저장');
            }
            
            //선택된 파일 staging
            output.appendLine('🔄 선택된 파일을 **스테이징** 중...');
            await stageSelectedFiles(selectedFiles);
            output.appendLine('✅ 스테이징 완료.');

    
            //선택된 파일의 diff 수집
            output.appendLine('🔄 Git diff 수집 중...');
            diff = await getGitDiff();
    
            if(!diff.trim()) {
                output.appendLine('⚠️ 선택된 파일에서 유효한 변경 사항을 찾을 수 없습니다.');
                return;
            }
            
            //브랜치명 추천받기
            output.appendLine('🔄 Gemini가 열심히 브랜치명을 생각 중...');
            const recommandedNames = await generateBranchNames(diff, 3, context);

            if(recommandedNames.length === 0) {
                output.appendLine('Gemini가 유효한 브랜치 이름을 추천하지 못했어요😥 수동으로 입력해주세요!');
                branchName = await inputBranchName();
                if(!branchName) return;
            }else {
                const recommandedItems = recommandedNames.map(name => `🤖 추천: ${name}`);

                const recommandedSelection = await vscode.window.showQuickPick(
                    recommandedItems,
                    {
                        placeHolder: '추천 브랜치 이름 중 하나를 선택해주세요!'
                    }
                );

                if(!recommandedSelection) {
                    output.appendLine('❌ 추천 브랜치 선택이 취소되었습니다.');
                    return;
                }

                branchName = recommandedSelection.replace('🤖 추천:', '').trim();
            }
        }

        //브랜치 생성
        if (!branchName) {
            output.appendLine('❌ 브랜치 이름이 없습니다.');
            return;
        }

        output.appendLine(`🔄 브랜치 생성 중: ${branchName}`);
        await createBranch(branchName);
        output.appendLine(`✅ 브랜치 ${branchName} 생성이 완료되었습니다.`);
        
        //브랜치 전환 여부 
        const switchOption = '전환합니다';
        const confirmation = await vscode.window.showInformationMessage(
            `새로 생성된 브랜치 ${branchName}로 바로 전환하시겠습니까?`,
            {modal: true},
            switchOption,
        );

        if(confirmation === switchOption) {
            output.appendLine(`🔄 **${branchName}** 브랜치로 전환 중...`);
            await checkout(branchName);
            output.appendLine(`✅ **${branchName}** 브랜치로 전환이 완료되었습니다.`);
        }else {
            output.appendLine(`ℹ️ 브랜치 전환을 취소했습니다. 현재 브랜치를 유지합니다.`);
        }
        

    } catch (error) {
        vscode.window.showErrorMessage(ERROR_MESSAGES.createBranchFailed);

        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️ Create Branch Error: ${detailedMessage}`);

        branchName = await inputBranchName();
        if (!branchName) return;

    }
}
