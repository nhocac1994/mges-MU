import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const pool = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const characterName = searchParams.get('name');

    let query: string;
    let result;

    if (characterName && characterName.trim()) {
      // Tìm kiếm character cụ thể
      query = `
        SELECT 
          AccountID as account,
          Name as character,
          Class as class,
          ResetCount as resets,
          cLevel as level,
          PkCount as pkcount
        FROM Character 
        WHERE Name LIKE @characterName 
        AND (CtlCode < 8 OR CtlCode IS NULL)
        ORDER BY ResetCount DESC
      `;
      
      result = await pool.request()
        .input('characterName', `%${characterName.trim()}%`)
        .query(query);
    } else {
      // Lấy top 100 characters
      query = `
        SELECT TOP 100 
          AccountID as account,
          Name as character,
          Class as class,
          ResetCount as resets
        FROM Character 
        WHERE CtlCode < 8 OR CtlCode IS NULL 
        ORDER BY ResetCount DESC
      `;
      
      result = await pool.request().query(query);
    }
    
    await pool.close();
    
    return NextResponse.json({
      success: true,
      data: result.recordset,
      message: characterName ? `Tìm thấy ${result.recordset.length} kết quả cho "${characterName}"` : 'Lấy danh sách ranking thành công!',
      isSearch: !!characterName
    });
    
  } catch (error) {
    console.error('Character search error:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi tìm kiếm nhân vật'
    }, { status: 500 });
  }
}
