export const PROMPTS = {
    commitMessage: (diff: string, currentBranch: string) => `
        너는 Git 전문가야.
        다음 git diff를 기반으로 커밋 메시지를 작성해줘.
        **[매우 중요: 메시지 형식 규칙]**
        1. 메시지는 **제목 줄(Subject)**과 **본문(Body)**으로 구성해야 하며, **반드시 둘 사이에 빈 줄을 하나 포함**해야 해.
        2. **제목 줄(첫 번째 줄)**은 **50자 이내**로 작성해줘.
        ${(currentBranch.startsWith('hotfix') || currentBranch.startsWith('release'))
            ? `
                **[특수 브랜치 규칙 적용]**
                현재 브랜치 이름(${currentBranch})이 'hotfix' 또는 'release'로 시작해.
                **제목 줄은 브랜치 이름 전체를 접두사**로 사용하여 시작해야 해.
                예시 1) 브랜치: 'hotfix/v1.0.1' $\rightarrow$ 커밋: **"Hotfix/v1.0.1: ~~"**
                예시 2) 브랜치: 'release/v2.5.0' $\rightarrow$ 커밋: **"Release/v2.5.0: ~~"** 등의 형식으로
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

    branchNmaes: (diff: string, count: number) => `
        너는 Git 전문가야. 다음 git diff를 기반으로 브랜치 이름을 ${count}개 추천해줘.

        **브랜치 이름은 반드시 \`feat/\`, \`fix/\`, \`refactor/\`, \`docs/\`, \`style/\`, \`chore/\`, \`test/\` 중 적절한 접두사로 시작해야해.**

        반환 형식:
        ${count} 개의 브랜치 이름을 **쉼표(,)**로만 구분해서 출력해줘. 다른 문장이나 설명은 절대 포함하지 마.
        diff: ${diff}
    `
}