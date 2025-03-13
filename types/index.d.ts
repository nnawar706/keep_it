import React from "react";

export declare type FormType = "sign-up" | "sign-in"

export interface LayoutInterface {
    children: React.ReactNode
}

export interface AuthFormProps {
    type: FormType
}

export interface SignInProps {
    email: string;
}

export interface HeaderProps {
    userId: string;
    accountId: string;
}

export interface SidebarProps extends SignInProps {
    name: string;
    avatar: string;
}

export interface MobileNavProps extends SidebarProps {
    $id: string;
    accountId: string
}

export interface OTPProps extends SignInProps {
    accountId: string;
}

export interface FileUploadProps extends HeaderProps {
    className?: string;
}