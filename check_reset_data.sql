-- Script SQL để kiểm tra dữ liệu ResetData
-- Chạy từng phần để kiểm tra

-- 1. Kiểm tra cấu trúc bảng ResetData
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'ResetData'
ORDER BY ORDINAL_POSITION;

-- 2. Kiểm tra dữ liệu trong ResetData
SELECT TOP 10
    Account,
    Name,
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
ORDER BY ResetDay DESC, ResetWek DESC, ResetMon DESC;

-- 3. Kiểm tra ResetData cho account Bigbinss2
SELECT 
    Account,
    Name,
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
WHERE Account = 'Bigbinss2';

-- 4. Kiểm tra ResetData cho character 543gde5
SELECT 
    Account,
    Name,
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
WHERE Account = 'Bigbinss2' AND Name = '543gde5';

-- 5. Đếm tổng số records trong ResetData
SELECT COUNT(*) as TotalResetRecords FROM ResetData;

-- 6. Tạo dữ liệu test cho ResetData (nếu cần)
-- INSERT INTO ResetData (Account, Name, ResetDay, ResetWek, ResetMon, ResetDateDay, ResetDateWek, ResetDateMon, MasterResetDay, MasterResetWek, MasterResetMon, MasterResetDateDay, MasterResetDateWek, MasterResetDateMon)
-- VALUES ('Bigbinss2', '543gde5', 5, 2, 1, GETDATE(), GETDATE(), GETDATE(), 1, 0, 0, GETDATE(), GETDATE(), GETDATE());
