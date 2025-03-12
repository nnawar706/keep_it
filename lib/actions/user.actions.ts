"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { avatarUrl } from "@/constants";
import { handleError, stringify } from "../utils";
import { cookies } from "next/headers";

const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('email', [email])]
    );

    return result.total > 0 ? result.documents[0] : null;
}

const sendEmailOTP = async ({email}: { email: string }) => {
    const { account } = await createAdminClient();

    try {
      const session = await account.createEmailToken(ID.unique(), email)

      return session.userId;
    } catch (error) {
      handleError(error, 'Failed to send email OTP');
    }
}

export const createAccount = async ({name, email}: {
    name: string;
    email: string;
  }) => {
    const existingUser = await getUserByEmail(email);

    if (existingUser) throw new Error("User already exists");
  
    const accountId = await sendEmailOTP({ email });
    
    if (!accountId) throw new Error("Failed to send an OTP");
  
    const { databases } = await createAdminClient();
  
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        name,
        email,
        avatar: avatarUrl,
        id: accountId,
      },
    );
  
    return stringify({ accountId });
  };

export const verifyOTP = async ({accountId, password}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true
    });

    return stringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
}