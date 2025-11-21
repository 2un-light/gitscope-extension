import * as vscode from "vscode";
import { LAST_STAGED_FILES_KEY } from "../constants/lastSelectedFilesKey";

/**
 * 선택한 파일 목록 저장
 * @param context ExtensionContext
 * @param files 선택한 파일 목록
 */
export async function saveLastStagedFiles(context: vscode.ExtensionContext, files: string[]) {
    await context.workspaceState.update(LAST_STAGED_FILES_KEY, files);
}

/**
 * 선택한 파일 목록 불러오기
 * @param context ExtensionContext
 * @returns string[] | undefined
 */
export async function getLastStagedFiles(context: vscode.ExtensionContext): Promise<string[]> {
    return context.workspaceState.get<string[]>(LAST_STAGED_FILES_KEY, []);
}

/**
 * 파일 목록 초기화
 * @param context ExtensionContext
 */
export async function clearLastStagedFiles(context: vscode.ExtensionContext) {
    return context.workspaceState.update(LAST_STAGED_FILES_KEY, undefined);
}