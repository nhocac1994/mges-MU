import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const pool = await connectToDatabase();
    
    // Kiểm tra dữ liệu trong bảng Guild
    const checkData = await pool.request().query(`
      SELECT TOP 10 
        G_Name,
        G_Score,
        G_Master,
        G_Count,
        G_Mark
      FROM Guild 
      ORDER BY G_Name
    `);
    
    await pool.close();
    
    return NextResponse.json({
      success: true,
      data: checkData.recordset,
      message: 'Kiểm tra dữ liệu guild thành công!'
    });
    
  } catch (error) {
    console.error('Check guild data error:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi kiểm tra dữ liệu guild'
    }, { status: 500 });
  }
}
