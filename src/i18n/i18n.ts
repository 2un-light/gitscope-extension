import * as vscode from 'vscode';
import { ko } from './locales/ko';
import { en } from './locales/en';
import { ja } from './locales/ja';

export type Language = 'auto' | 'ko' | 'en' | 'ja';

export interface ITranslations {

    // Messages
    messages: {
        // Common - 공통
        cancelled: string;
        
        // Common Buttons - 공통 버튼
        continueButton: string;
        cancelButton: string;
        deleteButton: string;
        confirmButton: string;
        
        // CheckoutBranchCommand
        branchSwitchStart: string;
        fetchingBranches: string;
        currentBranchLabel: string;
        selectBranchToSwitch: string;
        searchBranchName: string;
        switchingToBranch: (branch: string) => string;
        branchSwitchSuccess: (branch: string) => string;

        // CloneCommand
        cloneStart: string;
        enterRemoteUrl: string;
        enterLocalFolder: (root: string) => string;
        cloneProgress: (url: string, path: string) => string;
        cloneSuccess: (path: string) => string;
        openFolderRecommendation: string;
        cloneCompletedAskOpen: (folder: string) => string;
        openInNewWindow: string;
        openingFolder: (folder: string) => string;
        openFolderWarning: (folder: string) => string;

        // CommitCommand
        commitStart: string;
        readClipboard: string;
        clipboardGuide: string;
        emptyCommitMessage: string;
        commitInProgress: (msg: string) => string;
        commitSuccess: string;
        commitProceed: (msg: string) => string;
        commitEdit: string;
        commitConfirmPlaceholder: string;
        commitEditPrompt: string;

        // CreateTagAndPushCommand
        tagStart: string;
        nonMainBranchConfirm: (branch: string) => string;
        currentBranch: (branch: string) => string;
        tagNameTitle: string;
        tagNamePlaceholder: string;
        tagNamePrompt: string;
        tagNameRequired: string;
        tagMessageTitle: (tag: string) => string;
        tagMessagePlaceholder: string;
        tagMessagePrompt: string;
        createLocalTag: (tag: string) => string;
        createLocalTagSuccess: (tag: string) => string;
        pushTag: (tag: string) => string;
        pushTagSuccess: (tag: string) => string;

        // DeleteLocalBranchCommand
        deleteLocalBranchStart: string;
        quickPickTitle: string;
        quickPickPlaceholder: string;
        quickPickDescription: string;
        deleteConfirmMessage: (branch: string) => string;
        deletingBranch: (branch: string) => string;
        deleteSuccess: (branch: string) => string;

        // GeminiAPICommand
        configKeyStart: string;
        useExistingKey: string;
        reRunGuide: string;
        inputKeyPrompt: string;
        savingKey: string;
        saveKeySuccess: string;

        // GenerateCommitMessageCommand
        generateCommitMsgStart: string;
        stagedFilesInfo: (count: number) => string;
        reuseConfirmTitle: string;
        reuseConfirmPlaceholder: string;
        reuseSaved: (count: number) => string;
        checkingModifiedFiles: string;
        selectingFilesTitle: string;
        stagingSelectedFiles: string;
        stagingComplete: string;
        stagingSummary: (count: number) => string;
        requestGemini: string;
        resultTitle: string;
        clipboardCopied: string;
        nextStepGuide: string;
        reuseLabel: (count: number, files: string[]) => string;
        reuseFresh: string;
        deletedFileDescription: string;

        // MergeCommand
        mergeStart: string;
        fetchingMergeBranches: string;
        selectBranchToMerge: (currentBranch: string) => string;
        mergeIntoBranch: (currentBranch: string) => string;
        mergeInProgress: (currentBranch: string, sourceBranch: string) => string;
        mergeResultTitle: string;
        mergeConflictGuide: string;
        mergeSuccess: (sourceBranch: string, currentBranch: string) => string;
        pushReminder: string;
        mergeSuccessNotification: (currentBranch: string, sourceBranch: string) => string;

        // PullCommand
        pullStart: string;
        pullSuccessWithChanges: (changes: number) => string;
        pullSuccessUpToDate: string;

        // PushCommand
        pushStart: string;
        pushSuccess: string;

        //RecommandAndCreateBranchCommand
        branchRecommendStart: string;
        cleanupPreviousStaging: string;
        cleanupComplete: string;
        cleanupError: (error: string) => string;
        manualBranchInput: string;
        geminiBranchRecommend: string;
        selectBranchCreationMethod: string;
        inputNewBranchName: string;
        selectFilesForBranchName: string;
        filesSelectedCount: (count: number) => string;
        savingWorkScope: string;
        saveComplete: string;
        collectingGitDiff: string;
        geminiThinkingBranchName: string;
        geminiModeError: (error: string) => string;
        recommendedBranchLabel: (name: string) => string;
        selectRecommendedBranch: string;
        creatingBranch: (branchName: string) => string;
        branchCreated: (branchName: string) => string;
        switchBranchButton: string;
        switchToNewBranchConfirm: (branchName: string) => string;
        branchSwitchComplete: (branchName: string) => string;
        switchCancelled: string;
        invalidBranchNameExit: string;

        //SelecteGeminiModelCommand
        selectModelStart: string;
        loadingModelList: string;
        currentModelInfo: (model: string) => string;
        selectModelTitle: string;
        searchModelName: string;
        currentlySelected: string;
        alreadySelectedModel: string;
        currentlyUsingModel: (modelName: string) => string;
        paidModelWarning: (modelName: string) => string;
        paidModelSelected: string;
        changingModel: (modelName: string) => string;
        modelChangeSuccess: (modelName: string) => string;
        modelSelected: (modelName: string) => string;

        //ShowNavigator
        navigatorTitle: string;
        navigatorAlreadyOpen: string;

        webviewLoadFailed: (path: string) => string;

        commandExecuteSuccess: string;
        commandExecuteFailed: (error: string) => string;

        //StageAllCommand
        stageAllStart: string,
        stageAllInProgress: string,
        stageAllSuccess: string,

        //welcome
        welcome: {
            title: string;
            asciiArt: string[];
            usageGuideTitle: string;
            usageGuideDescription: string;
            usageGuideLink: string;
            notionLinkText: string;
            
            apiSecurityTitle: string;
            securityTitle: string;
            securityDescription1: string;
            securityDescription2: string;
            
            pricingTitle: string;
            pricingDescription1: string;
            pricingDescription2: string;
        };
    };

