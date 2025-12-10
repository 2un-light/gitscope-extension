export interface ICommand {
    /**
     * 커멘드 실행 메서드
     * 이 메서드는 커맨드가 수행해야 할 모든 작업을 캡슐화합니다.
     */
    execute(...args: any[]): Promise<void>;
}