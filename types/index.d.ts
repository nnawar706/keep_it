import React from "react";

export declare type FormType = "sign-up" | "sign-in"

export interface LayoutInterface {
    children: React.ReactNode
}

export interface AuthFormProps {
    type: FormType
}

export interface SidebarProps {
    name: string;
    avatar: string;
    email: string;
}

export interface OTPProps {
    email: string;
    accountId: string;
}

export interface HeaderProps {
    userId: string;
    accountId: string;
}

export interface SignInProps {
    email: string;
}