import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import sql from 'mssql';

export async function GET(request: NextRequest) {
  try {
    
    const pool = await connectToDatabase();
    
    // Test 1: Kiểm tra account testuser6
    const accountQuery = `
      SELECT 
        memb___id as Username,
        memb_name as CharacterName,
        mail_addr as Email,
        appl_days as CreatedDate,
        bloc_code as BlockStatus
      FROM MEMB_INFO 
      WHERE memb___id = @username
    `;
    
    const accountResult = await pool.request()
      .input('username', sql.VarChar(10), 'testuser')
      .query(accountQuery);
    
    
    // Test 2: Kiểm tra character của testuser6
    const characterQuery = `
      SELECT 
        Name as CharacterName,
        cLevel as Level,
        Experience,
        Class,
        Money,
        ResetCount,
        MasterResetCount
      FROM Character 
      WHERE AccountID = @accountId
    `;
    
    const characterResult = await pool.request()
      .input('accountId', sql.VarChar(10), 'testuser')
      .query(characterQuery);
    
    
    // Test 2.5: Kiểm tra MEMB_STAT (thông tin kết nối)
    const membStatQuery = `
      SELECT 
        memb___id,
        ConnectStat as IsOnline,
        ServerName,
        IP,
        ConnectTM,
        DisConnectTM,
        OnlineHours
      FROM MEMB_STAT 
      WHERE memb___id = @accountId
    `;
    
    const membStatResult = await pool.request()
      .input('accountId', sql.VarChar(10), 'testuser')
      .query(membStatQuery);
    
    
    // Test 3: Kiểm tra warehouse
    const warehouseQuery = `
      SELECT 
        AccountID,
        Money as WarehouseMoney
      FROM warehouse 
      WHERE AccountID = @accountId
    `;
    
    const warehouseResult = await pool.request()
      .input('accountId', sql.VarChar(10), 'testuser')
      .query(warehouseQuery);
    
    
    // Test 4: Kiểm tra reset data từ Character table
    const resetQuery = `
      SELECT 
        AccountID,
        Name,
        ResetCount,
        MasterResetCount
      FROM Character 
      WHERE AccountID = @accountId
    `;
    
    const resetResult = await pool.request()
      .input('accountId', sql.VarChar(10), 'testuser')
      .query(resetQuery);
    
    
    // Test 5: Đếm tổng số
    const countQuery = `
      SELECT 
        (SELECT COUNT(*) FROM MEMB_INFO) as TotalAccounts,
        (SELECT COUNT(*) FROM Character) as TotalCharacters,
        (SELECT COUNT(*) FROM Character WHERE AccountID = @accountId) as TestUserCharacters
    `;
    
    const countResult = await pool.request()
      .input('accountId', sql.VarChar(10), 'testuser')
      .query(countQuery);
    
    
    await pool.close();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection and queries successful',
      data: {
        account: accountResult.recordset[0] || null,
        characters: characterResult.recordset,
        membStat: membStatResult.recordset[0] || null,
        warehouse: warehouseResult.recordset[0] || null,
        resetData: resetResult.recordset,
        counts: countResult.recordset[0]
      }
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    
    // Close connection if it's still open
    try {
      const pool = await connectToDatabase();
      await pool.close();
    } catch (closeError) {
      console.error('Error closing database connection:', closeError);
    }
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}