import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const pool = await connectToDatabase();
    
    // Lấy top 100 characters theo ResetCount từ bảng Character
    const result = await pool.request().query(`
      SELECT TOP 100 
        AccountID as account,
        Name as character,
        Class as class,
        ResetCount as resets
      FROM Character 
      WHERE CtlCode < 8 OR CtlCode IS NULL 
      ORDER BY ResetCount DESC
    `);
    
    await pool.close();
    
    return NextResponse.json({
      success: true,
      data: result.recordset,
      message: 'Lấy danh sách ranking thành công!'
    });
    
  } catch (error) {
    console.error('Ranking error:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi lấy danh sách ranking'
    }, { status: 500 });
  }
}
