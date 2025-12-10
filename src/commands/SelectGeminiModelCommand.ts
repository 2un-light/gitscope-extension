import { DEFAULT_MODEL, GEMINI_MODELS } from "../constants/geminiConstants";
import { ERROR_MESSAGES } from "../errors/errorMessages";
import { ICommand } from "../interfaces/ICommand";
import { IConfigService } from "../interfaces/IConfigService";
import { IUserInteraction } from "../interfaces/IUserInteraction";
import { ShowNavigator } from "./ShowNavigator";

interface ModelQuickPickItem {
    label: string;
    description: string;
    detail?: string;
    modelName: string;
    tier: string;
}

export class SelectGeminiModelCommand  implements ICommand {
    private ui: IUserInteraction;
    private config: IConfigService;

    constructor(uiService: IUserInteraction, configService: IConfigService) {
        this.ui = uiService;
        this.config = configService;
    }

    private prepareQuickPickItems(currentModel: string): ModelQuickPickItem[] {
        return Object.values(GEMINI_MODELS).map(model => ({
            label: model.displayName,
            description: model.name === currentModel ? '$(check) 현재 선택됨' : `$(${model.tier === 'free' ? 'dash' : 'star-full'})`,
            detail: model.description,
            modelName: model.name,
            tier: model.tier
        })).sort((a, b) => {
            if (a.description.includes('현재 선택됨')) return -1;
            if (b.description.includes('현재 선택됨')) return 1;
            if (a.tier === 'free' && b.tier === 'paid') return -1;
            if (a.tier === 'paid' && b.tier === 'free') return 1;
            return 0;
        });
    }

    public async execute(buttonId?: string): Promise<void> {
        this.ui.clearOutput();
        this.ui.output('🤖 Gemini 모델 선택 시작');

        const activePanel = ShowNavigator.activePanel;

        try {
            this.ui.output('📋 사용 가능한 Gemini 모델 목록을 불러오는 중...');
            const currentModel = await this.config.get<string>() || DEFAULT_MODEL.name;
            this.ui.output(`현재 선택된 모델: ${currentModel}`);

            const quickPickItems = this.prepareQuickPickItems(currentModel);

            const selectedItem = await this.ui.showQuickPick(quickPickItems, {
                title: '사용할 Gemini 모델을 선택하세요',
                placeHolder: '모델 이름으로 검색',
                ignoreFocusOut: true,
            });

            if(!selectedItem) {
                this.ui.output('❌ 모델 선택이 취소되었습니다.');
                return;
            }

            const selectedModelName = selectedItem.modelName;

            if (selectedModelName === currentModel) {
                this.ui.output('ℹ️ 이미 선택된 모델입니다.');
                this.ui.showInformationMessage(`현재 ${selectedItem.label} 모델을 사용 중입니다.`, {});
                return;
            }

            if(selectedItem.tier === 'paid') {
                const confirmation = await this.ui.showWarningMessage(
                    `${selectedItem.label}은(는) 무료 API 키로는 사용할 수 없습니다.\n\n유료 요금제가 필요합니다.\n\n계속하시겠습니까?`,
                    { modal: true },
                    '확인',
                );

                if (confirmation !== '확인') {
                    this.ui.output('❌ 유료 모델 선택이 취소되었습니다.');
                    return;
                }
                this.ui.output('⚠️ 유료 모델이 선택되었습니다. API 키에 유료 요금제가 설정되어 있는지 확인하세요.');
            }

            this.ui.output(`🔄 ${selectedItem.label} 모델로 변경 중...`);
            await this.config.update(selectedModelName);
            
            this.ui.output(`✅ 모델 변경 성공: ${selectedItem.label}이(가) 선택되었습니다.`);
            this.ui.showInformationMessage(`✅ ${selectedItem.label} 모델이 선택되었습니다.`, {});

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'selectGeminiModel',
                data: {
                    selectedModel: selectedModelName,
                    displayName: selectedItem.label
                }
            });


        } catch (error) {
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.showErrorMessage(ERROR_MESSAGES.selectGeminiModelFailed, {});
            this.ui.output(`⚠️ Gemini Model Selection Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'selectGeminiModel',
                error: detailedMessage
            });

        }


    }



}