import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import sql from 'mssql';

export async function PUT(request: NextRequest) {
  try {
    const { accountId, currentPassword, newPassword } = await request.json();
    
    if (!accountId || newPassword === undefined) {
      return NextResponse.json({ 
        success: false, 
        message: 'Thiếu thông tin bắt buộc' 
      }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ 
        success: false, 
        message: 'Mật khẩu mới phải có ít nhất 6 ký tự' 
      }, { status: 400 });
    }


    const pool = await connectToDatabase();
    
    // Kiểm tra mật khẩu hiện tại
    const checkPasswordQuery = `
      SELECT memb___pwd FROM MEMB_INFO WHERE memb___id = @accountId
    `;
    
    const checkResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(checkPasswordQuery);
    
    if (checkResult.recordset.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Tài khoản không tồn tại' 
      }, { status: 404 });
    }

    const storedPassword = checkResult.recordset[0].memb___pwd;
    
    // So sánh mật khẩu hiện tại (xử lý trường hợp null/empty)
    const storedPwd = storedPassword || '';
    const currentPwd = currentPassword || '';
    
    if (storedPwd !== currentPwd) {
      return NextResponse.json({ 
        success: false, 
        message: 'Mật khẩu hiện tại không đúng' 
      }, { status: 400 });
    }

    // Cập nhật mật khẩu mới
    const updatePasswordQuery = `
      UPDATE MEMB_INFO 
      SET memb___pwd = @newPassword
      WHERE memb___id = @accountId
    `;

    
    const updateResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .input('newPassword', sql.VarChar(20), newPassword)
      .query(updatePasswordQuery);
    

    return NextResponse.json({
      success: true,
      message: 'Đổi mật khẩu thành công'
    });

  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi khi đổi mật khẩu' 
    }, { status: 500 });
  }
}
