export declare type FormType = "sign-up" | "sign-in"

export interface AuthFormProps {
    type: FormType
}

export interface OTPProps {
    email: string;
    accountId: string;
}