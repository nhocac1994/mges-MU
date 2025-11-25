-- Script SQL để tìm account có sẵn trong hệ thống
-- Chạy từng phần để kiểm tra

-- 1. Tìm 10 account đầu tiên
SELECT TOP 10
    memb___id as Username,
    memb_name as CharacterName,
    mail_addr as Email,
    appl_days as CreatedDate,
    bloc_code as BlockStatus
FROM MEMB_INFO
ORDER BY appl_days DESC;

-- 2. Tìm account có character
SELECT TOP 10
    c.AccountID,
    c.Name as CharacterName,
    c.cLevel,
    c.Class,
    c.Money,
    c.ResetCount,
    c.MasterResetCount
FROM Character c
ORDER BY c.cLevel DESC, c.Experience DESC;

-- 3. Tìm account có thông tin MEMB_STAT
SELECT TOP 10
    memb___id,
    ConnectStat as IsOnline,
    ServerName,
    IP,
    ConnectTM,
    DisConnectTM,
    OnlineHours
FROM MEMB_STAT
ORDER BY OnlineHours DESC;

-- 4. Tìm account có warehouse
SELECT TOP 10
    AccountID,
    Money as WarehouseMoney
FROM warehouse
ORDER BY Money DESC;

-- 5. Kiểm tra account cụ thể (thay 'ACCOUNT_NAME' bằng tên account thực tế)
-- Ví dụ: kiểm tra account đầu tiên từ query 1
SELECT 
    memb___id as Username,
    memb_name as CharacterName,
    mail_addr as Email,
    appl_days as CreatedDate,
    bloc_code as BlockStatus
FROM MEMB_INFO 
WHERE memb___id = 'NHOCAC'; -- Thay bằng account thực tế
