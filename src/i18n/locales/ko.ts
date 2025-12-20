import { ITranslations } from '../i18n';

export const ko: ITranslations = {
    
    messages: {
        // Common - 공통 메시지
        cancelled: '❌ 취소되었습니다.',
        
        // Common Buttons - 공통 버튼
        continueButton: '계속',
        cancelButton: '취소',
        deleteButton: '삭제',
        confirmButton: '확인',
        
        // CheckoutBranchCommand
        branchSwitchStart: '🔄 Git 브랜치 전환 시작',
        fetchingBranches: '🔄 로컬 브랜치 목록을 가져오는 중...',
        currentBranchLabel: '현재 브랜치',
        selectBranchToSwitch: '전환할 브랜치를 선택하세요',
        searchBranchName: '브랜치 이름 검색',
        switchingToBranch: (branch: string) => `🔄 브랜치 ${branch}로 전환 중...`,
        branchSwitchSuccess: (branch: string) => `✅ 브랜치 전환 성공 '${branch}'로 성공적으로 전환되었습니다.`,

        // CloneCommand
        cloneStart: '🔗 Git Clone 실행',
        enterRemoteUrl: '클론할 원격 저장소의 URL (SSH 또는 HTTPS 주소)을 입력하세요',
        enterLocalFolder: (root: string) => `저장소 복제 경로를 입력하세요. (상위 폴더 ${root})`,
        cloneProgress: (url: string, path: string) => `🔄 클론 시작: ${url} → ${path}`,
        cloneSuccess: (path: string) => `🎉 클론 성공! 프로젝트가 ${path}에 생성되었습니다.`,
        openFolderRecommendation: '🌟 꼭 VS Code에서 해당 폴더를 열어 작업을 시작해 주세요.',
        cloneCompletedAskOpen: (folder: string) => `🎉 클론이 성공적으로 완료되었습니다.\n클론된 폴더 ${folder}를 새 창으로 여시겠습니까?`,
        openInNewWindow: '새 창으로 열기',
        openingFolder: (folder: string) => `📁 새 창으로 폴더 ${folder} 열기...`,
        openFolderWarning: (folder: string) =>
            `❗️ 클론된 저장소 ${folder}를 사용하려면,\n현재 VS Code에서 "새로 클론된 폴더"를 열어주셔야 Git 명령어들이 정상 작동합니다.`,

        // CommitCommand
        commitStart: '🚀 Commit 시작',
        readClipboard: '📋 클립보드에서 커밋 메시지를 가져오는 중...',
        clipboardGuide: '💡 "Git Scope: 🪶 [COMMIT] Commit Message 생성"를 먼저 실행하여 메시지를 복사해 주세요.',
        emptyCommitMessage: '⚠️ 메시지가 비어있습니다.',
        commitInProgress: (msg: string) => `🚀 Git 커밋 진행 중: "${msg.substring(0, 50)}..."`,
        commitSuccess: '🎉 커밋 성공!',
        commitProceed: (msg: string) => `✅ 커밋 진행: ${msg.substring(0, 50)}...`,
        commitEdit: '✏️ 메시지 수정 후 커밋',
        commitConfirmPlaceholder: '이 메시지로 커밋을 진행하시겠습니까?',
        commitEditPrompt: '최종 커밋 메시지를 입력하세요.',

        // CreateTagAndPushCommand
        tagStart: '🏷️ Git 태그 생성 및 Push 시작',
        nonMainBranchConfirm: (branch: string) =>
            `현재 브랜치 '${branch}'에 태그를 생성하려고 합니다. 계속하시겠습니까?`,
        currentBranch: (branch: string) => `현재 브랜치: ${branch}`,
        tagNameTitle: '태그 이름을 입력하세요',
        tagNamePlaceholder: '태그 이름',
        tagNamePrompt: 'SemVer 규격에 맞는 태그 이름을 입력하세요.(예: v1.0.0)',
        tagNameRequired: '태그 이름은 필수입니다.',
        tagMessageTitle: (tag: string) => `태그 '${tag}'의 메시지를 입력하세요 (선택사항)`,
        tagMessagePlaceholder: '태그 메시지 (생략 가능) Enter',
        tagMessagePrompt: '태그 메시지는 릴리즈 노트에 활용됩니다.',
        createLocalTag: (tag: string) => `🏷️ 로컬에 태그 '${tag}' 생성 중...`,
        createLocalTagSuccess: (tag: string) => `✅ 로컬 태그 생성 성공: ${tag}`,
        pushTag: (tag: string) => `☁️ 원격 저장소에 태그 '${tag}' 푸시 중...`,
        pushTagSuccess: (tag: string) => `🎉 원격 태그 Push 성공: 태그 '${tag}'이(가) 원격에 반영되었습니다.`,

        // DeleteLocalBranchCommand
        deleteLocalBranchStart: '🗑️ 로컬 브랜치 삭제 시작',
        quickPickTitle: '삭제할 로컬 브랜치를 선택하세요',
        quickPickPlaceholder: '브랜치 이름 검색',
        quickPickDescription: '로컬에서 이 브랜치를 삭제합니다.',
        deleteConfirmMessage: (branch: string) =>
            `로컬 브랜치 '${branch}'를 정말로 삭제하시겠습니까?\n(Merge 되지 않은 커밋은 손실될 수 있습니다)`,
        deletingBranch: (branch: string) => `🔄 로컬 브랜치 '${branch}' 삭제 중...`,
        deleteSuccess: (branch: string) => `🎉 로컬 브랜치 '${branch}'가 성공적으로 삭제되었습니다.`,

        // GeminiAPICommand
        configKeyStart: '🔑 Gemini API 키 설정 시작',
        useExistingKey: '✅ 저장된 API 키를 사용합니다.',
        reRunGuide: '만약 새로 설정하고 싶다면, 해당 명령을 다시 실행해 주세요.',
        inputKeyPrompt: 'Gemini API 키를 입력하세요 (필수)',
        savingKey: '🔄 API 키를 저장하는 중...',
        saveKeySuccess: '✅ Gemini API 키가 성공적으로 저장되었습니다!',

        // GenerateCommitMessageCommand
        generateCommitMsgStart: '🪶 커밋 메시지 추천 시작',
        stagedFilesInfo: (count: number) => `ℹ️ 스테이징된 (${count}개 파일)가 있습니다.`,
        reuseConfirmTitle: '이전에 스테이징 한 파일로 진행하시겠습니까?',
        reuseConfirmPlaceholder: '선택하세요',
        reuseSaved: (count: number) => `✅ 기존 **${count}개 파일**로 진행합니다.`,
        checkingModifiedFiles: '🔄 수정된 파일 목록 확인 중...',
        selectingFilesTitle: '커밋 메시지를 추천받을 파일을 선택하세요 (복수 선택 가능)',
        stagingSelectedFiles: '🔄 선택된 파일을 **스테이징** 중...',
        stagingComplete: '✅ 스테이징 완료.',
        stagingSummary: (count: number) => `✅ **${count}개 파일** 선택 및 스테이징 완료.`,
        requestGemini: '🤖 Gemini에게 commit message 추천 받는 중...',
        resultTitle: '💡 추천 커밋 메시지:',
        clipboardCopied: '📋 클립보드에 복사 완료!',
        nextStepGuide: '🚀 커밋을 실행하려면 명령 팔레트에서 "GitScope: 🚀 [COMMIT] 변경 사항 Commit"를 실행하세요.',
        reuseLabel: (count: number, files: string[]) =>
            `✅ 이전에 스테이징 한 ${count}개 파일로 진행  (${files.join(', ')})`,
        reuseFresh: '🔄 새로 파일 선택',
        deletedFileDescription: '⚠️ 수정 혹은 삭제됨 • 현재 디렉토리에 없음',


        // MergeCommand
        mergeStart: '🔀 Git Merge 시작',
        fetchingMergeBranches: '🔄 병합할 로컬 브랜치 목록을 가져오는 중...',
        selectBranchToMerge: (currentBranch: string) => `[${currentBranch}] 브랜치로 병합할 브랜치를 선택하세요`,
        mergeIntoBranch: (currentBranch: string) => `${currentBranch} 브랜치로 병합`,
        mergeInProgress: (currentBranch: string, sourceBranch: string) => `🔄 ${currentBranch} <- ${sourceBranch} 병합 실행 중...`,
        mergeResultTitle: '--- Merge 결과 ---',
        mergeConflictGuide: '❌ 병합 충돌이 발생했습니다. 충돌 파일을 확인하고 수동으로 해결한 후 커밋해 주세요.',
        mergeSuccess: (sourceBranch: string, currentBranch: string) => `✅ 병합 성공! ${sourceBranch}의 변경 사항이 ${currentBranch}에 통합되었습니다.`,
        pushReminder: '💡 원격 저장소에 반영하려면 "GitScope: ☁️ [PUSH] 원격 저장소로 Push"를 실행하세요.',
        mergeSuccessNotification: (currentBranch: string, sourceBranch: string) => `✅ 병합 성공! (${currentBranch} <- ${sourceBranch})`,

        // PullCommand
        pullStart: '🔄 Git Pull 실행 (origin/현재 브랜치)...',
        pullSuccessWithChanges: (changes: number) => `🎉 Pull 성공! ${changes}개의 파일이 업데이트되었습니다.`,
        pullSuccessUpToDate: '✅ Pull 성공! 이미 최신 상태입니다.',

        // PushCommand
        pushStart: '🔄 Git Push 실행 (origin/현재 브랜치)...',
        pushSuccess: '🌟 Push 성공! 로컬 커밋이 원격 저장소에 반영되었습니다.',

        //RecommandAndCreateBranchCommand
        branchRecommendStart: '🌳 Git 브랜치명 추천 시작',
        cleanupPreviousStaging: '🧹 **정리 작업:** 이전에 선택된 파일 작업 디렉토리로 되돌리는 중...',
        cleanupComplete: '✅ 정리 완료',
        cleanupError: (error: string) => `⚠️ 정리 중 오류 발생: ${error}`,
        manualBranchInput: '✨ 새로운 브랜치 이름 수동 입력',
        geminiBranchRecommend: '🤖 Gemini AI에게 브랜치 이름 추천받기 (3가지)',
        selectBranchCreationMethod: '브랜치 생성 방식을 선택해주세요.',
        inputNewBranchName: '새로운 브랜치 이름을 입력하세요 (예: feat/my-new-feature)',
        selectFilesForBranchName: '브랜치명을 추천받을 파일을 선택하세요 (복수 선택 가능)',
        filesSelectedCount: (count: number) => `✅ **${count}개 파일** 선택 완료.`,
        savingWorkScope: '💾 현재 작업 범위 저장',
        saveComplete: '✅ 저장 완료.',
        collectingGitDiff: '🔄 Git diff 수집 중...',
        geminiThinkingBranchName: '🔄 Gemini가 열심히 브랜치명을 생각 중...',
        geminiModeError: (error: string) => `⚠️ Gemini 모드 실행 중 오류 발생: ${error}`,
        recommendedBranchLabel: (name: string) => `🤖 추천: ${name}`,
        selectRecommendedBranch: '추천 브랜치 이름 중 하나를 선택해주세요!',
        creatingBranch: (branchName: string) => `🔄 브랜치 생성 중: ${branchName}`,
        branchCreated: (branchName: string) => `✅ 브랜치 **${branchName}** 생성이 완료되었습니다.`,
        switchBranchButton: '전환합니다',
        switchToNewBranchConfirm: (branchName: string) => `새로 생성된 브랜치 ${branchName}로 바로 전환하시겠습니까?`,
        branchSwitchComplete: (branchName: string) => `✅ **${branchName}** 브랜치로 전환이 완료되었습니다.`,
        switchCancelled: 'ℹ️ 브랜치 전환을 취소했습니다. 현재 브랜치를 유지합니다.',
        invalidBranchNameExit: '❌ 유효한 브랜치 이름을 입력받지 못해, 명령을 종료합니다.',

        // SelectGeminiModelCommand
        selectModelStart: '🤖 Gemini 모델 선택 시작',
        loadingModelList: '📋 사용 가능한 Gemini 모델 목록을 불러오는 중...',
        currentModelInfo: (model: string) => `현재 선택된 모델: ${model}`,
        selectModelTitle: '사용할 Gemini 모델을 선택하세요',
        searchModelName: '모델 이름으로 검색',
        currentlySelected: '$(check) 현재 선택됨',
        alreadySelectedModel: 'ℹ️ 이미 선택된 모델입니다.',
        currentlyUsingModel: (modelName: string) => `현재 ${modelName} 모델을 사용 중입니다.`,
        paidModelWarning: (modelName: string) => `${modelName}은(는) 무료 API 키로는 사용할 수 없습니다.\n\n유료 요금제가 필요합니다.\n\n계속하시겠습니까?`,
        paidModelSelected: '⚠️ 유료 모델이 선택되었습니다. API 키에 유료 요금제가 설정되어 있는지 확인하세요.',
        changingModel: (modelName: string) => `🔄 ${modelName} 모델로 변경 중...`,
        modelChangeSuccess: (modelName: string) => `✅ 모델 변경 성공: ${modelName}이(가) 선택되었습니다.`,
        modelSelected: (modelName: string) => `✅ ${modelName} 모델이 선택되었습니다.`,

        // ShowNavigator
        navigatorTitle: 'GitScope Navigator',
        navigatorAlreadyOpen: '🧭 GitScope Navigator가 이미 열려 있습니다.',

        webviewLoadFailed: (path: string) => `[GitScope] 웹뷰 HTML 파일 로드 실패: ${path}`,

        commandExecuteSuccess: '[GitScope] 명령어 실행 요청 성공',
        commandExecuteFailed: (error: string) => `[GitScope] 명령어 실행 실패.\n오류: ${error}`,

        //StageAllCommand
        stageAllStart: '모든 변경 파일을 스테이징합니다.',
        stageAllInProgress: '🔄 모든 변경 사항 (Untracked 포함) 스테이징 중...',
        stageAllSuccess: '✅ 스테이징 완료.',

        welcome: {
            title: 'GitScope에 오신 것을 환영합니다!!!!!!!!',
            asciiArt: [
                ' ',
                '   /\\_/\\  ',
                '  ( o.o ) < Meow! GitScope에 오신 것을 환영합니다!!!!!!!!',
                '   > ^ <   ',
                '  /     \\  ',
                ' (_______) ',
                ' ',
            ],
            usageGuideTitle: '## 📚 명령어 사용 안내',
            usageGuideDescription: '* **GitScope**의 모든 기능 및 사용법은 다음 Notion 문서를 참고해주세요.',
            usageGuideLink: 'https://sparkling-0902.notion.site/GitScope-Extension-2af6a40f9fff804da616e999e8527349?source=copy_link',
            notionLinkText: '[👉 GitScope 사용 설명서 바로가기]',
            
            apiSecurityTitle: '## 🔑 Gemini API 키 안전 및 요금 안내',
            securityTitle: '### 🔒 보안 안내',
            securityDescription1: '* 사용자의 Gemini API 키는 **SecretStorage**에 안전하게 저장됩니다.',
            securityDescription2: '* SecretStorage는 OS의 키체인(Keychain) 등 보안 저장소를 사용하며, 확장 프로그램 외 접근은 불가능합니다.',
            
            pricingTitle: '### 💸 요금 안내',
            pricingDescription1: '* 이 확장은 **사용자의 Gemini 키**를 사용하여 모델을 호출합니다.',
            pricingDescription2: '* 따라서 GitScope 사용에 따른 API 호출 요금은 **사용자 본인에게 부과**됩니다.',
        },


    },
    
    models: {
        flashLite: 'Gemini 2.5 Flash-Lite (무료)',
        flashLiteDesc: '대량 처리에 최적화된 경량 모델, 빠른 응답 속도',
        flash25: 'Gemini 2.5 Flash (무료) (추천)',
        flash25Desc: '속도와 품질의 균형, 일반적인 커밋 메시지 생성에 최적',
        flash20: 'Gemini 2.0 Flash (무료)',
        flash20Desc: '안정적인 범용 모델, 비용 효율적',
        pro25: 'Gemini 2.5 Pro (유료)',
        pro25Desc: '복잡한 코드 분석과 상세한 커밋 메시지 생성, 높은 정확도',
        pro3: 'Gemini 3 Pro (유료)',
        pro3Desc: '최신 최고 성능 모델, 복잡한 코딩 작업에 최적',
    },

    errors: {
        apiKeyInvalid: 'API 키 오류 또는 권한 부족, 키 확인 후 재설정 해주세요.',
        missingApiKey: 'Gemini API 키가 설정되지 않았습니다.',
        quotaExceeded: '사용량(Quota) 초과 (HTTP 429). Google AI Studio에서 확인하세요.',
        apiCommunication: '예기치 않은 API 오류가 발생했습니다.',
        networkError: '네트워크 오류: 인터넷 연결 상태를 확인해 주세요.',
        parseFailed: 'Gemini 응답 데이터를 파싱할 수 없습니다.',
        invalidDiff: 'diff 값이 비어있습니다.',
        createBranchFailed: 'Branch명 추천 및 생성 실패',
        checkoutBranchFailed: 'Branch 전환 실패',
        noLocalBranchToCheckout: '로컬에 전환할 수 있는 브랜치가 없습니다.',
        noLocalBranchToDelete: '삭제할 수 있는 다른 로컬 브랜치가 없습니다.',
        noLocalBranchToMerge: '로컬에 병합할 수 있는 다른 브랜치가 없습니다.',
        geminiBranchRecommandationFailed: 'Gemini가 유효한 브랜치 이름을 추천하지 못했어요😥 수동으로 입력해주세요!',
        deleteBranchFailed: 'Branch 삭제 실패',
        cloneRepositoryFailed: 'Git Clone 실패',
        noWorkSpace: '현재 열린 폴더가 없습니다. 클론할 상위 디렉토리를 선택해주세요.',
        commitFailed: 'Git Commit 실패',
        generateCommitMessageFailed: 'Commit Message 생성 실패',
        commitMessageNotFound: '클립보드가 비어 있거나 커밋 메시지가 없습니다.',
        noModifiedCode: '변경된 코드가 없습니다.',
        emptyDiff: '유효한 변경 사항이 없습니다.',
        mergeConflict: 'Merge 충돌이 발생했습니다.',
        mergeFailed: 'Git Merge 실패',
        pullFailed: 'Git Pull 실패',
        pushFailed: 'Git Push 실패',
        stageAllFailed: '모든 변경사항 스테이징 실패',
        recommendationFailed: 'Gemini 추천 실행 실패',
        tagCommandFailed: 'Tag 생성 및 push 실패',
        selectGeminiModelFailed: 'Gemini 모델 선택 실패',
        webviewLoadFailed: '웹뷰를 불러오는 중 오류가 발생했습니다.',
    },

    prompts: {
        commitMessage: (diff: string, currentBranch: string) => `
            너는 Git 전문가야.
            다음 git diff를 기반으로 커밋 메시지를 작성해줘.
            **[매우 중요: 메시지 형식 규칙]**
            1. 메시지는 **제목 줄(Subject)**과 **본문(Body)**으로 구성해야 하며, **반드시 둘 사이에 빈 줄을 하나 포함**해야 해.
            2. **제목 줄(첫 번째 줄)**은 **50자 이내**로 작성해줘.
            3. 본문을 문장별로 구분하고, 구분된 각 문장 앞에 '-' 을 붙여 구분해줘.
            ${(currentBranch.startsWith('hotfix') || currentBranch.startsWith('release'))
                ? `
                    **[특수 브랜치 규칙 적용]**
                    현재 브랜치 이름(${currentBranch})이 'hotfix' 또는 'release'로 시작해.
                    **제목 줄은 브랜치 이름 전체를 접두사**로 사용하여 시작해야 해.
                    예시 1) 브랜치: 'hotfix/v1.0.1' → 커밋: **"Hotfix/v1.0.1: ~~"**
                    예시 2) 브랜치: 'release/v2.5.0' → 커밋: **"Release/v2.5.0: ~~"** 등의 형식으로
                `
                :
                `
                    **[일반 브랜치 규칙 적용]**
                    현재 브랜치 이름(${currentBranch})을 참고해.
                    제목 줄은 반드시 **"Feat: ~~", "Fix: ~~" 등의 Conventional Commit 형식을 지켜서 첫글자는 대문자로** 시작해야 해.
                `
            }
            
            본문은 한글로 작성해줘.
            diff: ${diff}
        `,

        branchNames: (diff: string, count: number) => `
            너는 Git 전문가야. 다음 git diff를 기반으로 브랜치 이름을 ${count}개 추천해줘.

            **브랜치 이름은 반드시 \`feat/\`, \`fix/\`, \`refactor/\`, \`docs/\`, \`style/\`, \`chore/\`, \`test/\` 중 적절한 접두사로 시작해야해.**

            반환 형식:
            ${count} 개의 브랜치 이름을 **쉼표(,)**로만 구분해서 출력해줘. 다른 문장이나 설명은 절대 포함하지 마.
            diff: ${diff}
        `
    },

    navigator: {
        //flows
        flows: {
            common: {
                title: '⚙️ GitScope 필수 설정',
                description: '모든 Git 전략을 시작하기 전에 필요한 필수 단계입니다.',
            },
            single: {
                title: '🌳 Single Branch (Main/Master 기반)',
                description: '모든 작업이 하나의 브랜치(일반적으로 `main` 또는 `master`)에서 이루어집니다. 단순하고 빠른 배포에 적합합니다.',
                tags: ['#1인개발', '#토이프로젝트', '#빠른배포'],
                branches: [
                    { name: '`main` 또는 `master`', description: '모든 작업이 이루어지는 유일한 브랜치입니다. 배포(Deploy)에 사용됩니다.' }
                ],
            },
            github: {
                title: "🐙 GitHub Flow",
                description: "짧은 수명의 토픽 브랜치에서 작업하고, Pull Request를 통해 `main` 브랜치로 통합합니다. 단순하고 지속적인 배포에 용이합니다.",
                tags: ['#소규모', '#2인 ~ 5인', '#가장 인기 많음', '#PullRequest', '#코드리뷰', '#단순함'],
                branches: [
                    { name: "`main`", description: "항상 배포 가능한 안정적인 최신 코드를 유지하는 메인 브랜치입니다. 모든 토픽 브랜치는 이곳으로 병합됩니다." },
                    { name: "`feature/*`, `fix/*`, `refactor/*`, ...", description: "새로운 기능 개발이나 버그 수정, 리팩토링 등 모든 종류의 변경사항을 위한 짧은 수명의 브랜치입니다. 작업이 완료되면 Pull Request를 통해 `main`에 병합됩니다." }
                ],
            },
            gitlab: {
                title: "🧪 GitLab Flow",
                description: "통합 브랜치와 환경별 브랜치(예: `pre-production`, `production`)를 사용하며, MR(Merge Request)을 통해 통합됩니다. CI/CD 파이프라인과 연동하기 좋습니다.",
                tags: ['#중규모', '#5인 ~ 20인', '#CI/CD', '#안정성'],
                branches: [
                    { name: "`main`", description: "안정적인 최신 코드를 유지하며 개발 브랜치로 사용됩니다." },
                    { name: "`feature/*`", description: "기능 개발 또는 버그 수정을 위한 브랜치입니다. 작업 후 MR을 통해 `main`에 병합됩니다." },
                    { name: "`pre-production` (선택적)", description: "운영 환경 배포 전에 최종 테스트를 수행하는 환경별 브랜치입니다." },
                    { name: "`production` (선택적)", description: "실제 사용자에게 서비스되는 운영 환경을 위한 브랜치입니다." }
                ],
            },
            gitflow: {
                title: "🌊 Git Flow (Vincent Driessen Model)",
                description: "두 개의 메인 브랜치(`master`/`main`과 `develop`)를 사용하며, `feature`, `release`, `hotfix` 브랜치로 복잡하지만 안정적인 배포 과정을 관리합니다.",
                tags: ['#대규모', '#안정된 릴리즈', '#복잡한배포', '#여러 버전 운영'],
                branches: [
                    { name: "`master` 또는 `main`", description: "운영 환경에 배포된 코드를 담는 브랜치입니다. 태그를 사용하여 릴리즈 버전을 기록합니다." },
                    { name: "`develop`", description: "다음 릴리즈를 위한 통합 개발 브랜치입니다. 모든 `feature` 브랜치는 이곳으로 병합됩니다." },
                    { name: "`feature/*`", description: "새로운 기능을 개발하기 위해 `develop`에서 분기하는 브랜치입니다." },
                    { name: "`release/*`", description: "`develop` 브랜치에서 분기하여 릴리즈 준비를 하는 브랜치입니다." },
                    { name: "`hotfix/*`", description: "운영 환경의 심각한 버그를 긴급하게 수정하기 위해 `master`에서 분기하는 브랜치입니다." }
                ],
            },
        },
        
        steps: {
            startGuide: 'GitScope 사용 안내',
            configKey: 'Gemini API Key 설정 (필수)',
            selectGeminiModel: 'Gemini 모델 선택',
            clone: '원격 저장소 클론 (필수)',
            pull: '최신 변경 사항 Pull',
            pullMain: 'Main 브랜치 최신 상태 Pull',
            pullDevelop: 'Develop 브랜치 최신 상태 Pull',
            develop: '코드 개발 및 변경 (Develop)',
            stageAll: '모든 변경 사항 Staging',
            generateMessage: 'Commit Message 생성 (AI 추천)',
            commit: '변경 사항 Commit',
            push: '원격 저장소로 Push',
            pushToQAServer : 'Push (QA 서버 배포 트리거)',
            pushToProductionServer: 'Push (운영 서버 배포 트리거)',
            createBranchAI: 'Branch 생성/전환 (AI 추천)',
            createBranchManual: 'Branch 생성/전환 (수동 입력)',
            checkoutBranch: 'Branch 전환',
            checkoutToMain: 'Main 브랜치로 Checkout',
            checkoutToPreProduction: 'pre-production 브랜치로 Checkout',
            checkoutToProduction: 'production 브랜치로 Checkout',
            checkoutToDevelop: 'Develop 브랜치로 Checkout',
            mergeMain: 'Main 브랜치 Merge',
            mergeDevelop: 'Develop 브랜치 Merge',
            mergePreProduction: 'Pre-production 브랜치 Merge',
            mergeRelease: 'release/[version] 브랜치 Merge',
            mergeHotfix: 'hotfix/[version] 브랜치 Merge',
            deleteLocalBranch: '불필요한 Local Branch 삭제',
            deleteReleaseBranch: 'release/[version] Branch 삭제',
            deleteHotfixBranch: 'hotfix/[version] Branch 삭제',
            createTagAndPush: 'Main에 태그 부착',
            prReviewMain: 'MR/PR 검토 후 Main에 Merge',
            prReviewDevelop: 'MR/PR 검토 후 Develop에 Merge',
            qaTest: 'QA 진행',
            releaseBugfix: 'Release 버그 수정 및 검토',
            hotfixBugfix: '긴급 버그 수정 진행',
        },
        
        accordions: {
            initialSetup: '⚙️ 초기 환경 브랜치 설정 (최초 1회)',
            featureDevelopment: '💻 기능 개발 및 Main 브랜치 통합',
            preProductionDeploy: '👀 pre-production 배포 (테스트)',
            productionDeploy: '🌟 production 배포 (출시)',
            releaseDeploy: '🚀 Release 릴리즈 준비 및 배포 (테스트)',
            hotfixDeploy: '🔥 Hotfix 긴급 배포',
        },
        
        ui: {
            indexTitle: '🚀 GitScope Navigator',
            indexDescription: '선택한 전략에 따라 워크플로우를 구성하고 명령어를 순서대로 실행하세요!',

            tabCommon: '필수 설정 (Common)',
            tabSingle: 'Single Branch',
            tabGitHub: 'GitHub Flow',
            tabGitLab: 'GitLab Flow',
            tabGitFlow: 'Git Flow',

            branchSummaryTitle: '주요 브랜치 설명',
            branchSummarySuffix: '(클릭하여 보기)',
            accordionSummarySuffix: '(클릭하여 펼치기)',
            actionRun: '실행',
            actionNoop: '안내',
            actionCompleted: '완료',
        },
        
        noopMessages: {
            develop: '이 단계는 VS Code 내에서 "코드를 직접 수정하고 파일 시스템을 변경"하는 단계입니다.\n이 버튼은 Git 명령어를 실행하지 않습니다.',
            prReview: '이 단계는 "GitHub, GitLab 등의 웹 플랫폼"에서 "동료의 코드 리뷰와 승인"을 거쳐 브랜치를 병합하는 단계입니다.\n이 버튼은 Git 명령어를 실행하지 않습니다.',
            qaTest: '이 단계는 pre-production 환경에 배포된 코드를 대상으로 "테스터 또는 QA팀이 기능 및 품질 검증을 수행"하는 단계입니다.\nQA가 완료되면 다음 단계로 진행하세요.',
            releaseBugfix: '이 단계는 릴리즈 브랜치(`release/*`)의 최종 안정화를 위해 "마지막 버그 수정, 문서 업데이트" 등을 진행하는 단계입니다.\n수정 후 다음 Git 명령어를 실행하세요.',
            hotfixBugfix: '이 단계는 핫픽스 브랜치(`hotfix/*`)에서 "운영 환경의 긴급 버그를 직접 수정"하는 단계입니다.\n수정 후 다음 Git 명령어를 실행하세요.',
            default: '이 단계는 Git 명령어를 실행하지 않고, 사용자에게 다음 작업을 안내하는 단계입니다.',
        },
    },


};