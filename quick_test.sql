-- Script SQL đơn giản để test nhanh
-- Chạy từng câu lệnh để kiểm tra

-- 1. Test kết nối database
SELECT 'Database Connected Successfully' as Status, GETDATE() as Time;

-- 2. Kiểm tra account testuser6 có tồn tại không
SELECT 
    memb___id as Username,
    memb_name as CharacterName,
    mail_addr as Email,
    appl_days as CreatedDate,
    bloc_code as BlockStatus
FROM MEMB_INFO 
WHERE memb___id = 'testuser6';

-- 3. Kiểm tra character của testuser6
SELECT 
    Name as CharacterName,
    cLevel as Level,
    Experience,
    Class,
    Money,
    ResetCount,
    MasterResetCount
FROM Character 
WHERE AccountID = 'testuser6';

-- 3.5. Kiểm tra thông tin kết nối của testuser6
SELECT 
    memb___id,
    ConnectStat as IsOnline,
    ServerName,
    IP,
    ConnectTM,
    DisConnectTM,
    OnlineHours
FROM MEMB_STAT 
WHERE memb___id = 'testuser6';

-- 4. Kiểm tra warehouse của testuser6
SELECT 
    AccountID,
    Money as WarehouseMoney
FROM warehouse 
WHERE AccountID = 'testuser6';

-- 5. Kiểm tra reset data của testuser6 (từ bảng Character)
SELECT 
    AccountID,
    Name,
    ResetCount,
    MasterResetCount
FROM Character 
WHERE AccountID = 'testuser6';

-- 6. Đếm tổng số account và character
SELECT 
    (SELECT COUNT(*) FROM MEMB_INFO) as TotalAccounts,
    (SELECT COUNT(*) FROM Character) as TotalCharacters,
    (SELECT COUNT(*) FROM Character WHERE AccountID = 'testuser6') as TestUserCharacters;
