import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import sql from 'mssql';

// Helper functions for account level
function getAccountLevelName(level: number): string {
  switch (level) {
    case 1: return 'Đồng';
    case 2: return 'Bạc';
    case 3: return 'Vàng';
    default: return 'Thường';
  }
}

function getAccountLevelColor(level: number): string {
  switch (level) {
    case 1: return '#CD7F32'; // Bronze/Đồng
    case 2: return '#C0C0C0'; // Silver/Bạc
    case 3: return '#FFD700'; // Gold/Vàng
    default: return '#808080'; // Gray/Thường
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ success: false, message: 'Token không hợp lệ' }, { status: 401 });
    }

    // Lấy thông tin user từ request headers hoặc từ token
    const accountId = request.nextUrl.searchParams.get('accountId') || 
                     request.headers.get('x-user-account');
    
    if (!accountId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Account ID không được cung cấp' 
      }, { status: 400 });
    }

    const pool = await connectToDatabase();

    // Lấy thông tin character chính
    const characterQuery = `
      SELECT TOP 1 
        c.Name,
        c.cLevel,
        c.Experience,
        c.Class,
        c.Strength,
        c.Dexterity,
        c.Vitality,
        c.Energy,
        c.Leadership,
        c.Money,
        c.Life,
        c.MaxLife,
        c.Mana,
        c.MaxMana,
        c.MapNumber,
        c.MapPosX,
        c.MapPosY,
        c.PkCount,
        c.PkLevel,
        c.ResetCount,
        c.MasterResetCount
      FROM Character c
      WHERE c.AccountID = @accountId
      ORDER BY c.cLevel DESC, c.Experience DESC
    `;

    const characterResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(characterQuery);
    const character = characterResult.recordset[0];

    // Lấy thông tin kết nối từ MEMB_STAT
    const membStatQuery = `
      SELECT 
        ConnectStat,
        ServerName,
        IP,
        ConnectTM,
        DisConnectTM,
        OnlineHours
      FROM MEMB_STAT
      WHERE memb___id = @accountId
    `;

    const membStatResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(membStatQuery);
    const membStat = membStatResult.recordset[0];

    // Lấy thông tin account level từ MEMB_INFO
    const accountInfoQuery = `
      SELECT 
        memb___id as Username,
        memb_name as CharacterName,
        mail_addr as Email,
        appl_days as CreatedDate,
        bloc_code as BlockStatus,
        AccountLevel,
        AccountExpireDate
      FROM MEMB_INFO 
      WHERE memb___id = @accountId
    `;

    const accountInfoResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(accountInfoQuery);
    const accountInfo = accountInfoResult.recordset[0];

    // Lấy thông tin reset chi tiết từ ResetData table
    const resetDataQuery = `
      SELECT 
        ResetDay,
        ResetWek,
        ResetMon,
        ResetDateDay,
        ResetDateWek,
        ResetDateMon,
        MasterResetDay,
        MasterResetWek,
        MasterResetMon,
        MasterResetDateDay,
        MasterResetDateWek,
        MasterResetDateMon
      FROM ResetData
      WHERE Account = @accountId AND Name = @characterName
    `;

    const resetDataResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .input('characterName', sql.VarChar(10), character?.Name || '')
      .query(resetDataQuery);
    const resetData = resetDataResult.recordset[0];

    // Lấy thông tin warehouse
    const warehouseQuery = `
      SELECT Money as WarehouseMoney
      FROM warehouse
      WHERE AccountID = @accountId
    `;

    const warehouseResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(warehouseQuery);
    const warehouse = warehouseResult.recordset[0];

    // Lấy thông tin guild nếu có
    const guildQuery = `
      SELECT g.G_Name, g.G_Master, g.G_Score, g.G_Count
      FROM Guild g
      INNER JOIN GuildMember gm ON g.G_Name = gm.G_Name
      WHERE gm.Name = @characterName
    `;

    const guildResult = await pool.request()
      .input('characterName', sql.VarChar(10), character?.Name || '')
      .query(guildQuery);
    const guild = guildResult.recordset[0];

    // Lấy số lượng character
    const characterCountQuery = `
      SELECT COUNT(*) as CharacterCount
      FROM Character
      WHERE AccountID = @accountId
    `;

    const characterCountResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(characterCountQuery);
    const characterCount = characterCountResult.recordset[0]?.CharacterCount || 0;

    await pool.close();

    // Tính toán thời gian chơi từ OnlineHours
    const totalPlayTime = membStat?.OnlineHours || 0;
    const playTimeHours = totalPlayTime;
    const playTimeMinutes = 0; // OnlineHours đã là giờ

    // Tính toán kinh nghiệm cần thiết cho level tiếp theo
    const currentExp = character?.Experience || 0;
    const currentLevel = character?.cLevel || 1;
    const nextLevelExp = Math.floor(Math.pow(currentLevel, 2) * 100); // Công thức tính exp cần thiết
    const expProgress = Math.min((currentExp / nextLevelExp) * 100, 100);

    const responseData = {
      success: true,
      data: {
        account: {
          id: accountId,
          characterCount: characterCount,
          level: accountInfo?.AccountLevel || 0,
          levelName: getAccountLevelName(accountInfo?.AccountLevel || 0),
          levelColor: getAccountLevelColor(accountInfo?.AccountLevel || 0),
          expireDate: accountInfo?.AccountExpireDate,
          isExpired: accountInfo?.AccountExpireDate ? new Date(accountInfo.AccountExpireDate) < new Date() : false
        },
        character: {
          name: character?.Name || 'Chưa có',
          level: character?.cLevel || 1,
          experience: currentExp,
          nextLevelExp: nextLevelExp,
          expProgress: expProgress,
          class: character?.Class || 0,
          strength: character?.Strength || 0,
          dexterity: character?.Dexterity || 0,
          vitality: character?.Vitality || 0,
          energy: character?.Energy || 0,
          leadership: character?.Leadership || 0,
          money: character?.Money || 0,
          life: character?.Life || 0,
          maxLife: character?.MaxLife || 0,
          mana: character?.Mana || 0,
          maxMana: character?.MaxMana || 0,
          mapNumber: character?.MapNumber || 0,
          mapPosX: character?.MapPosX || 0,
          mapPosY: character?.MapPosY || 0,
          pkCount: character?.PkCount || 0,
          pkLevel: character?.PkLevel || 0,
          isOnline: membStat?.ConnectStat === 1,
          connectTime: membStat?.ConnectTM,
          disconnectTime: membStat?.DisConnectTM,
          totalPlayTime: totalPlayTime,
          playTimeHours: playTimeHours,
          playTimeMinutes: playTimeMinutes,
          resetCount: character?.ResetCount || 0,
          masterResetCount: character?.MasterResetCount || 0
        },
        reset: {
          dailyReset: resetData?.ResetDay || 0,
          weeklyReset: resetData?.ResetWek || 0,
          monthlyReset: resetData?.ResetMon || 0,
          lastDailyReset: resetData?.ResetDateDay,
          lastWeeklyReset: resetData?.ResetDateWek,
          lastMonthlyReset: resetData?.ResetDateMon,
          masterDailyReset: resetData?.MasterResetDay || 0,
          masterWeeklyReset: resetData?.MasterResetWek || 0,
          masterMonthlyReset: resetData?.MasterResetMon || 0,
          lastMasterDailyReset: resetData?.MasterResetDateDay,
          lastMasterWeeklyReset: resetData?.MasterResetDateWek,
          lastMasterMonthlyReset: resetData?.MasterResetDateMon,
          totalResetCount: character?.ResetCount || 0,
          totalMasterResetCount: character?.MasterResetCount || 0
        },
        warehouse: {
          money: warehouse?.WarehouseMoney || 0
        },
        guild: guild ? {
          name: guild.G_Name,
          master: guild.G_Master,
          score: guild.G_Score,
          memberCount: guild.G_Count
        } : null
      }
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Dashboard API error:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi khi lấy thông tin dashboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
