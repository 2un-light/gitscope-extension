import { ITranslations } from '../i18n';

export const en: ITranslations = {
    
    messages: {
        // Common - 공통 메시지
        cancelled: '❌ Cancelled.',

        // Common Buttons - 공통 버튼
        continueButton: 'Continue',
        cancelButton: 'Cancel',
        deleteButton: 'Delete',
        confirmButton: 'Confirm',
        
        // CheckoutBranchCommand
        branchSwitchStart: '🔄 Starting Git branch switch',
        fetchingBranches: '🔄 Fetching local branch list...',
        currentBranchLabel: 'Current branch',
        selectBranchToSwitch: 'Select a branch to switch to',
        searchBranchName: 'Search branch name',
        switchingToBranch: (branch: string) => `🔄 Switching to branch ${branch}...`,
        branchSwitchSuccess: (branch: string) => `✅ Branch switch successful. Successfully switched to '${branch}'.`,

        // CloneCommand
        cloneStart: '🔗 Executing Git Clone',
        enterRemoteUrl: 'Enter the URL of the remote repository to clone (SSH or HTTPS address)',
        enterLocalFolder: (root: string) => `Enter repository clone path. (Parent folder ${root})`,
        cloneProgress: (url: string, path: string) => `🔄 Clone started: ${url} → ${path}`,
        cloneSuccess: (path: string) => `🎉 Clone successful! Project created at ${path}.`,
        openFolderRecommendation: '🌟 Please open the folder in VS Code to start working.',
        cloneCompletedAskOpen: (folder: string) => `🎉 Clone completed successfully.\nWould you like to open the cloned folder ${folder} in a new window?`,
        openInNewWindow: 'Open in New Window',
        openingFolder: (folder: string) => `📁 Opening folder ${folder} in new window...`,
        openFolderWarning: (folder: string) =>
            `❗️ To use the cloned repository ${folder},\nyou must open the "newly cloned folder" in VS Code for Git commands to work properly.`,

        // CommitCommand
        commitStart: '🚀 Starting Commit',
        readClipboard: '📋 Reading commit message from clipboard...',
        clipboardGuide: '💡 Please run "Git Scope: 🪶 [COMMIT] Generate Commit Message" first to copy the message.',
        emptyCommitMessage: '⚠️ Message is empty.',
        commitInProgress: (msg: string) => `🚀 Git commit in progress: "${msg.substring(0, 50)}..."`,
        commitSuccess: '🎉 Commit successful!',
        commitProceed: (msg: string) => `✅ Proceed with commit: ${msg.substring(0, 50)}...`,
        commitEdit: '✏️ Edit message and commit',
        commitConfirmPlaceholder: 'Would you like to proceed with this commit message?',
        commitEditPrompt: 'Enter final commit message.',

        // CreateTagAndPushCommand
        tagStart: '🏷️ Starting Git tag creation and push',
        nonMainBranchConfirm: (branch: string) =>
            `You are about to create a tag on branch '${branch}'. Continue?`,
        currentBranch: (branch: string) => `Current branch: ${branch}`,
        tagNameTitle: 'Enter tag name',
        tagNamePlaceholder: 'Tag name',
        tagNamePrompt: 'Enter a tag name following SemVer specification (e.g., v1.0.0)',
        tagNameRequired: 'Tag name is required.',
        tagMessageTitle: (tag: string) => `Enter message for tag '${tag}' (optional)`,
        tagMessagePlaceholder: 'Tag message (optional) Press Enter',
        tagMessagePrompt: 'Tag message will be used in release notes.',
        createLocalTag: (tag: string) => `🏷️ Creating local tag '${tag}'...`,
        createLocalTagSuccess: (tag: string) => `✅ Local tag created successfully: ${tag}`,
        pushTag: (tag: string) => `☁️ Pushing tag '${tag}' to remote repository...`,
        pushTagSuccess: (tag: string) => `🎉 Remote tag push successful: Tag '${tag}' has been pushed to remote.`,

        // DeleteLocalBranchCommand
        deleteLocalBranchStart: '🗑️ Starting local branch deletion',
        quickPickTitle: 'Select a local branch to delete',
        quickPickPlaceholder: 'Search branch name',
        quickPickDescription: 'Delete this branch locally.',
        deleteConfirmMessage: (branch: string) =>
            `Are you sure you want to delete local branch '${branch}'?\n(Unmerged commits may be lost)`,
        deletingBranch: (branch: string) => `🔄 Deleting local branch '${branch}'...`,
        deleteSuccess: (branch: string) => `🎉 Local branch '${branch}' has been successfully deleted.`,

        // GeminiAPICommand
        configKeyStart: '🔑 Starting Gemini API key configuration',
        useExistingKey: '✅ Using saved API key.',
        reRunGuide: 'If you want to reconfigure, please run this command again.',
        inputKeyPrompt: 'Enter Gemini API key (required)',
        savingKey: '🔄 Saving API key...',
        saveKeySuccess: '✅ Gemini API key has been saved successfully!',

        // GenerateCommitMessageCommand
        generateCommitMsgStart: '🪶 Starting commit message recommendation',
        stagedFilesInfo: (count: number) => `ℹ️ There are ${count} staged file(s).`,
        reuseConfirmTitle: 'Would you like to proceed with previously staged files?',
        reuseConfirmPlaceholder: 'Select an option',
        reuseSaved: (count: number) => `✅ Proceeding with existing **${count} file(s)**.`,
        checkingModifiedFiles: '🔄 Checking modified file list...',
        selectingFilesTitle: 'Select files for commit message recommendation (multiple selection allowed)',
        stagingSelectedFiles: '🔄 **Staging** selected files...',
        stagingComplete: '✅ Staging complete.',
        stagingSummary: (count: number) => `✅ **${count} file(s)** selected and staged.`,
        requestGemini: '🤖 Requesting commit message recommendation from Gemini...',
        resultTitle: '💡 Recommended Commit Message:',
        clipboardCopied: '📋 Copied to clipboard!',
        nextStepGuide: '🚀 To execute the commit, run "GitScope: 🚀 [COMMIT] Commit Changes" from the command palette.',
        reuseLabel: (count: number, files: string[]) =>
            `✅ Proceed with ${count} previously staged file(s)  (${files.join(', ')})`,
        reuseFresh: '🔄 Select new files',
        deletedFileDescription: '⚠️ Modified or deleted • Not in current directory',

        // MergeCommand
        mergeStart: '🔀 Starting Git Merge',
        fetchingMergeBranches: '🔄 Fetching local branch list for merge...',
        selectBranchToMerge: (currentBranch: string) => `Select a branch to merge into [${currentBranch}]`,
        mergeIntoBranch: (currentBranch: string) => `Merge into ${currentBranch} branch`,
        mergeInProgress: (currentBranch: string, sourceBranch: string) => `🔄 Merging: ${currentBranch} <- ${sourceBranch}...`,
        mergeResultTitle: '--- Merge Result ---',
        mergeConflictGuide: '❌ Merge conflict occurred. Please check conflict files, resolve manually, and commit.',
        mergeSuccess: (sourceBranch: string, currentBranch: string) => `✅ Merge successful! Changes from ${sourceBranch} have been integrated into ${currentBranch}.`,
        pushReminder: '💡 To reflect changes to remote repository, run "GitScope: ☁️ [PUSH] Push to Remote".',
        mergeSuccessNotification: (currentBranch: string, sourceBranch: string) => `✅ Merge successful! (${currentBranch} <- ${sourceBranch})`,

        // PullCommand
        pullStart: '🔄 Executing Git Pull (origin/current branch)...',
        pullSuccessWithChanges: (changes: number) => `🎉 Pull successful! ${changes} file(s) updated.`,
        pullSuccessUpToDate: '✅ Pull successful! Already up to date.',

        // PushCommand
        pushStart: '🔄 Executing Git Push (origin/current branch)...',
        pushSuccess: '🌟 Push successful! Local commits have been reflected to remote repository.',

        //RecommandAndCreateBranchCommand
        branchRecommendStart: '🌳 Starting Git branch name recommendation',
        cleanupPreviousStaging: '🧹 **Cleanup:** Reverting previously selected files to working directory...',
        cleanupComplete: '✅ Cleanup complete',
        cleanupError: (error: string) => `⚠️ Error during cleanup: ${error}`,
        manualBranchInput: '✨ Manually input new branch name',
        geminiBranchRecommend: '🤖 Get branch name recommendations from Gemini AI (3 options)',
        selectBranchCreationMethod: 'Please select branch creation method.',
        inputNewBranchName: 'Enter new branch name (e.g., feat/my-new-feature)',
        selectFilesForBranchName: 'Select files for branch name recommendation (multiple selection allowed)',
        filesSelectedCount: (count: number) => `✅ **${count} file(s)** selected.`,
        savingWorkScope: '💾 Saving current work scope',
        saveComplete: '✅ Save complete.',
        collectingGitDiff: '🔄 Collecting Git diff...',
        geminiThinkingBranchName: '🔄 Gemini is thinking about branch names...',
        geminiModeError: (error: string) => `⚠️ Error during Gemini mode execution: ${error}`,
        recommendedBranchLabel: (name: string) => `🤖 Recommended: ${name}`,
        selectRecommendedBranch: 'Please select one of the recommended branch names!',
        creatingBranch: (branchName: string) => `🔄 Creating branch: ${branchName}`,
        branchCreated: (branchName: string) => `✅ Branch **${branchName}** has been created.`,
        switchBranchButton: 'Switch',
        switchToNewBranchConfirm: (branchName: string) => `Would you like to switch to the newly created branch ${branchName}?`,
        branchSwitchComplete: (branchName: string) => `✅ Successfully switched to **${branchName}** branch.`,
        switchCancelled: 'ℹ️ Branch switch cancelled. Keeping current branch.',
        invalidBranchNameExit: '❌ Could not receive valid branch name, terminating command.',

        // SelectGeminiModelCommand
        selectModelStart: '🤖 Starting Gemini model selection',
        loadingModelList: '📋 Loading available Gemini model list...',
        currentModelInfo: (model: string) => `Currently selected model: ${model}`,
        selectModelTitle: 'Select the Gemini model to use',
        searchModelName: 'Search by model name',
        currentlySelected: '$(check) Currently selected',
        alreadySelectedModel: 'ℹ️ This model is already selected.',
        currentlyUsingModel: (modelName: string) => `Currently using ${modelName} model.`,
        paidModelWarning: (modelName: string) => `${modelName} cannot be used with a free API key.\n\nA paid plan is required.\n\nDo you want to continue?`,
        paidModelSelected: '⚠️ Paid model selected. Please ensure your API key has a paid plan configured.',
        changingModel: (modelName: string) => `🔄 Changing to ${modelName} model...`,
        modelChangeSuccess: (modelName: string) => `✅ Model change successful: ${modelName} has been selected.`,
        modelSelected: (modelName: string) => `✅ ${modelName} model has been selected.`,

        // ShowNavigator
        navigatorTitle: 'GitScope Navigator',
        navigatorAlreadyOpen: '🧭 GitScope Navigator is already open.',

        webviewLoadFailed: (path: string) => `[GitScope] Failed to load WebView HTML file: ${path}`,

        commandExecuteSuccess: '[GitScope] Command execution request succeeded',
        commandExecuteFailed: (error: string) => `[GitScope] Command execution failed.\nError: ${error}`,

        //StageAllCommand
        stageAllStart: 'Staging all changed files.',
        stageAllInProgress: '🔄 Staging all changes (including untracked files)...',
        stageAllSuccess: '✅ Staging completed.',

         welcome: {
            title: 'Welcome to GitScope!!!!!!!!',
            asciiArt: [
                ' ',
                '   /\\_/\\  ',
                '  ( o.o ) < Meow! Welcome to GitScope!!!!!!!!',
                '   > ^ <   ',
                '  /     \\  ',
                ' (_______) ',
                ' ',
            ],
            usageGuideTitle: '## 📚 Command Usage Guide',
            usageGuideDescription: '* Please refer to the following Notion documentation for all features and usage of **GitScope**.',
            usageGuideLink: 'https://sparkling-0902.notion.site/GitScope-Extension-Official-Manual-2cf6a40f9fff8147ac2be5308379e5ee?source=copy_link',
            notionLinkText: '[👉 Go to GitScope User Guide]',
            
            apiSecurityTitle: '## 🔑 Gemini API Key Security and Pricing Information',
            securityTitle: '### 🔒 Security Information',
            securityDescription1: '* Your Gemini API key is securely stored in **SecretStorage**.',
            securityDescription2: '* SecretStorage uses OS keychains and other secure storage, preventing access from outside the extension.',
            
            pricingTitle: '### 💸 Pricing Information',
            pricingDescription1: '* This extension uses **your Gemini API key** to call the model.',
            pricingDescription2: '* Therefore, API call charges incurred by using GitScope are **billed to you**.',
        },
    },

    errors: {
        apiKeyInvalid: 'API key error or insufficient permissions. Please verify and reconfigure your key.',
        missingApiKey: 'Gemini API key is not configured.',
        quotaExceeded: 'Quota exceeded (HTTP 429). Please check Google AI Studio.',
        apiCommunication: 'An unexpected API error occurred.',
        networkError: 'Network error: Please check your internet connection.',
        parseFailed: 'Unable to parse Gemini response data.',
        invalidDiff: 'Diff value is empty.',
        createBranchFailed: 'Failed to recommend and create branch',
        checkoutBranchFailed: 'Failed to switch branch',
        noLocalBranchToCheckout: 'No local branches available to switch to.',
        noLocalBranchToDelete: 'No other local branches available to delete.',
        noLocalBranchToMerge: 'No other local branches available to merge.',
        geminiBranchRecommandationFailed: 'Gemini failed to recommend valid branch names 😥 Please enter manually!',
        deleteBranchFailed: 'Failed to delete branch',
        cloneRepositoryFailed: 'Git clone failed',
        noWorkSpace: 'No folder is currently open. Please select a parent directory for cloning.',
        commitFailed: 'Git commit failed',
        generateCommitMessageFailed: 'Failed to generate commit message',
        commitMessageNotFound: 'Clipboard is empty or no commit message found.',
        noModifiedCode: 'No changes detected.',
        emptyDiff: 'No valid changes found.',
        mergeConflict: 'Merge conflict occurred.',
        mergeFailed: 'Git merge failed',
        pullFailed: 'Git pull failed',
        pushFailed: 'Git push failed',
        stageAllFailed: 'Failed to stage all changes',
        recommendationFailed: 'Gemini recommendation execution failed',
        tagCommandFailed: 'Failed to create tag and push',
        selectGeminiModelFailed: 'Failed to select Gemini model',
        webviewLoadFailed: 'Failed to load WebView.',
    },
    
    models: {
        flashLite: 'Gemini 2.5 Flash-Lite (Free)',
        flashLiteDesc: 'Lightweight model optimized for high-volume processing with fast response time',
        flash25: 'Gemini 2.5 Flash (Free) (Recommended)',
        flash25Desc: 'Balanced speed and quality, optimal for general commit message generation',
        flash20: 'Gemini 2.0 Flash (Free)',
        flash20Desc: 'Stable general-purpose model, cost-effective',
        pro25: 'Gemini 2.5 Pro (Paid)',
        pro25Desc: 'Complex code analysis and detailed commit messages with high accuracy',
        pro3: 'Gemini 3 Pro (Paid)',
        pro3Desc: 'Latest highest-performance model, optimal for complex coding tasks',
    },

    prompts: {
        commitMessage: (diff: string, currentBranch: string) => `
            You are a Git expert.
            Generate a commit message based on the following git diff.
            
            **[VERY IMPORTANT: Message Format Rules]**
            1. The message must consist of a **Subject line** and **Body**, with **one blank line between them**.
            2. The **Subject line (first line)** must be **within 50 characters**.
            3. Please separate the main body into sentences and distinguish each separated sentence with a hyphen in front.
            ${(currentBranch.startsWith('hotfix') || currentBranch.startsWith('release'))
                ? `
                    **[Special Branch Rules]**
                    The current branch name (${currentBranch}) starts with 'hotfix' or 'release'.
                    **The subject line must start with the full branch name as a prefix**.
                    Example 1) Branch: 'hotfix/v1.0.1' → Commit: **"Hotfix/v1.0.1: ~~"**
                    Example 2) Branch: 'release/v2.5.0' → Commit: **"Release/v2.5.0: ~~"**
                `
                :
                `
                    **[General Branch Rules]**
                    Refer to the current branch name (${currentBranch}).
                    The subject line must follow **Conventional Commit format** like "Feat: ~~", "Fix: ~~" with the first letter capitalized.
                `
            }
            
            Write the body in English.
            diff: ${diff}
        `,

        branchNames: (diff: string, count: number) => `
            You are a Git expert. Recommend ${count} branch names based on the following git diff.

            **Branch names must start with an appropriate prefix from: \`feat/\`, \`fix/\`, \`refactor/\`, \`docs/\`, \`style/\`, \`chore/\`, \`test/\`.**

            Return format:
            Output ${count} branch names separated **only by commas (,)**. Do not include any other sentences or explanations.
            diff: ${diff}
        `
    },

    navigator: {
        //flows
        flows: {
            common: {
                title: '⚙️ Essential GitScope Setup',
                description: 'Mandatory steps required before starting any Git strategy.',
            },
            single: {
                title: '🌳 Single Branch (Main/Master-based)',
                description: 'All work is performed on a single branch (typically `main` or `master`). Ideal for simple projects and rapid deployment.',
                tags: ['#Solo Dev', '#ToyProject', '#FastDeployment'],
                branches: [
                    { name: '`main` or `master`', description: 'The sole branch where all work happens. Used for production deployment.' }
                ],
            },
            github: {
                title: "🐙 GitHub Flow",
                description: "Work in short-lived topic branches and integrate into the `main` branch via Pull Requests. Excellent for simple, continuous deployment.",
                tags: ['#SmallTeam', '#2-5 People', '#MostPopular', '#PullRequest', '#CodeReview', '#Simplicity'],
                branches: [
                    { name: "`main`", description: "The main branch that always maintains stable, deployable code. All topic branches are merged here." },
                    { name: "`feature/*`, `fix/*`, `refactor/*`, ...", description: "Short-lived branches for new features, bug fixes, or refactoring. Merged into `main` via Pull Request upon completion." }
                ],
            },
            gitlab: {
                title: "🧪 GitLab Flow",
                description: "Uses integration and environment-specific branches (e.g. `pre-production`, `production`), integrated via Merge Requests (MR). Best for CI/CD pipeline integration.",
                tags: ['#MidSize', '#5-20 People', '#CICD', '#Intuitive'],
                branches: [
                    { name: "`main`", description: "Maintains the latest stable code and serves as the development branch." },
                    { name: "`feature/*`", description: "Branches for feature development or bug fixes. Merged into `main` via MR after work is finished." },
                    { name: "`pre-production` (Optional)", description: "Environment branch for final testing before production deployment." },
                    { name: "`production` (Optional)", description: "The production environment branch serving live users." }
                ],
            },
            gitflow: {
                title: "🌊 Git Flow (Vincent Driessen Model)",
                description: "Uses two main branches (`master`/`main` and `develop`) along with `feature`, `release`, and `hotfix` branches to manage complex but stable release cycles.",
                tags: ['#LargeScale','#20+ People', '#StableRelease', '#ComplexDeployment', '#MultiVersionSupport'],
                branches: [
                    { name: "`master` or `main`", description: "Contains the code currently deployed in production. Uses tags to track release versions." },
                    { name: "`develop`", description: "The integration branch for the next release. All feature branches are merged here." },
                    { name: "`feature/*`", description: "Branches branched from `develop` to develop new features." },
                    { name: "`release/*`", description: "Branches branched from `develop` to prepare for a new production release." },
                    { name: "`hotfix/*`", description: "Branches branched from `master` to quickly address critical bugs in the production environment." }
                ],
            },
        },
        
        steps: {
            startGuide: 'GitScope User Guide',
            configKey: 'Configure Gemini API Key (Required)',
            selectGeminiModel: 'Select Gemini Model',
            clone: 'Clone Remote Repository (Required)',
            pull: 'Pull Latest Changes',
            pullMain: 'Pull from Main',
            pullDevelop: 'Pull from Develop',
            develop: 'Code Development & Changes',
            stageAll: 'Stage All Changes',
            generateMessage: 'Generate Commit Message (AI)',
            commit: 'Commit Changes',
            push: 'Push to Remote',
            pushToQAServer: 'Push to QA Server',
            pushToProductionServer: 'Push to Production Server',
            createBranchAI: 'Create/Switch Branch (AI)',
            createBranchManual: 'Create/Switch Branch (Manual)',
            checkoutBranch: 'Switch Branch',
            checkoutToMain: 'Checkout to Main',
            checkoutToPreProduction: 'Checkout to "pre-production"',
            checkoutToProduction: ' Checkout to "production"',
            checkoutToDevelop: 'Checkout to Develop',
            mergeMain: 'Merge Main',
            mergeDevelop: 'Merge Develop',
            mergePreProduction: 'Merge "pre-production"',
            mergeRelease: 'Merge "release/[version]"',
            mergeHotfix: 'Merge "hotfix/[version]"',
            deleteLocalBranch: 'Delete Local Branch',
            deleteReleaseBranch: 'Delete "release/[version]"',
            deleteHotfixBranch: 'Delete "hotfix/[version]"',
            createTagAndPush: 'Tag Main branch',
            prReviewMain: 'PR Review → Merge to Main',
            prReviewDevelop: 'PR Review → Merge to Develop',
            qaTest: 'QA Testing',
            releaseBugfix: 'Release Bug Fix',
            hotfixBugfix: 'Critical Hotfix',
        },
        
        accordions: {
            initialSetup: '⚙️ Initial Setup (One-time)',
            featureDevelopment: '💻 Feature Development & Integration',
            preProductionDeploy: '👀 Pre-production Deployment (Testing)',
            productionDeploy: '🌟 Production Deployment (Release)',
            releaseDeploy: '🚀 Release Preparation (Testing)',
            hotfixDeploy: '🔥 Emergency Hotfix',
        },
        
        ui: {
            indexTitle: '🚀 GitScope Navigator',
            indexDescription: 'Configure your workflow based on the selected strategy and execute commands in sequence!',

            tabCommon: 'Essential Setup',
            tabSingle: 'Single Branch',
            tabGitHub: 'GitHub Flow',
            tabGitLab: 'GitLab Flow',
            tabGitFlow: 'Git Flow',

            branchSummaryTitle: 'Key Branch Overview',
            branchSummarySuffix: '(Click to view)',
            accordionSummarySuffix: '(Click to expand)',
            actionRun: 'Run',
            actionNoop: 'Guide',
            actionCompleted: 'Completed',
        },
        
        noopMessages: {
            develop: 'This step involves "directly modifying code and file systems" within VS Code.\nThis button does not execute Git commands.',
            prReview: 'This step involves "review and approval from peers" on web platforms like GitHub or GitLab.\nThis button does not execute Git commands.',
            qaTest: 'This step is for "testers or QA teams to verify quality and functionality" on the pre-production environment.\nProceed to the next step once QA is complete.',
            releaseBugfix: 'This step is for "final bug fixes and documentation updates" to stabilize the release branch (`release/*`).\nAfter fixing, execute the next Git command.',
            hotfixBugfix: 'This step involves "directly fixing urgent production bugs" in the hotfix branch (`hotfix/*`).\nAfter fixing, execute the next Git command.',
            default: 'This step provides guidance for manual tasks and does not execute Git commands.',
        },
    },
};