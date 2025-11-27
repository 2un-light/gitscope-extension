export const ERROR_MESSAGES = {
    apiKeyInvalid: "API 키 오류 또는 권한 부족, 키 확인 후 재설정 해주세요.",
    missingApiKey: "Gemini API 키가 설정되지 않았습니다.",
    quotaExceeded: "사용량(Quota) 초과 (HTTP 429). Google AI Studio에서 확인하세요.",
    apiCommunication: "예기치 않은 API 오류가 발생했습니다.",
    networkError: "네트워크 오류: 인터넷 연결 상태를 확인해 주세요.",
    parseFailed: "Gemini 응답 데이터를 파싱할 수 없습니다.",

    invalidDiff: "diff 값이 비어있습니다.",
    invalidCount: "Branch 추천 개수(count)는 1 이상이어야 합니다.",

    createBranchFailed: "Branch명 추천 및 생성 실패",
    checkoutBranchFailed: "Branch 전환 실패",
    noLocalBranchToCheckout: "로컬에 전환할 수 있는 브랜치가 없습니다.",
    noLocalBranchToDelete: "삭제할 수 있는 다른 로컬 브랜치가 없습니다.",
    noLocalBranchToMerge: "로컬에 병합할 수 있는 다른 브랜치가 없습니다.",
    geminiBranchRecommandationFailed: "Gemini가 유효한 브랜치 이름을 추천하지 못했어요😥 수동으로 입력해주세요!",
    deleteBranchFailed: "Branch 삭제 실패",

    cloneRepositoryFailed: "Git Clone 실패",
    noWorkSpace: "현재 열린 폴더가 없습니다. 클론할 상위 디렉토리를 선택해주세요.",

    commitFailed: "Git Commit 실패",
    generateCommitMessageFailed: "Commit Message 생성 실패",
    commitMessageNotFound: "클립보드가 비어 있거나 커밋 메시지가 없습니다.",
    noModifiedCode: "변경된 코드가 없습니다.",
    emptyDiff: "유효한 변경 사항이 없습니다.",

    mergeConflict: "Merge 충돌이 발생했습니다.",
    mergeFailed: "Git Merge 실패",
    pullFailed: "Git Pull 실패",
    pushFailed: "Git Push 실패",
    stageAllFailed: "모든 변경사항 스테이징 실패",


    recommendationFailed: "Gemini 추천 실행 실패",

    tagCommandFailed: "Tag 생성 및 push 실패",

}