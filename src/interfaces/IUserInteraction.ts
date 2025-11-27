import * as vscode from 'vscode';
import { ModifiedFileQuickPickItem } from './IModifiedFileQuickPickItem';
/**
 * VS Code 익스텐션 내에서 사용자 인터페이스를 통한 모든 상호작용을 정의하고 캡슐화하는 인터페이스
 */
export interface IUserInteraction {
    /**
     * VS Code의 Output 채널에 메시지를 출력
     * @param message 출력할 문자열 메시지
     */
    output(message: string): void;

    /**
     * 사용자에게 선택 가능한 항목 목록을 Quick Pick UI로 표시하고 선택을 기다림.
     *
     * @template T 선택 가능한 항목의 타입 (vscode.QuickPickItem을 상속)
     * @param items 사용자에게 보여줄 항목 배열
     * @param options Quick Pick UI에 대한 옵션(예: placeholder, title)
     * @returns {Promise<T | undefined>} 사용자가 선택한 항목 또는 취소 시 undefined.
     */
    showQuickPick<T extends vscode.QuickPickItem>(items: T[], options: vscode.QuickPickOptions): Promise<T | undefined>;

    /**
     * 사용자에게 텍스트 입력을 요청하는 입력 상자(Input Box)를 표시.
     *
     * @param options 입력 상자에 대한 옵션(예: placeholder, prompt)
     * @returns {Promise<string | undefined>} 사용자가 입력한 문자열 또는 취소 시 undefined.
     */
    showInputBox(options: vscode.InputBoxOptions): Promise<string | undefined>;

    /**
     * 수정된 파일 목록을 사용자에게 다중 선택 가능한 Quick Pick으로 표시.
     *
     * @param files 사용자에게 보여줄 수정된 파일 항목 배열
     * @param title Quick Pick 창의 제목
     * @returns {Promise<ModifiedFileQuickPickItem[] | undefined>} 사용자가 선택한 파일 배열 또는 취소 시 undefined.
     */
    selectFilesQuickPick(files: ModifiedFileQuickPickItem[], title: string): Promise<ModifiedFileQuickPickItem[] | undefined>;

    /**
     * 정보성 메시지를 VS Code 알림 영역에 표시하고, 선택 가능한 버튼 항목을 제공
     *
     * @param message 표시할 정보 메시지
     * @param options 메시지 옵션 (예: 모달 여부).
     * @param items 사용자가 클릭할 수 있는 버튼 레이블
     * @returns {Promise<string | undefined>} 사용자가 클릭한 버튼의 레이블 또는 닫기/취소 시 undefined.
     */
    showInformationMessage(message: string, options: vscode.MessageOptions, ...items: string[]): Promise<string | undefined>;

    /**
     * 경고 메시지를 VS Code 알림 영역에 표시하고, 선택 가능한 버튼 항목을 제공
     *
     * @param message 표시할 경고 메시지
     * @param options 메시지 옵션 (예: 모달 여부).
     * @param items 사용자가 클릭할 수 있는 버튼 레이블
     * @returns {Promise<string | undefined>} 사용자가 클릭한 버튼의 레이블 또는 닫기/취소 시 undefined.
     */
    showWarningMessage(message: string, options: vscode.MessageOptions, ...items: string[]): Promise<string | undefined>;

    /**
     * 시스템 클립보드의 내용을 읽어오기
     *
     * @returns {Promise<string>} 클립보드에 있는 텍스트를 담은 Promise.
     */
    readClipboard(): Promise<string>;

    /**
     * 지정된 텍스트를 시스템 클립보드에 복사
     *
     * @param text 클립보드에 복사할 텍스트
     * @returns {Promise<void>} 작업 완료 후 resolve되는 Promise.
     */
    writeClipboard(text: string): Promise<void>;

    /**
     * 에러 메시지를 VS Code 알림 영역에 표시하고, 선택 가능한 버튼 항목을 제공
     *
     * @param message 표시할 에러 메시지입
     * @param options 메시지 옵션 (예: 모달 여부).
     * @param items 사용자가 클릭할 수 있는 버튼 레이블
     * @returns {Promise<string | undefined>} 사용자가 클릭한 버튼의 레이블 또는 닫기/취소 시 undefined.
     */
    showErrorMessage(message: string, options: vscode.MessageOptions, ...items: string[]): Promise<string | undefined>;

    /**
     * VS Code의 Output 채널의 내용 지우기
     *
     * @returns {Promise<void>} 작업 완료 후 resolve되는 Promise.
     */
    clearOutput(): Promise<void>;
}   