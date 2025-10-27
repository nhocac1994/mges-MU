import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const pool = await connectToDatabase();
    
    // Lấy top 50 guilds với xử lý dữ liệu null/0
    const result = await pool.request().query(`
      SELECT TOP 50 
        G_Name as guildName,
        ISNULL(G_Score, 0) as score,
        ISNULL(G_Master, 'Unknown') as guildMaster,
        ISNULL(G_Count, 0) as memberCount,
        G_Mark as guildMark
      FROM Guild 
      WHERE G_Name IS NOT NULL 
      AND G_Name != ''
      ORDER BY ISNULL(G_Score, 0) DESC, G_Name ASC
    `);
    
    await pool.close();
    
    return NextResponse.json({
      success: true,
      data: result.recordset,
      message: 'Lấy danh sách guild ranking thành công!'
    });
    
  } catch (error) {
    console.error('Guild ranking error:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi lấy danh sách guild ranking'
    }, { status: 500 });
  }
}
