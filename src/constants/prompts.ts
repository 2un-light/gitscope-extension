export const PROMPTS = {
    commitMessage: (diff: string) => `
        너는 Git 전문가야.
        다음 git diff를 기반으로 커밋 메시지를 작성해줘.
        형식은 반드시 **"Feat: ~~", "Fix: ~~", "Refactor: ~~", "Docs: ~~", "Style: ~~", "Chore: ~~", "Test: ~~" 등의 형식으로.**
        한글로.
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