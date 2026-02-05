import { ITranslations } from '../i18n';

export const ja: ITranslations = {
    
    messages: {
        // Common - 共通メッセージ
        cancelled: '❌ キャンセルしました。',

        // Common Buttons - 共通ボタン
        continueButton: '続ける',
        cancelButton: 'キャンセル',
        deleteButton: '削除',
        confirmButton: '確認',
        
        // CheckoutBranchCommand
        branchSwitchStart: '🔄 Gitブランチの切り替えを開始します',
        fetchingBranches: '🔄 ローカルブランチリストを取得中...',
        currentBranchLabel: '現在のブランチ',
        selectBranchToSwitch: '切り替えるブランチを選択してください',
        searchBranchName: 'ブランチ名を検索',
        switchingToBranch: (branch: string) => `🔄 ブランチ ${branch} に切り替え中...`,
        branchSwitchSuccess: (branch: string) => `✅ ブランチの切り替えに成功しました。'${branch}' に切り替わりました。`,

        // CloneCommand
        cloneStart: '🔗 Gitクローンを実行します',
        enterRemoteUrl: 'クローンするリモートリポジトリのURLを入力してください（SSHまたはHTTPSアドレス）',
        enterLocalFolder: (root: string) => `リポジトリのクローンパスを入力してください。（親フォルダ ${root}）`,
        cloneProgress: (url: string, path: string) => `🔄 クローン開始: ${url} → ${path}`,
        cloneSuccess: (path: string) => `🎉 クローン成功！プロジェクトが ${path} に作成されました。`,
        openFolderRecommendation: '🌟 作業を開始するには、VS Codeでフォルダを開いてください。',
        cloneCompletedAskOpen: (folder: string) => `🎉 クローンが正常に完了しました。\nクローンしたフォルダ ${folder} を新しいウィンドウで開きますか？`,
        openInNewWindow: '新しいウィンドウで開く',
        openingFolder: (folder: string) => `📁 フォルダ ${folder} を新しいウィンドウで開いています...`,
        openFolderWarning: (folder: string) =>
            `❗️ クローンしたリポジトリ ${folder} を使用するには、\nGitコマンドが正しく動作するように「新しくクローンしたフォルダ」をVS Codeで開く必要があります。`,

        // CommitCommand
        commitStart: '🚀 コミットを開始します',
        readClipboard: '📋 クリップボードからコミットメッセージを読み込み中...',
        clipboardGuide: '💡 まず「Git Scope: 🪶 [コミット] コミットメッセージを生成」を実行してメッセージをコピーしてください。',
        emptyCommitMessage: '⚠️ メッセージが空です。',
        commitInProgress: (msg: string) => `🚀 Gitコミット中: "${msg.substring(0, 50)}..."`,
        commitSuccess: '🎉 コミット成功！',
        commitProceed: (msg: string) => `✅ このコミットメッセージで続行します: ${msg.substring(0, 50)}...`,
        commitEdit: '✏️ メッセージを編集してコミット',
        commitConfirmPlaceholder: 'このコミットメッセージで続行しますか？',
        commitEditPrompt: '最終的なコミットメッセージを入力してください。',

        // CreateTagAndPushCommand
        tagStart: '🏷️ Gitタグの作成とプッシュを開始します',
        nonMainBranchConfirm: (branch: string) =>
            `ブランチ '${branch}' にタグを作成しようとしています。続行しますか？`,
        currentBranch: (branch: string) => `現在のブランチ: ${branch}`,
        tagNameTitle: 'タグ名を入力',
        tagNamePlaceholder: 'タグ名',
        tagNamePrompt: 'SemVer仕様に従ったタグ名を入力してください（例: v1.0.0）',
        tagNameRequired: 'タグ名は必須です。',
        tagMessageTitle: (tag: string) => `タグ '${tag}' のメッセージを入力（オプション）`,
        tagMessagePlaceholder: 'タグメッセージ（オプション）Enterキーを押す',
        tagMessagePrompt: 'タグメッセージはリリースノートで使用されます。',
        createLocalTag: (tag: string) => `🏷️ ローカルタグ '${tag}' を作成中...`,
        createLocalTagSuccess: (tag: string) => `✅ ローカルタグの作成に成功しました: ${tag}`,
        pushTag: (tag: string) => `☁️ タグ '${tag}' をリモートリポジトリにプッシュ中...`,
        pushTagSuccess: (tag: string) => `🎉 リモートタグのプッシュに成功しました: タグ '${tag}' がリモートにプッシュされました。`,

        // DeleteLocalBranchCommand
        deleteLocalBranchStart: '🗑️ ローカルブランチの削除を開始します',
        quickPickTitle: '削除するローカルブランチを選択してください',
        quickPickPlaceholder: 'ブランチ名を検索',
        quickPickDescription: 'このブランチをローカルで削除します。',
        deleteConfirmMessage: (branch: string) =>
            `ローカルブランチ '${branch}' を削除してもよろしいですか？\n（マージされていないコミットは失われる可能性があります）`,
        deletingBranch: (branch: string) => `🔄 ローカルブランチ '${branch}' を削除中...`,
        deleteSuccess: (branch: string) => `🎉 ローカルブランチ '${branch}' が正常に削除されました。`,

        // GeminiAPICommand
        configKeyStart: '🔑 Gemini APIキーの設定を開始します',
        useExistingKey: '✅ 保存されたAPIキーを使用します。',
        reRunGuide: '再設定する場合は、このコマンドを再度実行してください。',
        inputKeyPrompt: 'Gemini APIキーを入力してください（必須）',
        savingKey: '🔄 APIキーを保存中...',
        saveKeySuccess: '✅ Gemini APIキーが正常に保存されました！',

        // GenerateCommitMessageCommand
        generateCommitMsgStart: '🪶 コミットメッセージの推薦を開始します',
        stagedFilesInfo: (count: number) => `ℹ️ ステージされたファイルが ${count} 個あります。`,
        reuseConfirmTitle: '以前にステージしたファイルで続行しますか？',
        reuseConfirmPlaceholder: 'オプションを選択してください',
        reuseSaved: (count: number) => `✅ 既存の **${count} ファイル** で続行します。`,
        checkingModifiedFiles: '🔄 変更されたファイルリストを確認中...',
        selectingFilesTitle: 'コミットメッセージ推薦用のファイルを選択してください（複数選択可）',
        stagingSelectedFiles: '🔄 選択したファイルを **ステージ** 中...',
        stagingComplete: '✅ ステージ完了。',
        stagingSummary: (count: number) => `✅ **${count} ファイル** が選択されステージされました。`,
        requestGemini: '🤖 Geminiにコミットメッセージの推薦をリクエスト中...',
        resultTitle: '💡 推薦されたコミットメッセージ:',
        clipboardCopied: '📋 クリップボードにコピーしました！',
        nextStepGuide: '🚀 コミットを実行するには、コマンドパレットから「GitScope: 🚀 [コミット] 変更をコミット」を実行してください。',
        reuseLabel: (count: number, files: string[]) =>
            `✅ 以前にステージした ${count} ファイルで続行  (${files.join(', ')})`,
        reuseFresh: '🔄 新しいファイルを選択',
        deletedFileDescription: '⚠️ 変更または削除 • 現在のディレクトリにありません',

        // MergeCommand
        mergeStart: '🔀 Gitマージを開始します',
        fetchingMergeBranches: '🔄 マージ用のローカルブランチリストを取得中...',
        selectBranchToMerge: (currentBranch: string) => `[${currentBranch}] にマージするブランチを選択してください`,
        mergeIntoBranch: (currentBranch: string) => `${currentBranch} ブランチにマージ`,
        mergeInProgress: (currentBranch: string, sourceBranch: string) => `🔄 マージ中: ${currentBranch} <- ${sourceBranch}...`,
        mergeResultTitle: '--- マージ結果 ---',
        mergeConflictGuide: '❌ マージコンフリクトが発生しました。コンフリクトファイルを確認し、手動で解決してコミットしてください。',
        mergeSuccess: (sourceBranch: string, currentBranch: string) => `✅ マージ成功！${sourceBranch} からの変更が ${currentBranch} に統合されました。`,
        pushReminder: '💡 リモートリポジトリに変更を反映するには、「GitScope: ☁️ [プッシュ] リモートにプッシュ」を実行してください。',
        mergeSuccessNotification: (currentBranch: string, sourceBranch: string) => `✅ マージ成功！(${currentBranch} <- ${sourceBranch})`,

        // PullCommand
        pullStart: '🔄 Gitプルを実行中（origin/現在のブランチ）...',
        pullSuccessWithChanges: (changes: number) => `🎉 プル成功！${changes} ファイルが更新されました。`,
        pullSuccessUpToDate: '✅ プル成功！既に最新の状態です。',

        // PushCommand
        pushStart: '🔄 Gitプッシュを実行中（origin/現在のブランチ）...',
        pushSuccess: '🌟 プッシュ成功！ローカルコミットがリモートリポジトリに反映されました。',

        //RecommandAndCreateBranchCommand
        branchRecommendStart: '🌳 Gitブランチ名の推薦を開始します',
        cleanupPreviousStaging: '🧹 **クリーンアップ:** 以前に選択したファイルをワーキングディレクトリに戻しています...',
        cleanupComplete: '✅ クリーンアップ完了',
        cleanupError: (error: string) => `⚠️ クリーンアップ中のエラー: ${error}`,
        manualBranchInput: '✨ 新しいブランチ名を手動入力',
        geminiBranchRecommend: '🤖 Gemini AIからブランチ名の推薦を取得（3つのオプション）',
        selectBranchCreationMethod: 'ブランチ作成方法を選択してください。',
        inputNewBranchName: '新しいブランチ名を入力してください（例: feat/my-new-feature）',
        selectFilesForBranchName: 'ブランチ名推薦用のファイルを選択してください（複数選択可）',
        filesSelectedCount: (count: number) => `✅ **${count} ファイル** が選択されました。`,
        savingWorkScope: '💾 現在の作業範囲を保存中',
        saveComplete: '✅ 保存完了。',
        collectingGitDiff: '🔄 Git diffを収集中...',
        geminiThinkingBranchName: '🔄 Geminiがブランチ名を考えています...',
        geminiModeError: (error: string) => `⚠️ Geminiモード実行中のエラー: ${error}`,
        recommendedBranchLabel: (name: string) => `🤖 推薦: ${name}`,
        selectRecommendedBranch: '推薦されたブランチ名の1つを選択してください！',
        creatingBranch: (branchName: string) => `🔄 ブランチを作成中: ${branchName}`,
        branchCreated: (branchName: string) => `✅ ブランチ **${branchName}** が作成されました。`,
        switchBranchButton: '切り替え',
        switchToNewBranchConfirm: (branchName: string) => `新しく作成されたブランチ ${branchName} に切り替えますか？`,
        branchSwitchComplete: (branchName: string) => `✅ **${branchName}** ブランチへの切り替えに成功しました。`,
        switchCancelled: 'ℹ️ ブランチの切り替えがキャンセルされました。現在のブランチを維持します。',
        invalidBranchNameExit: '❌ 有効なブランチ名を受け取れなかったため、コマンドを終了します。',

        // SelectGeminiModelCommand
        selectModelStart: '🤖 Geminiモデルの選択を開始します',
        loadingModelList: '📋 利用可能なGeminiモデルリストを読み込み中...',
        currentModelInfo: (model: string) => `現在選択されているモデル: ${model}`,
        selectModelTitle: '使用するGeminiモデルを選択してください',
        searchModelName: 'モデル名で検索',
        currentlySelected: '$(check) 現在選択中',
        alreadySelectedModel: 'ℹ️ このモデルは既に選択されています。',
        currentlyUsingModel: (modelName: string) => `現在 ${modelName} モデルを使用しています。`,
        paidModelWarning: (modelName: string) => `${modelName} は無料のAPIキーでは使用できません。\n\n有料プランが必要です。\n\n続行しますか？`,
        paidModelSelected: '⚠️ 有料モデルが選択されました。APIキーに有料プランが設定されていることを確認してください。',
        changingModel: (modelName: string) => `🔄 ${modelName} モデルに変更中...`,
        modelChangeSuccess: (modelName: string) => `✅ モデル変更成功: ${modelName} が選択されました。`,
        modelSelected: (modelName: string) => `✅ ${modelName} モデルが選択されました。`,

        // ShowNavigator
        navigatorTitle: 'GitScopeナビゲーター',
        navigatorAlreadyOpen: '🧭 GitScopeナビゲーターは既に開いています。',

        webviewLoadFailed: (path: string) => `[GitScope] WebView HTMLファイルの読み込みに失敗しました: ${path}`,

        commandExecuteSuccess: '[GitScope] コマンド実行リクエストが成功しました',
        commandExecuteFailed: (error: string) => `[GitScope] コマンド実行に失敗しました。\nエラー: ${error}`,

        //StageAllCommand
        stageAllStart: 'すべての変更ファイルをステージします。',
        stageAllInProgress: '🔄 すべての変更をステージ中（未追跡ファイルを含む）...',
        stageAllSuccess: '✅ ステージ完了。',

         welcome: {
            title: 'GitScopeへようこそ！！！！！',
            asciiArt: [
                ' ',
                '   /\\_/\\  ',
                '  ( o.o ) < ニャー！GitScopeへようこそ！！！！！',
                '   > ^ <   ',
                '  /     \\  ',
                ' (_______) ',
                ' ',
            ],
            usageGuideTitle: '## 📚 コマンド使用ガイド',
            usageGuideDescription: '* **GitScope** のすべての機能と使用方法については、以下のNotion文書を参照してください。',
            usageGuideLink: 'https://sparkling-0902.notion.site/GitScope-Extension-Official-Manual-2cf6a40f9fff8147ac2be5308379e5ee?source=copy_link',
            notionLinkText: '[👉 GitScopeユーザーガイドへ]',
            
            apiSecurityTitle: '## 🔑 Gemini APIキーのセキュリティと料金情報',
            securityTitle: '### 🔒 セキュリティ情報',
            securityDescription1: '* お客様のGemini APIキーは **SecretStorage** に安全に保存されます。',
            securityDescription2: '* SecretStorageはOSのキーチェーンなどの安全なストレージを使用し、拡張機能外部からのアクセスを防ぎます。',
            
            pricingTitle: '### 💸 料金情報',
            pricingDescription1: '* この拡張機能は **お客様のGemini APIキー** を使用してモデルを呼び出します。',
            pricingDescription2: '* したがって、GitScopeの使用により発生するAPI呼び出し料金は **お客様に請求されます**。',
        },
    },

    errors: {
        apiKeyInvalid: 'APIキーエラーまたは権限不足です。キーを確認して再設定してください。',
        missingApiKey: 'Gemini APIキーが設定されていません。',
        quotaExceeded: 'クォータ超過（HTTP 429）。Google AI Studioを確認してください。',
        apiCommunication: '予期しないAPIエラーが発生しました。',
        networkError: 'ネットワークエラー: インターネット接続を確認してください。',
        parseFailed: 'Geminiレスポンスデータの解析ができません。',
        invalidDiff: 'Diff値が空です。',
        createBranchFailed: 'ブランチの推薦と作成に失敗しました',
        checkoutBranchFailed: 'ブランチの切り替えに失敗しました',
        noLocalBranchToCheckout: '切り替え可能なローカルブランチがありません。',
        noLocalBranchToDelete: '削除可能な他のローカルブランチがありません。',
        noLocalBranchToMerge: 'マージ可能な他のローカルブランチがありません。',
        geminiBranchRecommandationFailed: 'Geminiが有効なブランチ名を推薦できませんでした 😥 手動で入力してください！',
        deleteBranchFailed: 'ブランチの削除に失敗しました',
        cloneRepositoryFailed: 'Gitクローンに失敗しました',
        noWorkSpace: '現在開いているフォルダがありません。クローン用の親ディレクトリを選択してください。',
        commitFailed: 'Gitコミットに失敗しました',
        generateCommitMessageFailed: 'コミットメッセージの生成に失敗しました',
        commitMessageNotFound: 'クリップボードが空であるか、コミットメッセージが見つかりません。',
        noModifiedCode: '変更が検出されませんでした。',
        emptyDiff: '有効な変更が見つかりませんでした。',
        mergeConflict: 'マージコンフリクトが発生しました。',
        mergeFailed: 'Gitマージに失敗しました',
        pullFailed: 'Gitプルに失敗しました',
        pushFailed: 'Gitプッシュに失敗しました',
        stageAllFailed: 'すべての変更のステージに失敗しました',
        recommendationFailed: 'Gemini推薦の実行に失敗しました',
        tagCommandFailed: 'タグの作成とプッシュに失敗しました',
        selectGeminiModelFailed: 'Geminiモデルの選択に失敗しました',
        webviewLoadFailed: 'WebViewの読み込みに失敗しました。',
    },
    
    models: {
        flashLite: 'Gemini 2.5 Flash-Lite（無料）',
        flashLiteDesc: '高速レスポンスで大量処理に最適化された軽量モデル',
        flash25: 'Gemini 2.5 Flash（無料）（推奨）',
        flash25Desc: '速度と品質のバランスが取れた、一般的なコミットメッセージ生成に最適',
        flash20: 'Gemini 2.0 Flash（無料）',
        flash20Desc: '安定した汎用モデル、コスト効率的',
        pro25: 'Gemini 2.5 Pro（有料）',
        pro25Desc: '複雑なコード分析と詳細なコミットメッセージを高精度で生成',
        pro3: 'Gemini 3 Pro（有料）',
        pro3Desc: '最新の最高性能モデル、複雑なコーディングタスクに最適',
    },

    prompts: {
        commitMessage: (diff: string, currentBranch: string) => `
            あなたはGitの専門家です。
            以下のgit diffに基づいてコミットメッセージを生成してください。
            
            **[非常に重要: メッセージフォーマットルール]**
            1. メッセージは **件名行** と **本文** で構成され、**その間に1行の空行** が必要です。
            2. **件名行（1行目）** は **50文字以内** である必要があります。
            3. 本文は文章ごとに区切り、区切られた各文の前にハイフンを付けて区別してください。
            ${(currentBranch.startsWith('hotfix') || currentBranch.startsWith('release'))
                ? `
                    **[特別なブランチルール]**
                    現在のブランチ名（${currentBranch}）は'hotfix'または'release'で始まります。
                    **件名行は完全なブランチ名をプレフィックスとして開始する必要があります**。
                    例1）ブランチ: 'hotfix/v1.0.1' → コミット: **"Hotfix/v1.0.1: ~~"**
                    例2）ブランチ: 'release/v2.5.0' → コミット: **"Release/v2.5.0: ~~"**
                `
                :
                `
                    **[一般的なブランチルール]**
                    現在のブランチ名（${currentBranch}）を参照してください。
                    件名行は **Conventional Commitフォーマット** に従い、"Feat: ~~"、"Fix: ~~"のように最初の文字を大文字にしてください。
                `
            }
            
            本文は英語で記述してください。
            diff: ${diff}
        `,

        branchNames: (diff: string, count: number) => `
            あなたはGitの専門家です。以下のgit diffに基づいて ${count} 個のブランチ名を推薦してください。

            **ブランチ名は次の適切なプレフィックスで始まる必要があります: \`feat/\`、\`fix/\`、\`refactor/\`、\`docs/\`、\`style/\`、\`chore/\`、\`test/\`。**

            戻り値のフォーマット:
            ${count} 個のブランチ名を **カンマ（,）のみ** で区切って出力してください。他の文章や説明は含めないでください。
            diff: ${diff}
        `
    },

    navigator: {
        //flows
        flows: {
            common: {
                title: '⚙️ GitScope必須セットアップ',
                description: 'すべてのGit戦略を開始する前に必要な必須ステップ。',
            },
            single: {
                title: '🌳 シングルブランチ（Main/Masterベース）',
                description: 'すべての作業を単一のブランチ（通常は `main` または `master`）で実行します。シンプルなプロジェクトと迅速なデプロイに最適です。',
                tags: ['#ソロ開発', '#トイプロジェクト', '#高速デプロイ'],
                branches: [
                    { name: '`main` または `master`', description: 'すべての作業が行われる唯一のブランチ。本番環境のデプロイに使用されます。' }
                ],
            },
            github: {
                title: "🐙 GitHub Flow",
                description: "短期間のトピックブランチで作業し、プルリクエストを通じて `main` ブランチに統合します。シンプルで継続的なデプロイに最適です。",
                tags: ['#小規模チーム', '#2-5人', '#最も人気', '#プルリクエスト', '#コードレビュー', '#シンプル'],
                branches: [
                    { name: "`main`", description: "常に安定したデプロイ可能なコードを維持するメインブランチ。すべてのトピックブランチはここにマージされます。" },
                    { name: "`feature/*`、`fix/*`、`refactor/*`、...", description: "新機能、バグ修正、リファクタリング用の短期ブランチ。完了後、プルリクエストを通じて `main` にマージされます。" }
                ],
            },
            gitlab: {
                title: "🧪 GitLab Flow",
                description: "統合およびエンバイロンメント固有のブランチ（例: `pre-production`、`production`）を使用し、マージリクエスト（MR）を通じて統合します。CI/CDパイプライン統合に最適です。",
                tags: ['#中規模', '#5-20人', '#CICD', '#直感的'],
                branches: [
                    { name: "`main`", description: "最新の安定したコードを維持し、開発ブランチとして機能します。" },
                    { name: "`feature/*`", description: "機能開発やバグ修正用のブランチ。作業完了後、MRを通じて `main` にマージされます。" },
                    { name: "`pre-production`（オプション）", description: "本番環境デプロイ前の最終テスト用のエンバイロンメントブランチ。" },
                    { name: "`production`（オプション）", description: "実ユーザーにサービスを提供する本番環境ブランチ。" }
                ],
            },
            gitflow: {
                title: "🌊 Git Flow（Vincent Driessenモデル）",
                description: "2つのメインブランチ（`master`/`main` と `develop`）と `feature`、`release`、`hotfix` ブランチを使用して、複雑だが安定したリリースサイクルを管理します。",
                tags: ['#大規模','#20人以上', '#安定リリース', '#複雑なデプロイ', '#複数バージョンサポート'],
                branches: [
                    { name: "`master` または `main`", description: "現在本番環境にデプロイされているコードが含まれます。タグを使用してリリースバージョンを追跡します。" },
                    { name: "`develop`", description: "次のリリース用の統合ブランチ。すべての機能ブランチはここにマージされます。" },
                    { name: "`feature/*`", description: "`develop` から分岐して新機能を開発するブランチ。" },
                    { name: "`release/*`", description: "`develop` から分岐して新しい本番リリースを準備するブランチ。" },
                    { name: "`hotfix/*`", description: "`master` から分岐して本番環境の重大なバグを迅速に対処するブランチ。" }
                ],
            },
        },
        
        steps: {
            startGuide: 'GitScopeユーザーガイド',
            configKey: 'Gemini APIキーを設定（必須）',
            selectGeminiModel: 'Geminiモデルを選択',
            clone: 'リモートリポジトリをクローン（必須）',
            pull: '最新の変更を取得',
            pullMain: 'Mainから取得',
            pullDevelop: 'Developから取得',
            develop: 'コード開発と変更',
            stageAll: 'すべての変更をステージ',
            generateMessage: 'コミットメッセージを生成（AI）',
            commit: '変更をコミット',
            push: 'リモートにプッシュ',
            pushToQAServer: 'QAサーバーにプッシュ',
            pushToProductionServer: '本番サーバーにプッシュ',
            createBranchAI: 'ブランチを作成/切り替え（AI）',
            createBranchManual: 'ブランチを作成/切り替え（手動）',
            checkoutBranch: 'ブランチを切り替え',
            checkoutToMain: 'Mainにチェックアウト',
            checkoutToPreProduction: '"pre-production"にチェックアウト',
            checkoutToProduction: '"production"にチェックアウト',
            checkoutToDevelop: 'Developにチェックアウト',
            mergeMain: 'Mainをマージ',
            mergeDevelop: 'Developをマージ',
            mergePreProduction: '"pre-production"をマージ',
            mergeRelease: '"release/[version]"をマージ',
            mergeHotfix: '"hotfix/[version]"をマージ',
            deleteLocalBranch: 'ローカルブランチを削除',
            deleteReleaseBranch: '"release/[version]"を削除',
            deleteHotfixBranch: '"hotfix/[version]"を削除',
            createTagAndPush: 'Mainブランチにタグ付け',
            prReviewMain: 'PRレビュー → Mainにマージ',
            prReviewDevelop: 'PRレビュー → Developにマージ',
            qaTest: 'QAテスト',
            releaseBugfix: 'リリースバグ修正',
            hotfixBugfix: '緊急ホットフィックス',
        },
        
        accordions: {
            initialSetup: '⚙️ 初期セットアップ（1回のみ）',
            featureDevelopment: '💻 機能開発と統合',
            preProductionDeploy: '👀 プレプロダクションデプロイ（テスト）',
            productionDeploy: '🌟 本番デプロイ（リリース）',
            releaseDeploy: '🚀 リリース準備（テスト）',
            hotfixDeploy: '🔥 緊急ホットフィックス',
        },
        
        ui: {
            indexTitle: '🚀 GitScopeナビゲーター',
            indexDescription: '選択した戦略に基づいてワークフローを設定し、順番にコマンドを実行しましょう！',

            tabCommon: '必須セットアップ',
            tabSingle: 'シングルブランチ',
            tabGitHub: 'GitHub Flow',
            tabGitLab: 'GitLab Flow',
            tabGitFlow: 'Git Flow',

            branchSummaryTitle: '主要ブランチ概要',
            branchSummarySuffix: '（クリックして表示）',
            accordionSummarySuffix: '（クリックして展開）',
            actionRun: '実行',
            actionNoop: 'ガイド',
            actionCompleted: '完了',
        },
        
        noopMessages: {
            develop: 'このステップはVS Code内で「コードとファイルシステムを直接変更する」作業です。\nこのボタンはGitコマンドを実行しません。',
            prReview: 'このステップはGitHubやGitLabなどのWebプラットフォームでの「同僚によるレビューと承認」作業です。\nこのボタンはGitコマンドを実行しません。',
            qaTest: 'このステップは、プレプロダクション環境で「テスターまたはQAチームが品質と機能を検証する」作業です。\nQA完了後、次のステップに進んでください。',
            releaseBugfix: 'このステップは、リリースブランチ（`release/*`）を安定させるための「最終的なバグ修正とドキュメント更新」作業です。\n修正後、次のGitコマンドを実行してください。',
            hotfixBugfix: 'このステップは、ホットフィックスブランチ（`hotfix/*`）で「緊急の本番バグを直接修正する」作業です。\n修正後、次のGitコマンドを実行してください。',
            default: 'このステップは手動タスクのガイダンスを提供し、Gitコマンドは実行しません。',
        },
    },
};