    models: {
        flashLite: string;
        flashLiteDesc: string;
        flash25: string;
        flash25Desc: string;
        flash20: string;
        flash20Desc: string;
        pro25: string;
        pro25Desc: string;
        pro3: string;
        pro3Desc: string;
    };

    // Errors
    errors: {
        apiKeyInvalid: string;
        missingApiKey: string;
        quotaExceeded: string;
        apiCommunication: string;
        networkError: string;
        parseFailed: string;
        invalidDiff: string;
        createBranchFailed: string;
        checkoutBranchFailed: string;
        noLocalBranchToCheckout: string;
        noLocalBranchToDelete: string;
        noLocalBranchToMerge: string;
        geminiBranchRecommandationFailed: string;
        deleteBranchFailed: string;
        cloneRepositoryFailed: string;
        noWorkSpace: string;
        commitFailed: string;
        generateCommitMessageFailed: string;
        commitMessageNotFound: string;
        noModifiedCode: string;
        emptyDiff: string;
        mergeConflict: string;
        mergeFailed: string;
        pullFailed: string;
        pushFailed: string;
        stageAllFailed: string;
        recommendationFailed: string;
        tagCommandFailed: string;
        selectGeminiModelFailed: string;
        webviewLoadFailed: string;
    };

    // AI Prompts
    prompts: {
        commitMessage: (diff: string, currentBranch: string) => string;
        branchNames: (diff: string, count: number) => string;
    };

