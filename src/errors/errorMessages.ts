export const ERROR_MESSAGES = {
    apiKeyInvalid: "API 키 오류 또는 권한 부족, 키 확인 후 재설정 해주세요.",
    missingApiKey: "Gemini API 키가 설정되지 않았습니다.",
    deleteApiKeyFailed: "API 키 삭제 중 오류가 발생했습니다.\n다시 시도해주세요.",
    quotaExceeded: "사용량(Quota) 초과 (HTTP 429). Google AI Studio에서 확인하세요.",
    apiCommunication: "예기치 않은 API 오류가 발생했습니다.",
    networkError: "네트워크 오류: 인터넷 연결 상태를 확인해 주세요.",
    parseFailed: "Gemini 응답 데이터를 파싱할 수 없습니다.",

    invalidDiff: "diff 값이 비어있습니다.",
    invalidCount: "Branch 추천 개수(count)는 1 이상이어야 합니다.",

    generateCommitMessageFailed: "Commit Message 생성 실패",
    createBranchFailed: "Branch명 추천 및 생성 실패",
    checkoutBranchFailed: "Branch 전환 실패",
    noWorkSpace: "VS Code에 열린 폴더가 없습니다. 클론할 상위 경로를 알 수 없습니다.",
    cloneRepositoryFailed: "Git Clone 실패",
    commitFailed: "Git Commit 실패",
    deleteBranchFailed: "Branch 삭제 실패",
    mergeConflict: "Merge 충돌이 발생했습니다.",
    mergeFailed: "Merge 실패",
    pullFailed: "Pull 실패",
    pushFailed: "Push 실패",
    stageAllFailed: "모든 변경사항 스테이징 실패",

}