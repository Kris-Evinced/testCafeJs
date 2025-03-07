import { t } from 'testcafe';

declare class EvincedSDK {
    constructor(testController: t);
    evAnalyze(options?: { initOptions?: EvInitOptions, uploadToPlatform?: boolean }): Promise<Issue[]>;
    evStart(initOptions?: EvInitOptions): Promise<void>;
    evStop(options?: { uploadToPlatform: boolean }): Promise<Issue[]>;
    evSaveFile(
        issues: Issue[],
        format: 'json' | 'html' | 'sarif' | 'csv',
        destination: string,
    ): Promise<void>;
    uploadToPlatform: UploadToPlatform;
    addLabel(parameter: TestRunInfoInterface): void;
    customLabel(customParameter: CustomLabelInterface): void;
}

declare function setOfflineCredentials({ serviceId, token }: OfflineCredentials): void;
declare function setCredentials({ serviceId, secret }: Credentials): void;

type EvInitOptions = {
    rootSelector?: string;
    enableScreenshots?: boolean;
    axeConfig?: axe.RunOptions;
    skipValidations?: SkipValidation[];
    logging?: {
        LOGGING_LEVEL: string;
        ADD_LOGGING_CONTEXT?: boolean;
    };
    toggles?: { [key: string]: boolean };
};

type OfflineCredentials = {
    serviceId: string;
    token: string;
};

type Credentials = {
    serviceId: string;
    secret: string;
};

type IssueElement = {
    componentId: string;
    domSnippet: string;
    id: string;
    index: string;
    pageUrl: string;
    selector: string;
};

type IssueSeverity = {
    id: string;
    name: string;
};

type IssueTag = {
    description: string;
    id: string;
    link: string;
};

type IssueType = {
    id: string;
    newId: string;
    name: string;
};

type IssueValidation = {
    id: string;
};

export type Issue = {
    additionalInformation: any;
    duplicates?: string;
    description: string;
    elements: IssueElement[];
    firstSeenTime: number;
    lastSeenTime: number;
    hidden: boolean;
    id: string;
    index: string;
    severity: IssueSeverity;
    signature: string;
    summary: string;
    tags: IssueTag[];
    type: IssueType;
    validation: IssueValidation;
    knowledgeBaseLink?: string;
    screenshotId?: string;
    customLabel?: {};
};

declare function setUploadToPlatformConfig(platformUploadOptions: { enableUploadToPlatform: boolean, setUploadToPlatformDefault?: boolean }): void;

export interface TestRunInfoInterface {
    testId?: string;
    runTime?: number;
    userAgent?: string;
    enginesVersion?: string;
    viewportWidth?: string;
    viewportHeight?: string;
    productVersion?: string;
    testName?: string;
    testFile?: string;
    environment?: string;
    flow?: string;
    gitUserName?: string;
    gitBranch?: string;
    gitVersion?: string;
    customFields?: CustomLabelInterface;
}
