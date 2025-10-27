-- Script SQL để test account level
-- Chạy từng phần để kiểm tra

-- 1. Kiểm tra account level hiện tại
SELECT 
    memb___id as Username,
    AccountLevel,
    AccountExpireDate,
    CASE 
        WHEN AccountLevel = 1 THEN 'Đồng'
        WHEN AccountLevel = 2 THEN 'Bạc'
        WHEN AccountLevel = 3 THEN 'Vàng'
        ELSE 'Thường'
    END as LevelName
FROM MEMB_INFO 
WHERE memb___id IN ('Bigbinss2', 'NHOCAC', 'chum2')
ORDER BY AccountLevel DESC;

-- 2. Cập nhật account level để test (tùy chọn)
-- UPDATE MEMB_INFO SET AccountLevel = 1, AccountExpireDate = DATEADD(day, 30, GETDATE()) WHERE memb___id = 'Bigbinss2';
-- UPDATE MEMB_INFO SET AccountLevel = 2, AccountExpireDate = DATEADD(day, 60, GETDATE()) WHERE memb___id = 'NHOCAC';
-- UPDATE MEMB_INFO SET AccountLevel = 3, AccountExpireDate = DATEADD(day, 90, GETDATE()) WHERE memb___id = 'chum2';

-- 3. Kiểm tra account đã hết hạn
SELECT 
    memb___id as Username,
    AccountLevel,
    AccountExpireDate,
    CASE 
        WHEN AccountExpireDate < GETDATE() THEN 'Đã hết hạn'
        ELSE 'Còn hiệu lực'
    END as Status
FROM MEMB_INFO 
WHERE AccountLevel > 0
ORDER BY AccountExpireDate ASC;
