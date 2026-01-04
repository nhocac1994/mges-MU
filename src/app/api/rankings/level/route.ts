import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

// Helper function để convert MapNumber thành map name
function getMapName(mapNumber?: number): string | undefined {
  if (!mapNumber && mapNumber !== 0) return undefined;
  
  const mapNames: { [key: number]: string } = {
    0: 'Lorencia',
    1: 'Dungeon',
    2: 'Devias',
    3: 'Noria',
    4: 'LostTower',
    5: 'Exile',
    6: 'Arena',
    7: 'Atlans',
    8: 'Tarkan',
    9: 'DevilSquare',
    10: 'Icarus',
    11: 'BloodCastle',
    12: 'ChaosCastle',
    13: 'Kalima',
    14: 'Kanturu',
    15: 'KanturuRemain',
    16: 'Silent',
    17: 'Barracks',
    18: 'Refuge',
    19: 'IllusionTemple',
    20: 'IllusionTemple2',
    21: 'IllusionTemple3',
    22: 'IllusionTemple4',
    23: 'IllusionTemple5',
    24: 'IllusionTemple6',
    30: 'ValleyOfLoren',
    31: 'LandOfTrials',
    32: 'DevilSquare2',
    33: 'DevilSquare3',
    34: 'DevilSquare4',
    35: 'DevilSquare5',
    36: 'DevilSquare6',
    37: 'ChaosCastle1',
    38: 'ChaosCastle2',
    39: 'ChaosCastle3',
    40: 'ChaosCastle4',
    41: 'ChaosCastle5',
    42: 'ChaosCastle6',
    43: 'ChaosCastle7',
    45: 'SwampOfCalmness',
    46: 'Raklion',
    47: 'RaklionBoss',
    48: 'SantaVillage',
    49: 'Vulcanus',
    50: 'DuelArena',
    51: 'DoppelGanger1',
    52: 'DoppelGanger2',
    53: 'DoppelGanger3',
    54: 'DoppelGanger4',
    55: 'ImperialGuardian1',
    56: 'ImperialGuardian2',
    57: 'ImperialGuardian3',
    58: 'ImperialGuardian4',
    62: 'LorenMarket',
    63: 'Karutan1',
    64: 'Karutan2'
  };
  
  return mapNames[mapNumber];
}

/**
 * Proxy level ranking request to C# backend
 */
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_URL}/api/rankings/level`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10 giây timeout
    });

    if (!response.ok) {
      let errorMessage = 'Unknown error';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || `HTTP ${response.status}`;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || `HTTP ${response.status}`;
      }

      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage,
          data: null
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Transform data để map isOnline và mapName
    if (data.success && data.data && Array.isArray(data.data)) {
      const transformedData = data.data.map((char: any) => ({
        account: char.AccountID || char.account || '',
        character: char.Name || char.character || '',
        class: char.Class ?? char.class ?? 0,
        resets: char.ResetCount ?? char.resets ?? 0,
        level: char.cLevel ?? char.level ?? 0,
        isOnline: char.IsOnline ?? char.isOnline ?? 0,
        mapName: char.MapName || char.mapName || getMapName(char.MapNumber ?? char.mapNumber)
      }));
      
      return NextResponse.json({
        ...data,
        data: transformedData
      }, { status: response.status });
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    // Xử lý các loại lỗi khác nhau
    let errorMessage = 'Lỗi kết nối đến server';
    
    if (error.name === 'AbortError') {
      errorMessage = 'Backend C# không phản hồi (timeout). Vui lòng kiểm tra server đã chạy chưa.';
    } else if (error.message?.includes('fetch')) {
      errorMessage = `Không thể kết nối đến backend C# tại ${API_URL}. Vui lòng kiểm tra server đã chạy chưa.`;
    } else {
      errorMessage = `Lỗi: ${error?.message || 'Unknown error'}`;
    }

    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        data: null
      },
      { status: 500 }
    );
  }
}
