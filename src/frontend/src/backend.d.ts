import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Video {
    url: string;
    title: string;
    chain: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ProjectAnalytics {
    chainSelections: bigint;
    quizSubmits: bigint;
    lessonStarts: bigint;
    projectOpens: bigint;
    lessonCompletes: bigint;
    riskDetailsExpands: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Lesson {
    title: string;
    content: string;
    chain: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Quiz {
    question: string;
    chain: string;
    correctAnswer: bigint;
    options: Array<string>;
}
export interface Project {
    riskExplanation: string;
    chain: string;
    name: string;
    liquidity: bigint;
    description: string;
    volume: bigint;
    lessons: Array<Lesson>;
    auditPresence: boolean;
    teamTransparency: boolean;
    launchDate: bigint;
    riskLevel: string;
    videos: Array<Video>;
    quizzes: Array<Quiz>;
}
export interface UserProfile {
    bio?: string;
    name: string;
}
export interface http_header {
    value: string;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProject(name: string, description: string, chain: string, launchDate: bigint, auditPresence: boolean, teamTransparency: boolean, liquidity: bigint, volume: bigint, lessons: Array<Lesson>, quizzes: Array<Quiz>, videos: Array<Video>): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkDataProviderStatus(providerId: string): Promise<boolean>;
    configureDataProvider(providerId: string, url: string, apiKey: string): Promise<void>;
    fetchProjectsFromProvider(providerId: string): Promise<string>;
    getAnalytics(): Promise<ProjectAnalytics>;
    getAvailableDataProviders(): Promise<Array<string>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProjectById(projectId: bigint): Promise<Project | null>;
    getProjects(): Promise<Array<Project>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeDataProvider(providerId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAnalytics(chainSelections: bigint, projectOpens: bigint, riskDetailsExpands: bigint, lessonStarts: bigint, lessonCompletes: bigint, quizSubmits: bigint): Promise<void>;
}
