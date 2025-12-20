import { ICommand } from '../interfaces/ICommand';
import { II18nProvider } from '../interfaces/II18nProvider';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ShowNavigator } from './ShowNavigator';

export class WelcomeCommand implements ICommand {
    constructor(
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ) {}

    public async execute(buttonId?: string): Promise<void> {
        this.ui.clearOutput();

        const activePanel = ShowNavigator.activePanel;
        const t = this.i18n.t();

        // 1. 환영 메시지 및 아스키 아트
        t.messages.welcome.asciiArt.forEach(line => this.ui.output(line));


        //2. 명령어 사용 안내
        this.ui.output(t.messages.welcome.usageGuideTitle);
        this.ui.output(t.messages.welcome.usageGuideDescription);
        this.ui.output(' ');
        this.ui.output(t.messages.welcome.notionLinkText);
        this.ui.output(t.messages.welcome.usageGuideLink);
        this.ui.output(' ');
        this.ui.output('--------------------------------------');
        
        // 3. API 키 안전 및 요금 안내
        this.ui.output(t.messages.welcome.apiSecurityTitle);
        this.ui.output(' ');
        this.ui.output(t.messages.welcome.securityTitle);
        this.ui.output(t.messages.welcome.securityDescription1);
        this.ui.output(t.messages.welcome.securityDescription2);
        this.ui.output(' ');
        this.ui.output(t.messages.welcome.pricingTitle);
        this.ui.output(t.messages.welcome.pricingDescription1);
        this.ui.output(t.messages.welcome.pricingDescription2);
        this.ui.output('--------------------------------------');
        this.ui.output(' ');

        activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'startGuide'
        });
    }
}