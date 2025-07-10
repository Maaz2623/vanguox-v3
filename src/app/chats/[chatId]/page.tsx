import { auth } from "@/lib/auth";
import { ChatView } from "@/modules/chats/ui/views/chat-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

const ChatIdPage = async ({ params }: Props) => {
  const { chatId } = await params;

  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data) {
    redirect(`/auth`);
  }

  return <ChatView chatId={chatId} userId={data.user.id} />;
};

export default ChatIdPage;
