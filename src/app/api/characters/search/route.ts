import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { validateCharacterName, detectSQLInjection, logSuspiciousActivity } from '@/lib/security';
import { getClientIP } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const pool = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const characterName = searchParams.get('name');
    const clientIP = getClientIP(request);

    let query: string;
    let result;

    if (characterName && characterName.trim()) {
      // ✅ Security: Validate character name
      const characterNameValidation = validateCharacterName(characterName.trim());
      if (!characterNameValidation.valid) {
        logSuspiciousActivity(clientIP, '/api/characters/search', characterName, 'Invalid character name format');
        return NextResponse.json({ 
          success: false, 
          message: characterNameValidation.error || 'Tên nhân vật không hợp lệ' 
        }, { status: 400 });
      }

      // ✅ Security: Detect SQL injection
      if (detectSQLInjection(characterName)) {
        logSuspiciousActivity(clientIP, '/api/characters/search', characterName, 'SQL Injection attempt detected');
        return NextResponse.json({ 
          success: false, 
          message: 'Input không hợp lệ' 
        }, { status: 400 });
      }
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

    return NextResponse.json({
      success: false,
      message: 'Lỗi khi tìm kiếm nhân vật'
    }, { status: 500 });
  }
}
