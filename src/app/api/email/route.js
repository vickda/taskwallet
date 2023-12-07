import { Resend } from "resend";
import TodoInviteEmail from "../../../Components/TodoInviteEmail";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_EMAIL);

export async function POST(req) {
  const { inviterEmail, inviterUsername, inviteeEmail, link } =
    await req.json();

  console.log(inviteeEmail, link);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: inviteeEmail,
    subject: "Group Invite Received",
    react: (
      <TodoInviteEmail
        inviterEmail={"onboarding@resend.dev"}
        inviterUsername={"Vicky"}
        inviteeEmail={inviteeEmail}
        link={link}
      />
    ),
  });

  return NextResponse.json({ status: 200 });
}
