/**
 * VS Code 확장 기능 명령어 ID 매핑
 */
export const COMMAND_MAP = {
    "startGuide": "gitScope.startGitScope",
    "configKey": "gitScope.configGeminiAPIKey",
    "clone": "gitScope.executeCloneCommand",
    "pull": "gitScope.executePullCommand",
    "createBranch": "gitScope.executeCreateBranchCommand",
    "checkoutBranch": "gitScope.executeCheckoutBranchCommand",
    "stageAll": "gitScope.executeStageAllCommand",
    "generateMessage": "gitScope.generateMessage",
    "commit": "gitScope.executeCommitCommand",
    "merge": "gitScope.executeMergeCommand",
    "push": "gitScope.executePushCommand",
    "deleteLocalBranch": "gitScope.executeDeleteLocalBranchCommand",
    "createTagAndPush": "gitScope.createTagAndPushCommand",
};

/**
 * 기본 설정 및 GitFlow 전략별 단계
 */
export const FLOW_STEPS = {
    'common': {
        title: "⚙️ GitScope 필수 설정",
        description: "모든 Git 전략을 시작하기 전에 필요한 필수 단계입니다.",
        tags: [],
        branches: [],
        steps: [
            { label: "GitScope 사용 안내", cmd: "startGuide", icon: "🔭" },
            { label: "Gemini API Key 설정 (필수)", cmd: "configKey", icon: "🔑" },
            { label: "원격 저장소 클론 (필수)", cmd: "clone", icon: "🔗" },
        ]
    },
    'single': {
        title: "🌳 Single Branch (Main/Master 기반)",
        description: "모든 작업이 하나의 브랜치(일반적으로 `main` 또는 `master`)에서 이루어집니다. 단순하고 빠른 배포에 적합합니다.",
        tags: ['#1인개발', '#토이프로젝트', '#빠른배포'],
        branches: [
            { name: "`main` 또는 `master`", description: "모든 작업이 이루어지는 유일한 브랜치입니다. 배포(Deploy)에 사용됩니다." }
        ],
        steps: [
            { label: "[STEP1] 최신 변경 사항 Pull", cmd: "pull", icon: "📥" },
            { label: "[STEP2] 코드 개발 및 변경 (Develop)", cmd: "noop", icon: "💻" },
            { label: "[STEP3] 모든 변경 사항 Staging", cmd: "stageAll", icon: "➕" },
            { label: "[STEP4] Commit Message 생성 (AI 추천)", cmd: "generateMessage", icon: "🪶" },
            { label: "[STEP5] 변경 사항 Commit", cmd: "commit", icon: "🚀" },
            { label: "[STEP6] 원격 저장소로 Push", cmd: "push", icon: "☁️" },
        ]
    },
    'github': {
        title: "🐙 GitHub Flow",
        description: "짧은 수명의 토픽 브랜치에서 작업하고, Pull Request를 통해 `main` 브랜치로 통합합니다. 단순하고 지속적인 배포에 용이합니다.",
        tags: ['#소규모', '#2인 ~ 5인', '#가장 인기 많음', '#PullRequest', '#코드리뷰', '#단순함'],
        branches: [
            { name: "`main`", description: "항상 배포 가능한 안정적인 최신 코드를 유지하는 메인 브랜치입니다. 모든 토픽 브랜치는 이곳으로 병합됩니다." },
            { name: "`feature/*`, `fix/*`, `refactor/*`, ...", description: "새로운 기능 개발이나 버그 수정, 리팩토링 등 모든 종류의 변경사항을 위한 짧은 수명의 브랜치입니다. 작업이 완료되면 Pull Request를 통해 `main`에 병합됩니다." }
        ],
        steps: [
            { label: "[STEP1] Main 브랜치 최신 상태 Pull", cmd: "pull", icon: "📥" },
            { label: "[STEP2] 코드 개발 및 변경 (Develop)", cmd: "noop", icon: "💻" },
            { label: "[STEP3] 새 Branch 생성/전환 (AI 추천)", cmd: "createBranch", icon: "🤖" },
            { label: "[STEP4] Commit Message 생성 (AI 추천)", cmd: "generateMessage", icon: "🪶" },
            { label: "[STEP5] 변경 사항 Commit", cmd: "commit", icon: "🚀" },
            { label: "[STEP6] 원격 저장소로 Push (PR 생성 준비)", cmd: "push", icon: "☁️" },
            { label: "[STEP7] MR/PR 검토 후 Main에 Merge", cmd: "noop", icon: "✅" },
            { label: "[STEP8] Main 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
            { label: "[STEP9] Main 브랜치 최신 상태 Pull", cmd: "pull", icon: "📥" },
            { label: "[STEP10] 불필요한 Local Branch 삭제", cmd: "deleteLocalBranch", icon: "🗑️" },
        ]
    },
    'gitlab': {
        title: "🧪 GitLab Flow",
        description: "통합 브랜치와 환경별 브랜치(예: `staging`, `production`)를 사용하며, MR(Merge Request)을 통해 통합됩니다. CI/CD 파이프라인과 연동하기 좋습니다.",
        tags: ['#중규모', '#5인 ~ 20인', '#CI/CD', '#안정성'],
        branches: [
            { name: "`main`", description: "안정적인 최신 코드를 유지하며 개발 브랜치로 사용됩니다." },
            { name: "`feature/*`", description: "기능 개발 또는 버그 수정을 위한 브랜치입니다. 작업 후 MR을 통해 `main`에 병합됩니다." },
            { name: "`pre-production` (선택적)", description: "운영 환경 배포 전에 최종 테스트를 수행하는 환경별 브랜치입니다." },
            { name: "`production` (선택적)", description: "실제 사용자에게 서비스되는 운영 환경을 위한 브랜치입니다." }
        ],
        steps: [
            {
                isAccordion: true,
                accordionTitle: '⚙️ 초기 환경 브랜치 설정 (최초 1회)',
                accordionSteps: [
                    { label: "pre-production Branch 생성/전환", cmd: "createBranch", icon: "🌳" },
                    { label: "원격 저장소로 Push (pre-production)", cmd: "push", icon: "☁️" },
                    { label: "production Branch 생성/전환", cmd: "createBranch", icon: "🌳" },
                    { label: "원격 저장소로 Push (production)", cmd: "push", icon: "☁️" },
                ]
            },
            {
                isAccordion: true,
                accordionTitle: '💻 기능 개발 및 Main 브랜치 통합',
                accordionSteps: [
                    { label: "[STEP1] Main 브랜치 최신 상태 Pull", cmd: "pull", icon: "📥" },
                    { label: "[STEP2] 코드 개발 및 변경 (Develop)", cmd: "noop", icon: "💻" },
                    { label: "[STEP3] 새 Branch 생성/전환 (AI 추천)", cmd: "createBranch", icon: "🤖" },
                    { label: "[STEP4] Commit Message 생성 (AI 추천)", cmd: "generateMessage", icon: "🪶" },
                    { label: "[STEP5] 변경 사항 Commit", cmd: "commit", icon: "🚀" },
                    { label: "[STEP6] 원격 저장소로 Push (PR 생성 준비)", cmd: "push", icon: "☁️" },
                    { label: "[STEP7] MR/PR 검토 후 Main에 Merge", cmd: "noop", icon: "✅" },
                    { label: "[STEP8] Main 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
                    { label: "[STEP9] Main 브랜치 최신 상태 Pull", cmd: "pull", icon: "📥" },
                    { label: "[STEP10] 불필요한 Local Branch 삭제", cmd: "deleteLocalBranch", icon: "🗑️" },
                ]
            },
            {
                isAccordion: true,
                accordionTitle: '👀 pre-production 배포 (테스트)',
                accordionSteps: [
                    { label: "[STEP1] pre-production 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
                    { label: "[STEP2] 최신 상태 Pull", cmd: "pull", icon: "📥" },
                    { label: "[STEP3] Main 브랜치 Merge", cmd: "merge", icon: "➡️" },
                    { label: "[STEP4] Push (QA 서버 배포 트리거)", cmd: "push", icon: "☁️" },
                    { label: "[STEP5] QA 진행", cmd: "noop", icon: "👀" },
                ]
            },
            {
                isAccordion: true,
                accordionTitle: '🌟 production 배포 (출시)',
                accordionSteps: [
                    { label: "[STEP1] production 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
                    { label: "[STEP2] 최신 상태 Pull", cmd: "pull", icon: "📥" },
                    { label: "[STEP3] Pre-production 브랜치 Merge", cmd: "merge", icon: "➡️" },
                    { label: "[STEP4] Push (운영 서버 배포 트리거)", cmd: "push", icon: "☁️" },
                ]
            },

        ]
    },
    'gitflow': {
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
        steps: [
            {
                isAccordion: true,
                accordionTitle: '⚙️ 초기 환경 브랜치 설정 (최초 1회)',
                accordionSteps: [
                    { label: "develop Branch 생성/전환", cmd: "createBranch", icon: "🌳" },
                    { label: "원격 저장소로 Push (develop)", cmd: "push", icon: "☁️" },
                ]
            },
            {
                isAccordion: true,
                accordionTitle: '💻 기능 개발 및 develop 브랜치 통합',
                accordionSteps: [
                    { label: "[STEP1] Develop 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
                    { label: "[STEP2] Develop 브랜치 최신 상태 Pull", cmd: "pull", icon: "📥" },
                    { label: "[STEP3] 코드 개발 및 변경 (Develop)", cmd: "noop", icon: "💻" },
                    { label: "[STEP4] 새 Branch 생성/전환 (AI 추천)", cmd: "createBranch", icon: "🤖" },
                    { label: "[STEP5] Commit Message 생성 (AI추천)", cmd: "generateMessage", icon: "🪶" },
                    { label: "[STEP6] 변경 사항 Commit", cmd: "commit", icon: "🚀" },
                    { label: "[STEP7] 원격 저장소로 Push (PR 생성 준비)", cmd: "push", icon: "☁️" },
                    { label: "[STEP8] MR/PR 검토 후 Develop에 Merge", cmd: "noop", icon: "✅" },
                    { label: "[STEP9] Develop 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
                    { label: "[STEP10] Develop 브랜치 최신 상태 Pull", cmd: "pull", icon: "📥" },
                    { label: "[STEP11] 불필요한 Local Branch 삭제", cmd: "deleteLocalBranch", icon: "🗑️" },
                ]
            },
            {
                isAccordion: true,
                accordionTitle: '🚀 Release 릴리즈 준비 및 배포 (테스트)',
                accordionSteps: [
                    { label: "[STEP1] \"release/<버전>\" Branch 생성/전환", cmd: "createBranch", icon: "🌳" },
                    { label: "[STEP2] Develop 브랜치 Merge", cmd: "merge", icon: "➡️" },
                    { label: "[STEP3] release 버그 수정 및 검토", cmd: "noop", icon: "🔍" },
                    { label: "[STEP4] 모든 변경 사항 Staging", cmd: "stageAll", icon: "➕" },
                    { label: "[STEP5] Commit Message 생성 (AI추천)", cmd: "generateMessage", cmd: "generateMessage", icon: "🪶" },
                    { label: "[STEP6] 변경 사항 Commit", cmd: "commit", icon: "🚀" },
                    { label: "[STEP7] 원격 저장소로 Push", cmd: "push", icon: "☁️" },
                    { label: "[STEP8] MR/PR 검토 후 Main에 Merge", cmd: "noop", icon: "✅" },
                    //main에 태그 부착
                    { label: "[STEP9] Main 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
                    { label: "[STEP10] Main에 Tag 부착", cmd: "createTagAndPush", icon: "🏷️" },

                    //백머지 진행
                    { label: "[STEP11] Develop 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
                    { label: "[STEP12] Develop 브랜치 최신 상태 Pull", cmd: "pull", icon: "📥" },
                    { label: "[STEP13] \"release/<버전>\" 브랜치 Merge", cmd: "merge", icon: "➡️" },
                    { label: "[STEP14] 원격 저장소로 Push (MR 생성 준비)", cmd: "push", icon: "☁️" },
                    { label: "[STEP15] \"release/<버전>\" Branch 삭제", cmd: "deleteLocalBranch", icon: "🗑️" },
                ]
            },
            {
                isAccordion: true,
                accordionTitle: '🔥 Hotfix 긴급 배포',
                accordionSteps: [
                    { label: "[STEP1] \"hotfix/<버전>\" Branch 생성/전환", cmd: "createBranch", icon: "🌳" },
                    { label: "[STEP2] Main 브랜치 Merge", cmd: "merge", icon: "➡️" }, // Hotfix는 master에서 분기해야 함 (현재 코드에서는 main 통합으로 되어있음, 이는 Git Flow의 일반적인 방법과 다를 수 있으나 사용자 코드에 따름)
                    { label: "[STEP3] 긴급 버그 수정 진행", cmd: "noop", icon: "🔥" },
                    { label: "[STEP4] 모든 변경 사항 Staging", cmd: "stageAll", icon: "➕" },
                    { label: "[STEP5] Commit Message 생성 (AI추천)", cmd: "generateMessage", icon: "🪶" },
                    { label: "[STEP6] 변경 사항 Commit", cmd: "commit", icon: "🚀" },
                    { label: "[STEP7] 원격 저장소로 Push", cmd: "push", icon: "☁️" },
                    { label: "[STEP8] MR/PR 검토 후 Main에 Merge", cmd: "noop", icon: "✅" },
                    //main에 태그 부착
                    { label: "[STEP9] Main 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
                    { label: "[STEP10] Main에 현재 버전 Tag 부착", cmd: "createTagAndPush", icon: "🏷️" },

                    //백머지 진행
                    { label: "[STEP11] Develop 브랜치로 Checkout", cmd: "checkoutBranch", icon: "🔄" },
                    { label: "[STEP12] Develop 브랜치 최신 상태 Pull", cmd: "pull", icon: "📥" },
                    { label: "[STEP13] \"hotfix/<버전>\" 브랜치 Merge", cmd: "merge", icon: "➡️" },
                    { label: "[STEP14] 원격 저장소로 Push (MR 생성 준비)", cmd: "push", icon: "☁️" },
                    { label: "[STEP15] \"hotfix/<버전>\" Branch 삭제", cmd: "deleteLocalBranch", icon: "🗑️" },
                ]
            },
        ]
    }
};

export const UI_STRINGS = {
    BRANCH_SUMMARY_SUFFIX: '(클릭하여 보기)',
    ACCORDION_SUMMARY_SUFFIX: '(클릭하여 펼치기)',
    ACTION_RUN: '실행',
    ACTION_NOOP: '안내',
};


/**
 * 'noop' 단계 안내 메시지
 */
export const NOOP_MESSAGES = {
    "코드 개발 및 변경": "이 단계는 VS Code 내에서 \"코드를 직접 수정하고 파일 시스템을 변경\"하는 단계입니다.\n이 버튼은 Git 명령어를 실행하지 않습니다.",
    "MR/PR 검토 후": "이 단계는 \"GitHub, GitLab 등의 웹 플랫폼\"에서 \"동료의 코드 리뷰와 승인\"을 거쳐 브랜치를 병합하는 단계입니다.\n이 버튼은 Git 명령어를 실행하지 않습니다.",
    "QA 진행": "이 단계는 pre-production 환경에 배포된 코드를 대상으로 \"테스터 또는 QA팀이 기능 및 품질 검증을 수행\"하는 단계입니다.\nQA가 완료되면 다음 단계로 진행하세요.",
    "release 버그 수정 및 검토": "이 단계는 릴리즈 브랜치(`release/*`)의 최종 안정화를 위해 \"마지막 버그 수정, 문서 업데이트\" 등을 진행하는 단계입니다.\n수정 후 다음 Git 명령어를 실행하세요.",
    "긴급 버그 수정 진행": "이 단계는 핫픽스 브랜치(`hotfix/*`)에서 \"운영 환경의 긴급 버그를 직접 수정\"하는 단계입니다.\n수정 후 다음 Git 명령어를 실행하세요.",
    "DEFAULT": "이 단계는 Git 명령어를 실행하지 않고, 사용자에게 다음 작업을 안내하는 단계입니다."
};

export const MESSAGE_DISPLAY_TIME = 7000;