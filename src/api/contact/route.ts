import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Site Projeto Esperança" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      subject: "Nova mensagem recebida pelo site",
      html: `
        <h2>Nova mensagem pelo site</h2>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> (${data.ddd}) ${data.phone}</p>
        <p><strong>Mensagem:</strong> ${data.message}</p>
        <p><strong>Aceitou receber e-mails:</strong> ${
          data.acceptedEmails ? "Sim" : "Não"
        }</p>
      `,
    });

    return NextResponse.json({ message: "E-mail enviado com sucesso." });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return NextResponse.json(
      { message: "Erro ao enviar e-mail." },
      { status: 500 },
    );
  }
}