export interface IConfigService {
    //GlobalState 설정 (일반 설정)
    get<T>(): Promise<T | undefined>;
    update(value: any): Promise<void>;
    has(): Promise<boolean>;
    delete(): Promise<void>;


    //Secret Storage 관련 (보안 설정)
    storeSecret(value: string): Promise<void>;
    getSecret(): Promise<string | undefined>;
    deleteSecret(): Promise<void>;

    //유틸리티
    clearAll(): Promise<void>;
}