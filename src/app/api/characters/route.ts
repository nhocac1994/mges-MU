import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import sql from 'mssql';

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get('accountId');
    
    if (!accountId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Account ID không được cung cấp' 
      }, { status: 400 });
    }


    const pool = await connectToDatabase();
    
    // Lấy danh sách characters của account
    const charactersQuery = `
      SELECT 
        Name,
        cLevel,
        Class,
        ResetCount,
        MasterResetCount,
        Strength,
        Dexterity,
        Vitality,
        Energy,
        Leadership,
        Life,
        MaxLife,
        Mana,
        MaxMana,
        Money,
        MapNumber,
        MapPosX,
        MapPosY,
        PKCount,
        PKLevel
      FROM Character
      WHERE AccountID = @accountId
      ORDER BY cLevel DESC, ResetCount DESC, MasterResetCount DESC
    `;

    const charactersResult = await pool.request()
      .input('accountId', sql.VarChar(10), accountId)
      .query(charactersQuery);
    
    const characters = charactersResult.recordset;

    // Map class names
    const getClassName = (classId: number) => {
      const classMap: { [key: number]: string } = {
        0: 'Dark Wizard',
        1: 'Soul Master',
        2: 'Grand Master',
        3: 'Dark Knight',
        4: 'Blade Knight',
        5: 'Blade Master',
        6: 'Fairy Elf',
        7: 'Muse Elf',
        8: 'High Elf',
        16: 'Magic Gladiator',
        17: 'Dark Lord',
        32: 'Summoner',
        33: 'Bloody Summoner',
        34: 'Dimension Master',
        48: 'Rage Fighter',
        50: 'Fist Master',
        64: 'Grow Lancer',
        65: 'Mirage Lancer',
        66: 'Shining Lancer'
      };
      return classMap[classId] || `Unknown (${classId})`;
    };

    // Format characters data
    const formattedCharacters = characters.map(char => ({
      name: char.Name,
      level: char.cLevel,
      class: char.Class,
      className: getClassName(char.Class),
      resetCount: char.ResetCount,
      masterResetCount: char.MasterResetCount,
      stats: {
        strength: char.Strength,
        dexterity: char.Dexterity,
        vitality: char.Vitality,
        energy: char.Energy,
        leadership: char.Leadership
      },
      life: char.Life,
      maxLife: char.MaxLife,
      mana: char.Mana,
      maxMana: char.MaxMana,
      money: char.Money,
      mapNumber: char.MapNumber,
      mapPosX: char.MapPosX,
      mapPosY: char.MapPosY,
      pkCount: char.PKCount,
      pkLevel: char.PKLevel
    }));

    return NextResponse.json({
      success: true,
      data: {
        characters: formattedCharacters,
        totalCharacters: formattedCharacters.length
      }
    });

  } catch (error) {
    console.error('Error fetching characters:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi khi lấy danh sách characters' 
    }, { status: 500 });
  }
}
