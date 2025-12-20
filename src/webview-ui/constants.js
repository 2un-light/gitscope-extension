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
    "selectGeminiModel": "gitScope.selectGeminiModel",
};


export const getFlowSteps = (t) => {
    const nav = t.navigator;
    return {
        'common': {
            title: nav.flows.common.title,
            description: nav.flows.common.description,
            steps: [
                { label: nav.steps.startGuide, cmd: "startGuide", icon: "🔭" },
                { label: nav.steps.configKey, cmd: "configKey", icon: "🔑" },
                { label: nav.steps.selectGeminiModel, cmd: "selectGeminiModel", icon: "🤖" },
                { label: nav.steps.clone, cmd: "clone", icon: "🔗" },
            ]
        },

        'single' : {
            title: nav.flows.single.title,
            description: nav.flows.single.description,
            tags: nav.flows.single.tags,
            branches: nav.flows.single.branches,
            steps: [
                { label: `[STEP1] ${nav.steps.pull}`, cmd: "pull", icon: "📥" },
                { label: `[STEP2] ${nav.steps.develop}`, cmd: "noop", icon: "💻" },
                { label: `[STEP3] ${nav.steps.stageAll}`, cmd: "stageAll", icon: "➕" },
                { label: `[STEP4] ${nav.steps.generateMessage}`, cmd: "generateMessage", icon: "🪶" },
                { label: `[STEP5] ${nav.steps.commit}`, cmd: "commit", icon: "🚀" },
                { label: `[STEP6] ${nav.steps.push}`, cmd: "push", icon: "☁️" },

            ]
        },

        'github': {
            title: nav.flows.github.title,
            description: nav.flows.github.description,
            tags: nav.flows.github.tags,
            branches: nav.flows.github.branches,
            steps: [
                { label: `[STEP1] ${nav.steps.pullMain}`, cmd: "pull", icon: "📥" },
                { label: `[STEP2] ${nav.steps.develop}`, cmd: "noop", icon: "💻" },
                { label: `[STEP3] ${nav.steps.createBranchAI}`, cmd: "createBranch", icon: "🤖" },
                { label: `[STEP4] ${nav.steps.generateMessage}`, cmd: "generateMessage", icon: "🪶" },
                { label: `[STEP5] ${nav.steps.commit}`, cmd: "commit", icon: "🚀" },
                { label: `[STEP6] ${nav.steps.push}`, cmd: "push", icon: "☁️" },
                { label: `[STEP7] ${nav.steps.prReviewMain}`, cmd: "noop", icon: "✅" },
                { label: `[STEP8] ${nav.steps.checkoutToMain}`, cmd: "checkoutBranch", icon: "🔄" },
                { label: `[STEP9] ${nav.steps.pullMain}`, cmd: "pull", icon: "📥" },
                { label: `[STEP10] ${nav.steps.deleteLocalBranch}`, cmd: "deleteLocalBranch", icon: "🗑️" },
            ]
        },

        'gitlab': {
            title: nav.flows.gitlab.title,
            description: nav.flows.gitlab.description,
            tags: nav.flows.gitlab.tags,
            branches: nav.flows.gitlab.branches,
            steps: [
                 {
                    isAccordion: true,
                    accordionTitle: nav.accordions.initialSetup,
                    accordionSteps: [
                        { label: `"pre-production" ${nav.steps.createBranchManual}`, cmd: "createBranch", icon: "🌳" },
                        { label: `${nav.steps.push} (pre-production)`, cmd: "push", icon: "☁️" },
                        { label: `"production" ${nav.steps.createBranchManual}`, cmd: "createBranch", icon: "🌳" },
                        { label: `${nav.steps.push} (production)`, cmd: "push", icon: "☁️" },
                    ]
                },
                {
                    isAccordion: true,
                    accordionTitle: nav.accordions.featureDevelopment,
                    accordionSteps: [
                        { label: `[STEP1] ${nav.steps.pullMain}`, cmd: "pull", icon: "📥" },
                        { label: `[STEP2] ${nav.steps.develop}`, cmd: "noop", icon: "💻" },
                        { label: `[STEP3] ${nav.steps.createBranchAI}`, cmd: "createBranch", icon: "🤖" },
                        { label: `[STEP4] ${nav.steps.generateMessage}`, cmd: "generateMessage", icon: "🪶" },
                        { label: `[STEP5] ${nav.steps.commit}`, cmd: "commit", icon: "🚀" },
                        { label: `[STEP6] ${nav.steps.push}`, cmd: "push", icon: "☁️" },
                        { label: `[STEP7] ${nav.steps.prReviewMain}`, cmd: "noop", icon: "✅" },
                        { label: `[STEP8] ${nav.steps.checkoutToMain}`, cmd: "checkoutBranch", icon: "🔄" },
                        { label: `[STEP9] ${nav.steps.pullMain}`, cmd: "pull", icon: "📥" },
                        { label: `[STEP10] ${nav.steps.deleteLocalBranch}`, cmd: "deleteLocalBranch", icon: "🗑️" },
                    ]
                },
                {
                    isAccordion: true,
                    accordionTitle: nav.accordions.preProductionDeploy,
                    accordionSteps: [
                        { label: `[STEP1] ${nav.steps.checkoutToPreProduction}`, cmd: "checkoutBranch", icon: "🔄" },
                        { label: `[STEP2] ${nav.steps.pull}`, cmd: "pull", icon: "📥" },
                        { label: `[STEP3] ${nav.steps.mergeMain}`, cmd: "merge", icon: "➡️" },
                        { label: `[STEP4] ${nav.steps.pushToQAServer}`, cmd: "push", icon: "☁️" },
                        { label: `[STEP5] ${nav.steps.qaTest}`, cmd: "noop", icon: "👀" },
                    ]
                },
                {
                    isAccordion: true,
                    accordionTitle: nav.accordions.productionDeploy,
                    accordionSteps: [
                        { label: `[STEP1] ${nav.steps.checkoutToProduction}`, cmd: "checkoutBranch", icon: "🔄" },
                        { label: `[STEP2] ${nav.steps.pull}`, cmd: "pull", icon: "📥" },
                        { label: `[STEP3] ${nav.steps.mergePreProduction}`, cmd: "merge", icon: "➡️" },
                        { label: `[STEP4] ${nav.steps.pushToProductionServer}`, cmd: "push", icon: "☁️" },
                    ]
                },
            ]
        },

        'gitflow': {
            title: nav.flows.gitflow.title,
            description: nav.flows.gitflow.description,
            tags: nav.flows.gitflow.tags,
            branches: nav.flows.gitflow.branches,
            steps: [
                {
                    isAccordion: true,
                    accordionTitle: nav.accordions.initialSetup,
                    accordionSteps: [
                        { label: `"develop" ${nav.steps.createBranchManual}`, cmd: "createBranch", icon: "🌳" },
                        { label: `${nav.steps.push} (develop)`, cmd: "push", icon: "☁️" },
                    ]
                },
                {
                    isAccordion: true,
                    accordionTitle: nav.accordions.featureDevelopment,
                    accordionSteps: [
                        { label: `[STEP1] ${nav.steps.checkoutToDevelop}`, cmd: "checkoutBranch", icon: "🔄" },
                        { label: `[STEP2] ${nav.steps.pullDevelop}`, cmd: "pull", icon: "📥" },
                        { label: `[STEP3] ${nav.steps.develop}`, cmd: "noop", icon: "💻" },
                        { label: `[STEP4] ${nav.steps.createBranchAI}`, cmd: "createBranch", icon: "🤖" },
                        { label: `[STEP5] ${nav.steps.generateMessage}`, cmd: "generateMessage", icon: "🪶" },
                        { label: `[STEP6] ${nav.steps.commit}`, cmd: "commit", icon: "🚀" },
                        { label: `[STEP7] ${nav.steps.push}`, cmd: "push", icon: "☁️" },
                        { label: `[STEP8] ${nav.steps.prReviewDevelop}`, cmd: "noop", icon: "✅" },
                        { label: `[STEP9] ${nav.steps.checkoutToDevelop}`, cmd: "checkoutBranch", icon: "🔄" },
                        { label: `[STEP10] ${nav.steps.pullDevelop}`, cmd: "pull", icon: "📥" },
                        { label: `[STEP11] ${nav.steps.deleteLocalBranch}`, cmd: "deleteLocalBranch", icon: "🗑️" },
                    ]
                },
                {
                    isAccordion: true,
                    accordionTitle: nav.accordions.releaseDeploy,
                    accordionSteps: [
                        { label: `[STEP1] "release/[version]" ${nav.steps.createBranchManual}`, cmd: "createBranch", icon: "🌳" },
                        { label: `[STEP2] ${nav.steps.mergeDevelop}`, cmd: "merge", icon: "➡️" },
                        { label: `[STEP3] ${nav.steps.releaseBugfix}`, cmd: "noop", icon: "🔍" },
                        { label: `[STEP4] ${nav.steps.stageAll}`, cmd: "stageAll", icon: "➕" },
                        { label: `[STEP5] ${nav.steps.generateMessage}`, cmd: "generateMessage", cmd: "generateMessage", icon: "🪶" },
                        { label: `[STEP6] ${nav.steps.commit}`, cmd: "commit", icon: "🚀" },
                        { label: `[STEP7] ${nav.steps.push}`, cmd: "push", icon: "☁️" },
                        { label: `[STEP8] ${nav.steps.prReviewMain}`, cmd: "noop", icon: "✅" },
                        //main에 태그 부착
                        { label: `[STEP9] ${nav.steps.checkoutToMain}`, cmd: "checkoutBranch", icon: "🔄" },
                        { label: `[STEP10] ${nav.steps.createTagAndPush}`, cmd: "createTagAndPush", icon: "🏷️" },

                        //백머지 진행
                        { label: `[STEP11] ${nav.steps.checkoutToDevelop}`, cmd: "checkoutBranch", icon: "🔄" },
                        { label: `[STEP12] ${nav.steps.pullDevelop}`, cmd: "pull", icon: "📥" },
                        { label: `[STEP13] ${nav.steps.mergeRelease}`, cmd: "merge", icon: "➡️" },
                        { label: `[STEP14] ${nav.steps.push}`, cmd: "push", icon: "☁️" },
                        { label: `[STEP15] ${nav.steps.deleteReleaseBranch}`, cmd: "deleteLocalBranch", icon: "🗑️" },
                    ]
                },
                {
                    isAccordion: true,
                    accordionTitle: nav.accordions.hotfixDeploy,
                    accordionSteps: [
                        { label: `[STEP1] "hotfix/[version]" ${nav.steps.createBranchManual}`, cmd: "createBranch", icon: "🌳" },
                        { label: `[STEP2] ${nav.steps.mergeMain}`, cmd: "merge", icon: "➡️" }, // Hotfix는 master에서 분기해야 함 (현재 코드에서는 main 통합으로 되어있음, 이는 Git Flow의 일반적인 방법과 다를 수 있으나 사용자 코드에 따름)
                        { label: `[STEP3] ${nav.steps.hotfixBugfix}`, cmd: "noop", icon: "🔥" },
                        { label: `[STEP4] ${nav.steps.stageAll}`, cmd: "stageAll", icon: "➕" },
                        { label: `[STEP5] ${nav.steps.generateMessage}`, cmd: "generateMessage", icon: "🪶" },
                        { label: `[STEP6] ${nav.steps.commit}`, cmd: "commit", icon: "🚀" },
                        { label: `[STEP7] ${nav.steps.push}`, cmd: "push", icon: "☁️" },
                        { label: `[STEP8] ${nav.steps.prReviewMain}`, cmd: "noop", icon: "✅" },
                        //main에 태그 부착
                        { label: `[STEP9] ${nav.steps.checkoutToMain}`, cmd: "checkoutBranch", icon: "🔄" },
                        { label: `[STEP10] ${nav.steps.createTagAndPush}`, cmd: "createTagAndPush", icon: "🏷️" },

                        //백머지 진행
                        { label: `[STEP11] ${nav.steps.checkoutToDevelop}`, cmd: "checkoutBranch", icon: "🔄" },
                        { label: `[STEP12] ${nav.steps.pullDevelop}`, cmd: "pull", icon: "📥" },
                        { label: `[STEP13] ${nav.steps.mergeHotfix}`, cmd: "merge", icon: "➡️" },
                        { label: `[STEP14] ${nav.steps.push}`, cmd: "push", icon: "☁️" },
                        { label: `[STEP15] ${nav.steps.deleteHotfixBranch}`, cmd: "deleteLocalBranch", icon: "🗑️" },
                    ]
                },
            ]
        },

    }

};

export const getUIStrings = (t) => {
    const ui = t.navigator.ui;

    return {
        BRANCH_SUMMARY_TITLE: ui.branchSummaryTitle,
        BRANCH_SUMMARY_SUFFIX: ui.branchSummarySuffix,
        ACCORDION_SUMMARY_SUFFIX: ui.accordionSummarySuffix,
        ACTION_RUN: ui.actionRun,
        ACTION_NOOP: ui.actionNoop,
        ACTION_COMPLETED: ui.actionCompleted,
    };
};


/**
 * 'noop' 단계 안내 메시지
 */
export const getNoopMessages = (t) => {
    const noop = t.navigator.noopMessages;
    const steps = t.navigator.steps; // 단계 이름 객체

    return {
        [steps.develop]: noop.develop,
        [steps.prReviewMain]: noop.prReview,
        [steps.prReviewDevelop]: noop.prReview,
        [steps.qaTest]: noop.qaTest,
        [steps.releaseBugfix]: noop.releaseBugfix,
        [steps.hotfixBugfix]: noop.hotfixBugfix,
        "DEFAULT": noop.default
    };
};

export const MESSAGE_DISPLAY_TIME = 7000;