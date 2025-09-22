import { NextRequest, NextResponse } from 'next/server';
import { createAccount } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await createAccount({
      username: body.username,
      password: body.password,
      characterName: body.characterName,
      email: body.email,
      phone: body.phone,
      securityQuestion: body.securityQuestion,
      securityAnswer: body.securityAnswer
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    );
  }
}
