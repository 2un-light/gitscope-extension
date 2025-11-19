import * as vscode from 'vscode';

export async function welcomeCommand() {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);

    // 1. 환영 메시지 및 아스키 아트
    output.appendLine(' ');
    output.appendLine('   /\\_/\\  ');
    output.appendLine('  ( o.o ) < Meow! GitScope에 오신 것을 환영합니다!');
    output.appendLine('   > ^ <   ');
    output.appendLine('  /     \\  ');
    output.appendLine(' (_______) ');
    output.appendLine(' ');

    //2. 명령어 사용 안내
    output.appendLine('## 📚 명령어 사용 안내');
    output.appendLine('* **GitScope**의 모든 기능 및 사용법은 다음 Notion 문서를 참고해주세요.');
    
    output.appendLine('[👉 GitScope 사용 설명서 바로가기]');
    output.appendLine('https://sparkling-0902.notion.site/GitScope-Extension-2af6a40f9fff804da616e999e8527349?source=copy_link');
    output.appendLine(' ');
    output.appendLine('--------------------------------------');
    
    // 3. API 키 안전 및 요금 안내
    output.appendLine('## 🔑 Gemini API 키 안전 및 요금 안내');
    output.appendLine(' ');
    output.appendLine('### 🔒 보안 안내');
    output.appendLine(`* 사용자의 Gemini API 키는 **${vscode.env.appName} SecretStorage**에 안전하게 저장됩니다.`);
    output.appendLine('* SecretStorage는 OS의 키체인(Keychain) 등 보안 저장소를 사용하며, 확장 프로그램 외 접근은 불가능합니다.');
    output.appendLine(' ');
    output.appendLine('### 💸 요금 안내');
    output.appendLine('* 이 확장은 **사용자의 Gemini 키**를 사용하여 모델을 호출합니다.');
    output.appendLine('* 따라서 GitScope 사용에 따른 API 호출 요금은 **사용자 본인에게 부과**됩니다.');
    output.appendLine('--------------------------------------');
    output.appendLine(' ');
}