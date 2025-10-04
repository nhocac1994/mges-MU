import { NextRequest, NextResponse } from 'next/server';
import { createAccount } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, characterName, email, phone, securityQuestion, securityAnswer } = body;

    // Validate input
    if (!username || !password || !characterName || !email || !phone || !securityQuestion || !securityAnswer) {
      return NextResponse.json({ 
        success: false, 
        message: 'Vui lòng điền đầy đủ thông tin' 
      }, { status: 400 });
    }

    // Use the createAccount function from database.ts
    const result = await createAccount({
      username,
      password,
      characterName,
      email,
      phone,
      securityQuestion,
      securityAnswer
    });

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: result.message,
        data: {
          username,
          characterName,
          email,
          phone
        }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: result.message 
      }, { status: 400 });
    }

  } catch {
    console.error('Registration error: [Hidden for security]');
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi hệ thống. Vui lòng thử lại sau.' 
    }, { status: 500 });
  }
}
