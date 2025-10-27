import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const pool = await connectToDatabase();
    
    // Kiểm tra xem có guild nào không
    const checkGuilds = await pool.request().query(`
      SELECT COUNT(*) as count FROM Guild
    `);
    
    const guildCount = checkGuilds.recordset[0].count;
    
    if (guildCount === 0) {
      // Thêm một số guild mẫu
      const sampleGuilds = [
        { name: 'zAOEz', master: 'Hittite', score: 1000, count: 5 },
        { name: 'Yahoo', master: 'LYaMal', score: 950, count: 8 },
        { name: 'Smoking', master: 'DuyQuang', score: 900, count: 6 },
        { name: 'MAGIC', master: 'DLCLEAR', score: 850, count: 7 },
        { name: 'GaiDep', master: 'BraweyDL', score: 800, count: 4 },
        { name: 'Boss', master: 'Messi', score: 750, count: 9 },
        { name: '6789', master: 'DauGauVN', score: 700, count: 3 },
        { name: 'HELLO', master: 'Gackiem', score: 650, count: 6 },
        { name: 'SongCon', master: 'DWTaxi', score: 600, count: 5 },
        { name: 'KOSOCHO', master: 'Hwang', score: 550, count: 4 }
      ];
      
      for (const guild of sampleGuilds) {
        await pool.request()
          .input('name', guild.name)
          .input('master', guild.master)
          .input('score', guild.score)
          .input('count', guild.count)
          .query(`
            INSERT INTO Guild (G_Name, G_Master, G_Score, G_Count, G_Notice, G_Type, G_Rival, G_Union, G_Date)
            VALUES (@name, @master, @score, @count, 'Welcome to our guild!', 0, 0, 0, GETDATE())
          `);
      }
      
      await pool.close();
      
      return NextResponse.json({
        success: true,
        message: `Đã thêm ${sampleGuilds.length} guild mẫu vào database!`
      });
    } else {
      await pool.close();
      
      return NextResponse.json({
        success: true,
        message: `Database đã có ${guildCount} guild. Không cần thêm dữ liệu mẫu.`
      });
    }
    
  } catch (error) {
    console.error('Add sample guilds error:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi thêm dữ liệu guild mẫu'
    }, { status: 500 });
  }
}
