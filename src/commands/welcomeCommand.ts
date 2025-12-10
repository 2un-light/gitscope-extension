import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ShowNavigator } from './ShowNavigator';

export class WelcomeCommand implements ICommand {
    private ui: IUserInteraction;

    constructor(uiService: IUserInteraction) {
        this.ui = uiService;
    }

    public async execute(buttonId?: string): Promise<void> {
        this.ui.clearOutput();

        const activePanel = ShowNavigator.activePanel;
        
        // 1. 환영 메시지 및 아스키 아트
        this.ui.output(' ');
        this.ui.output('   /\\_/\\  ');
        this.ui.output('  ( o.o ) < Meow! GitScope에 오신 것을 환영합니다!!!!!!!!');
        this.ui.output('   > ^ <   ');
        this.ui.output('  /     \\  ');
        this.ui.output(' (_______) ');
        this.ui.output(' ');

        //2. 명령어 사용 안내
        this.ui.output('## 📚 명령어 사용 안내');
        this.ui.output('* **GitScope**의 모든 기능 및 사용법은 다음 Notion 문서를 참고해주세요.');
        
        this.ui.output('[👉 GitScope 사용 설명서 바로가기]');
        this.ui.output('https://sparkling-0902.notion.site/GitScope-Extension-2af6a40f9fff804da616e999e8527349?source=copy_link');
        this.ui.output(' ');
        this.ui.output('--------------------------------------');
        
        // 3. API 키 안전 및 요금 안내
        this.ui.output('## 🔑 Gemini API 키 안전 및 요금 안내');
        this.ui.output(' ');
        this.ui.output('### 🔒 보안 안내');
        this.ui.output(`* 사용자의 Gemini API 키는 **SecretStorage**에 안전하게 저장됩니다.`);
        this.ui.output('* SecretStorage는 OS의 키체인(Keychain) 등 보안 저장소를 사용하며, 확장 프로그램 외 접근은 불가능합니다.');
        this.ui.output(' ');
        this.ui.output('### 💸 요금 안내');
        this.ui.output('* 이 확장은 **사용자의 Gemini 키**를 사용하여 모델을 호출합니다.');
        this.ui.output('* 따라서 GitScope 사용에 따른 API 호출 요금은 **사용자 본인에게 부과**됩니다.');
        this.ui.output('--------------------------------------');
        this.ui.output(' ');

        activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'startGuide'
        });
    }
}