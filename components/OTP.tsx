"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp";
import { OTPProps } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyOTP } from "@/lib/actions/user.actions";

const OTP = ({email, accountId}: OTPProps) => {
    const { push } = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (password.length === 6) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const sessionId = await verifyOTP({accountId, password});
            
            if (sessionId) {
                toast.success("User account verified successfully.");
                push("/");
            } else {
                toast.error("Failed to verify OTP.");
                setPassword("");
            }
        } catch (error) {
            toast.error("Failed to verify OTP.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleResend = () => {
        throw new Error("Function not implemented.")
    }

    return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent className="shad-alert-dialog">
            <AlertDialogHeader className="relative flex justify-center">
                <AlertDialogTitle className="h2 text-center">
                    Enter Your OTP
                    <Image src={"/assets/icons/close-dark.svg"} 
                    className="otp-close-button"
                    alt="close" width={20} height={20}
                    onClick={() => setIsOpen(false)}/>
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    We've sent a one time password to{" "} <span className="pl-1 text-brand">{email}</span>.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <InputOTP maxLength={6} value={password} onChange={setPassword}>
                <InputOTPGroup className="shad-otp">
                    <InputOTPSlot index={0} className="shad-otp-slot" />
                    <InputOTPSlot index={1} className="shad-otp-slot" />
                    <InputOTPSlot index={2} className="shad-otp-slot" />
                    <InputOTPSlot index={3} className="shad-otp-slot" />
                    <InputOTPSlot index={4} className="shad-otp-slot" />
                    <InputOTPSlot index={5} className="shad-otp-slot" />
                </InputOTPGroup>
            </InputOTP>
            <AlertDialogFooter>
                <div className="flex w-full flex-col gap-4">
                    {isActive && <AlertDialogAction className="shad-submit-btn h-12" type="button"
                    onClick={handleSubmit}>
                        Submit
                        {isLoading && <Image src={"/assets/icons/loader.svg"} alt="loader" 
                        width={24} height={24} className="ml-2 animate-spin"/>}
                    </AlertDialogAction>}

                    <div className="text-sm mt-2 text-center text-light-100">
                        Didn't get the OTP?
                        <Button type="button" variant={"link"} className="pl-1 text-brand"
                        onClick={handleResend}>Resend</Button>
                    </div>
                </div>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default OTP