    //Navigator
    navigator: {
        // Flow 정보
        flows: {
            common: {
                title: string;
                description: string;
            };
            single: {
                title: string;
                description: string;
                tags: string[];
                branches: Array<{ name: string; description: string }>;
            };
            github: {
                title: string;
                description: string;
                tags: string[];
                branches: Array<{ name: string; description: string }>;
            };
            gitlab: {
                title: string;
                description: string;
                tags: string[];
                branches: Array<{ name: string; description: string }>;
            };
            gitflow: {
                title: string;
                description: string;
                tags: string[];
                branches: Array<{ name: string; description: string }>;
            };
        };
        
        // 스텝 라벨
        steps: {
            startGuide: string;
            configKey: string;
            selectGeminiModel: string;
            clone: string;
            pull: string;
            pullMain: string;
            pullDevelop: string;
            develop: string;
            stageAll: string;
            generateMessage: string;
            commit: string;
            push: string;
            pushToQAServer: string;
            pushToProductionServer: string;
            createBranchAI: string;
            createBranchManual: string;
            checkoutBranch: string;
            checkoutToMain: string;
            checkoutToPreProduction: string;
            checkoutToProduction: string;
            checkoutToDevelop: string;
            mergeMain: string;
            mergeDevelop: string;
            mergePreProduction: string;
            mergeRelease: string;
            mergeHotfix: string;
            deleteLocalBranch: string;
            deleteReleaseBranch: string;
            deleteHotfixBranch: string;
            createTagAndPush: string;
            prReviewMain: string;
            prReviewDevelop: string;
            qaTest: string;
            releaseBugfix: string;
            hotfixBugfix: string;
        };
        
        // 아코디언 제목
        accordions: {
            initialSetup: string;
            featureDevelopment: string;
            preProductionDeploy: string;
            productionDeploy: string;
            releaseDeploy: string;
            hotfixDeploy: string;
        };
        
        // UI 문자열
        ui: {
            indexTitle: string;
            indexDescription: string;

            // 탭 버튼 관련 (추가)
            tabCommon: string;
            tabSingle: string;
            tabGitHub: string;
            tabGitLab: string;
            tabGitFlow: string;

            branchSummaryTitle: string;
            branchSummarySuffix: string;
            accordionSummarySuffix: string;
            actionRun: string;
            actionNoop: string;
            actionCompleted: string;
        };
        
        // Noop 메시지
        noopMessages: {
            develop: string;
            prReview: string;
            qaTest: string;
            releaseBugfix: string;
            hotfixBugfix: string;
            default: string;
        };
    };
}

class I18nManager {
    private static instance: I18nManager;

    private configLanguage: Language = 'auto';

    private resolvedLanguage: 'ko' | 'en' | 'ja' = 'ko';

    private translations: Record<'ko' | 'en' | 'ja', ITranslations> = {
        ko,
        en,
        ja,
    };

    private constructor() {
        this.loadLanguageFromConfig();
        this.resolveLanguage();
    }

    public static getInstance(): I18nManager {
        if (!I18nManager.instance) {
            I18nManager.instance = new I18nManager();
        }
        return I18nManager.instance;
    }

    /**
     * gitScope.language 설정값 로드
     */
    private loadLanguageFromConfig(): void {
        const config = vscode.workspace.getConfiguration('gitScope');
        const saved = config.get<Language>('language', 'auto');
        this.configLanguage = saved;
    }

    private resolveLanguage(): void {
        if(this.configLanguage === 'auto') {
            const vscodeLang = vscode.env.language.toLowerCase();

            if(vscodeLang.startsWith('ko')) {
                this.resolvedLanguage = 'ko';
            }else if(vscodeLang.startsWith('ja')){
                this.resolvedLanguage = 'ja';
            }else {
                this.resolvedLanguage = 'en';
            }
        }else{
            this.resolvedLanguage = this.configLanguage;
        }
    }

    /**
     * 사용자가 언어 변경 시 호출
     */
    public async setLanguage(lang: Language): Promise<void> {
        this.configLanguage = lang;
        this.resolveLanguage();

        const config = vscode.workspace.getConfiguration('gitScope');
        await config.update('language', lang, vscode.ConfigurationTarget.Global);
    }

    /**
     * 설정에 저장된 언어 (auto / ko / en)
     */
    public getLanguage(): Language {
        return this.configLanguage;
    }

    /**
     * 실제 사용 중인 언어 (ko / en)
     */
    public getResolvedLanguage(): 'ko' | 'en' | 'ja' {
        return this.resolvedLanguage;
    }

    /**
     * 번역 객체 반환
     */
    public t(): ITranslations {
        return this.translations[this.resolvedLanguage];
    }
}

export const i18n = I18nManager.getInstance();