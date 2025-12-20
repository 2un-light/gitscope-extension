import { DEFAULT_MODEL, GEMINI_MODELS } from "../constants/geminiConstants";
import { ICommand } from "../interfaces/ICommand";
import { IConfigService } from "../interfaces/IConfigService";
import { IUserInteraction } from "../interfaces/IUserInteraction";
import { ShowNavigator } from "./ShowNavigator";
import { II18nProvider } from "../interfaces/II18nProvider";

interface ModelQuickPickItem {
    label: string;
    description: string;
    detail?: string;
    modelName: string;
    tier: string;
}

export class SelectGeminiModelCommand implements ICommand {

    constructor(
        private ui: IUserInteraction,
        private config: IConfigService,
        private i18n: II18nProvider
    ) {}

    private prepareQuickPickItems(currentModel: string, t: ReturnType<II18nProvider['t']>): ModelQuickPickItem[] {
        return Object.values(GEMINI_MODELS).map(model => ({
            label: t.models[model.displayNameKey],
            description: model.name === currentModel 
                ? t.messages.currentlySelected 
                : `$(${model.tier === 'free' ? 'dash' : 'star-full'})`,
            detail: t.models[model.descriptionKey],
            modelName: model.name,
            tier: model.tier
        })).sort((a, b) => {
            if (a.description.includes(t.messages.currentlySelected)) return -1;
            if (b.description.includes(t.messages.currentlySelected)) return 1;
            if (a.tier === 'free' && b.tier === 'paid') return -1;
            if (a.tier === 'paid' && b.tier === 'free') return 1;
            return 0;
        });
    }

    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();
        
        this.ui.clearOutput();
        this.ui.output(t.messages.selectModelStart);

        const activePanel = ShowNavigator.activePanel;

        try {
            this.ui.output(t.messages.loadingModelList);
            const currentModel = await this.config.get<string>() || DEFAULT_MODEL.name;
            this.ui.output(t.messages.currentModelInfo(currentModel));

            const quickPickItems = this.prepareQuickPickItems(currentModel, t);

            const selectedItem = await this.ui.showQuickPick(quickPickItems, {
                title: t.messages.selectModelTitle,
                placeHolder: t.messages.searchModelName,
                ignoreFocusOut: true,
            });

            if(!selectedItem) {
                this.ui.output(t.messages.cancelled);
                return;
            }

            const selectedModelName = selectedItem.modelName;

            if (selectedModelName === currentModel) {
                this.ui.output(t.messages.alreadySelectedModel);
                this.ui.showInformationMessage(t.messages.currentlyUsingModel(selectedItem.label), {});
                return;
            }

            if(selectedItem.tier === 'paid') {
                const confirmation = await this.ui.showWarningMessage(
                    t.messages.paidModelWarning(selectedItem.label),
                    { modal: true },
                    t.messages.confirmButton,
                );

                if (confirmation !== t.messages.confirmButton) {
                    this.ui.output(t.messages.cancelled);
                    return;
                }
                this.ui.output(t.messages.paidModelSelected);
            }

            this.ui.output(t.messages.changingModel(selectedItem.label));
            await this.config.update(selectedModelName);
            
            this.ui.output(t.messages.modelChangeSuccess(selectedItem.label));
            this.ui.showInformationMessage(t.messages.modelSelected(selectedItem.label), {});

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
            this.ui.showErrorMessage(t.errors.selectGeminiModelFailed, {});
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