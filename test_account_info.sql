-- Script SQL để kiểm tra thông tin account và các bảng liên quan
-- Chạy từng phần để kiểm tra

-- 1. Kiểm tra cấu trúc bảng MEMB_INFO (bảng account chính)
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'MEMB_INFO'
ORDER BY ORDINAL_POSITION;

-- 2. Kiểm tra dữ liệu trong MEMB_INFO
SELECT TOP 10
    memb___id,
    memb_name,
    mail_addr,
    tel__numb,
    appl_days,
    bloc_code,
    AccountLevel
FROM MEMB_INFO
ORDER BY appl_days DESC;

-- 3. Kiểm tra cấu trúc bảng Character
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Character'
ORDER BY ORDINAL_POSITION;

-- 4. Kiểm tra dữ liệu Character cho account testuser6
SELECT 
    AccountID,
    Name,
    cLevel,
    Experience,
    Class,
    Strength,
    Dexterity,
    Vitality,
    Energy,
    Leadership,
    Money,
    Life,
    MaxLife,
    Mana,
    MaxMana,
    MapNumber,
    MapPosX,
    MapPosY,
    PkCount,
    PkLevel,
    ConnectStat,
    ConnectTM,
    DisConnectTM,
    TotalPlayTime
FROM Character 
WHERE AccountID = 'testuser6'
ORDER BY cLevel DESC, Experience DESC;

-- 5. Kiểm tra cấu trúc bảng ResetData
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'ResetData'
ORDER BY ORDINAL_POSITION;

-- 6. Kiểm tra dữ liệu Reset từ Character table cho testuser6
SELECT 
    AccountID,
    Name,
    ResetCount,
    MasterResetCount
FROM Character 
WHERE AccountID = 'testuser6';

-- 7. Kiểm tra cấu trúc bảng warehouse
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'warehouse'
ORDER BY ORDINAL_POSITION;

-- 8. Kiểm tra dữ liệu warehouse cho testuser6
SELECT 
    AccountID,
    Money,
    EndUseDate,
    DbVersion,
    pw
FROM warehouse 
WHERE AccountID = 'testuser6';

-- 9. Kiểm tra cấu trúc bảng Guild
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Guild'
ORDER BY ORDINAL_POSITION;

-- 10. Kiểm tra cấu trúc bảng GuildMember
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'GuildMember'
ORDER BY ORDINAL_POSITION;

-- 11. Kiểm tra guild của testuser6 (nếu có)
SELECT 
    g.G_Name,
    g.G_Master,
    g.G_Score,
    g.G_Count,
    gm.Name as MemberName,
    gm.G_Status
FROM Guild g
INNER JOIN GuildMember gm ON g.G_Name = gm.G_Name
WHERE gm.Name IN (
    SELECT Name FROM Character WHERE AccountID = 'testuser6'
);

-- 12. Đếm số lượng character của testuser6
SELECT 
    AccountID,
    COUNT(*) as CharacterCount
FROM Character 
WHERE AccountID = 'testuser6'
GROUP BY AccountID;

-- 13. Kiểm tra tất cả account có trong hệ thống
SELECT 
    COUNT(*) as TotalAccounts,
    COUNT(CASE WHEN bloc_code = '0' THEN 1 END) as ActiveAccounts,
    COUNT(CASE WHEN bloc_code != '0' THEN 1 END) as BlockedAccounts
FROM MEMB_INFO;

-- 14. Kiểm tra top 10 account có nhiều character nhất
SELECT TOP 10
    AccountID,
    COUNT(*) as CharacterCount,
    MAX(cLevel) as HighestLevel,
    SUM(Money) as TotalMoney
FROM Character 
GROUP BY AccountID
ORDER BY CharacterCount DESC, HighestLevel DESC;

-- 15. Kiểm tra kết nối database
SELECT 
    @@SERVERNAME as ServerName,
    DB_NAME() as DatabaseName,
    @@VERSION as SQLVersion,
    GETDATE() as CurrentTime;
