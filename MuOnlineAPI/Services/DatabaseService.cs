using Microsoft.Data.SqlClient;
using MuOnlineAPI.Models;
using System.Data;

namespace MuOnlineAPI.Services
{
    public interface IDatabaseService
    {
        Task<bool> ValidateLoginAsync(string username, string password);
        Task<Account?> GetAccountAsync(string accountId);
        Task<List<Character>> GetCharactersAsync(string accountId);
        Task<bool> CreateAccountAsync(RegisterRequest request);
        Task<bool> UpdatePasswordAsync(string accountId, string newPassword, string? currentPassword = null);
        Task<bool> UpdateAccountAsync(string accountId, UpdateAccountData updateData);
        Task<DashboardData?> GetDashboardDataAsync(string accountId);
    }

    public class DatabaseService : IDatabaseService
    {
        private readonly string _connectionString;
        private readonly ILogger<DatabaseService> _logger;

        public DatabaseService(IConfiguration configuration, ILogger<DatabaseService> logger)
        {
            _connectionString = configuration.GetConnectionString("MuOnlineDB") 
                ?? throw new InvalidOperationException("Connection string 'MuOnlineDB' not found.");
            _logger = logger;
        }

        public async Task<bool> ValidateLoginAsync(string username, string password)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var query = "SELECT COUNT(*) FROM MEMB_INFO WHERE memb___id = @username AND memb__pwd = @password";
                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@username", username);
                command.Parameters.AddWithValue("@password", password);

                var result = await command.ExecuteScalarAsync();
                return Convert.ToInt32(result) > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error validating login for username: {Username}", username);
                return false;
            }
        }

        public async Task<Account?> GetAccountAsync(string accountId)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                // Thử query với CAST để xử lý varbinary
                var query = @"
                    SELECT 
                        memb___id as Username,
                        memb_name as CharacterName,
                        mail_addr as Email,
                        appl_days as CreatedDate,
                        bloc_code as BlockStatus,
                        AccountLevel,
                        AccountExpireDate
                    FROM MEMB_INFO 
                    WHERE CAST(memb___id AS VARCHAR(10)) = @accountId 
                       OR memb___id = @accountId";

                using var command = new SqlCommand(query, connection);
                // Thử cả string và varbinary
                command.Parameters.AddWithValue("@accountId", accountId);
                
                _logger.LogDebug("Querying account with accountId: {AccountId}", accountId);

                using var reader = await command.ExecuteReaderAsync();
                if (await reader.ReadAsync())
                {
                    try
                    {
                        var usernameOrdinal = reader.GetOrdinal("Username");
                        var characterNameOrdinal = reader.GetOrdinal("CharacterName");
                        var emailOrdinal = reader.GetOrdinal("Email");
                        var createdDateOrdinal = reader.GetOrdinal("CreatedDate");
                        var blockStatusOrdinal = reader.GetOrdinal("BlockStatus");
                        var accountLevelOrdinal = reader.GetOrdinal("AccountLevel");
                        var accountExpireDateOrdinal = reader.GetOrdinal("AccountExpireDate");

                        // Xử lý Username (có thể là varbinary)
                        string username = "";
                        if (!reader.IsDBNull(usernameOrdinal))
                        {
                            var usernameObj = reader.GetValue(usernameOrdinal);
                            username = usernameObj is byte[] bytes ? System.Text.Encoding.UTF8.GetString(bytes).TrimEnd('\0') : usernameObj?.ToString() ?? "";
                        }

                        // Xử lý CharacterName
                        string characterName = "";
                        if (!reader.IsDBNull(characterNameOrdinal))
                        {
                            var charNameObj = reader.GetValue(characterNameOrdinal);
                            characterName = charNameObj is byte[] charBytes ? System.Text.Encoding.UTF8.GetString(charBytes).TrimEnd('\0') : charNameObj?.ToString() ?? "";
                        }

                        // Xử lý Email
                        string email = "";
                        if (!reader.IsDBNull(emailOrdinal))
                        {
                            var emailObj = reader.GetValue(emailOrdinal);
                            email = emailObj is byte[] emailBytes ? System.Text.Encoding.UTF8.GetString(emailBytes).TrimEnd('\0') : emailObj?.ToString() ?? "";
                        }

                        // Xử lý CreatedDate
                        DateTime? createdDate = null;
                        if (!reader.IsDBNull(createdDateOrdinal))
                        {
                            var dateObj = reader.GetValue(createdDateOrdinal);
                            if (dateObj is DateTime dt)
                            {
                                createdDate = dt;
                            }
                            else if (DateTime.TryParse(dateObj?.ToString(), out var parsedDate))
                            {
                                createdDate = parsedDate;
                            }
                        }

                        // Xử lý BlockStatus (có thể là tinyint)
                        int blockStatus = 0;
                        if (!reader.IsDBNull(blockStatusOrdinal))
                        {
                            blockStatus = Convert.ToInt32(reader.GetValue(blockStatusOrdinal));
                        }

                        // Xử lý AccountLevel (có thể NULL hoặc không tồn tại)
                        int accountLevel = 0;
                        if (!reader.IsDBNull(accountLevelOrdinal))
                        {
                            accountLevel = Convert.ToInt32(reader.GetValue(accountLevelOrdinal));
                        }

                        // Xử lý AccountExpireDate
                        DateTime? accountExpireDate = null;
                        if (!reader.IsDBNull(accountExpireDateOrdinal))
                        {
                            var expireObj = reader.GetValue(accountExpireDateOrdinal);
                            if (expireObj is DateTime expireDt)
                            {
                                accountExpireDate = expireDt;
                            }
                            else if (DateTime.TryParse(expireObj?.ToString(), out var parsedExpireDate))
                            {
                                accountExpireDate = parsedExpireDate;
                            }
                        }

                        return new Account
                        {
                            Username = username,
                            CharacterName = characterName,
                            Email = email,
                            CreatedDate = createdDate,
                            BlockStatus = blockStatus,
                            AccountLevel = accountLevel,
                            AccountExpireDate = accountExpireDate
                        };
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error parsing account data for: {AccountId}, Message: {Message}, StackTrace: {StackTrace}", accountId, ex.Message, ex.StackTrace);
                        return null;
                    }
                }
                _logger.LogWarning("Account not found in database: {AccountId}", accountId);
                return null;
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL Error getting account: {AccountId}, ErrorNumber: {ErrorNumber}, Message: {Message}", accountId, sqlEx.Number, sqlEx.Message);
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting account: {AccountId}, Message: {Message}, StackTrace: {StackTrace}", accountId, ex.Message, ex.StackTrace);
                return null;
            }
        }

        public async Task<List<Character>> GetCharactersAsync(string accountId)
        {
            var characters = new List<Character>();
            try
            {
                // Trim accountId để loại bỏ khoảng trắng
                accountId = accountId?.Trim() ?? string.Empty;
                
                if (string.IsNullOrWhiteSpace(accountId))
                {
                    _logger.LogWarning("GetCharactersAsync called with empty accountId");
                    return characters;
                }

                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                // Query đơn giản - AccountID trong database là VARCHAR(10)
                // Thử nhiều cách để đảm bảo tìm được dữ liệu
                var query = @"
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
                       OR CAST(AccountID AS VARCHAR(10)) = @accountId
                       OR RTRIM(LTRIM(CAST(AccountID AS VARCHAR(10)))) = @accountId
                    ORDER BY cLevel DESC, ResetCount DESC, MasterResetCount DESC";

                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@accountId", accountId);

                using var reader = await command.ExecuteReaderAsync();
                int count = 0;
                int rowCount = 0;
                
                while (await reader.ReadAsync())
                {
                    rowCount++;
                    count++;
                    
                    try
                    {
                        // Xử lý Name có thể là varbinary hoặc varchar
                        string characterName;
                        var nameValue = reader["Name"];
                        if (nameValue is byte[] nameBytes)
                        {
                            characterName = System.Text.Encoding.UTF8.GetString(nameBytes).TrimEnd('\0').Trim();
                        }
                        else if (nameValue is DBNull)
                        {
                            characterName = string.Empty;
                            _logger.LogWarning("Character name is NULL for row {RowCount}", rowCount);
                        }
                        else
                        {
                            characterName = reader.GetString("Name")?.Trim() ?? string.Empty;
                        }

                        var classId = Convert.ToInt32(reader["Class"]);
                        characters.Add(new Character
                        {
                            Name = characterName,
                            Level = Convert.ToInt32(reader["cLevel"]),
                            Class = classId,
                            ClassName = GetClassName(classId),
                            ResetCount = Convert.ToInt32(reader["ResetCount"]),
                            MasterResetCount = Convert.ToInt32(reader["MasterResetCount"]),
                            Money = Convert.ToInt64(reader["Money"]),
                            MapNumber = Convert.ToInt32(reader["MapNumber"]),
                            MapPosX = Convert.ToInt32(reader["MapPosX"]),
                            MapPosY = Convert.ToInt32(reader["MapPosY"]),
                            PkCount = Convert.ToInt32(reader["PKCount"]),
                            PkLevel = Convert.ToInt32(reader["PKLevel"]),
                            Life = Convert.ToInt32(reader["Life"]),
                            MaxLife = Convert.ToInt32(reader["MaxLife"]),
                            Mana = Convert.ToInt32(reader["Mana"]),
                            MaxMana = Convert.ToInt32(reader["MaxMana"]),
                            Stats = new CharacterStats
                            {
                                Strength = Convert.ToInt32(reader["Strength"]),
                                Dexterity = Convert.ToInt32(reader["Dexterity"]),
                                Vitality = Convert.ToInt32(reader["Vitality"]),
                                Energy = Convert.ToInt32(reader["Energy"]),
                                Leadership = Convert.ToInt32(reader["Leadership"])
                            }
                        });
                    }
                    catch (Exception rowEx)
                    {
                        _logger.LogWarning(rowEx, "Error reading character row {Count} for account {AccountId}, skipping. Error: {Error}", count, accountId, rowEx.Message);
                    }
                }

                if (rowCount == 0)
                {
                    _logger.LogWarning("No characters found for accountId: {AccountId}", accountId);
                }
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL Error getting characters for account: {AccountId}, ErrorNumber: {ErrorNumber}, Message: {Message}", 
                    accountId, sqlEx.Number, sqlEx.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting characters for account: {AccountId}, Message: {Message}", 
                    accountId, ex.Message);
            }
            return characters;
        }

        public async Task<bool> CreateAccountAsync(RegisterRequest request)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                // Check if username already exists
                var checkQuery = "SELECT COUNT(*) FROM MEMB_INFO WHERE memb___id = @username";
                using var checkCommand = new SqlCommand(checkQuery, connection);
                checkCommand.Parameters.AddWithValue("@username", request.Username);
                var exists = Convert.ToInt32(await checkCommand.ExecuteScalarAsync()) > 0;

                if (exists)
                {
                    return false;
                }

                // Insert new account
                var insertQuery = @"
                    INSERT INTO MEMB_INFO (
                        memb___id, memb__pwd, memb_name, sno__numb, mail_addr, tel__numb,
                        fpas_ques, fpas_answ, appl_days, bloc_code, ctl1_code,
                        AccountLevel, AccountExpireDate
                    ) VALUES (
                        @username, @password, @characterName, '000000000000000000', @email, @phone,
                        @securityQuestion, @securityAnswer, GETDATE(), '0', '0',
                        0, '2079-06-06'
                    )";

                using var insertCommand = new SqlCommand(insertQuery, connection);
                insertCommand.Parameters.AddWithValue("@username", request.Username);
                insertCommand.Parameters.AddWithValue("@password", request.Password);
                insertCommand.Parameters.AddWithValue("@characterName", request.CharacterName);
                insertCommand.Parameters.AddWithValue("@email", request.Email);
                insertCommand.Parameters.AddWithValue("@phone", request.Phone);
                insertCommand.Parameters.AddWithValue("@securityQuestion", request.SecurityQuestion);
                insertCommand.Parameters.AddWithValue("@securityAnswer", request.SecurityAnswer);

                await insertCommand.ExecuteNonQueryAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating account: {Username}", request.Username);
                return false;
            }
        }

        public async Task<bool> UpdatePasswordAsync(string accountId, string newPassword, string? currentPassword = null)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                // Check current password if provided
                if (!string.IsNullOrEmpty(currentPassword))
                {
                    var checkQuery = "SELECT memb__pwd FROM MEMB_INFO WHERE memb___id = @accountId";
                    using var checkCommand = new SqlCommand(checkQuery, connection);
                    checkCommand.Parameters.AddWithValue("@accountId", accountId);
                    var storedPassword = await checkCommand.ExecuteScalarAsync() as string;

                    if (storedPassword != currentPassword)
                    {
                        return false;
                    }
                }

                // Update password
                var updateQuery = "UPDATE MEMB_INFO SET memb__pwd = @newPassword WHERE memb___id = @accountId";
                using var updateCommand = new SqlCommand(updateQuery, connection);
                updateCommand.Parameters.AddWithValue("@accountId", accountId);
                updateCommand.Parameters.AddWithValue("@newPassword", newPassword);

                await updateCommand.ExecuteNonQueryAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating password for account: {AccountId}", accountId);
                return false;
            }
        }

        public async Task<bool> UpdateAccountAsync(string accountId, UpdateAccountData updateData)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var updateFields = new List<string>();
                var parameters = new List<SqlParameter> { new SqlParameter("@accountId", accountId) };

                if (!string.IsNullOrEmpty(updateData.MembName))
                {
                    updateFields.Add("memb_name = @membName");
                    parameters.Add(new SqlParameter("@membName", updateData.MembName));
                }
                if (!string.IsNullOrEmpty(updateData.MailAddr))
                {
                    updateFields.Add("mail_addr = @mailAddr");
                    parameters.Add(new SqlParameter("@mailAddr", updateData.MailAddr));
                }
                if (!string.IsNullOrEmpty(updateData.SnoNumb))
                {
                    updateFields.Add("sno__numb = @snoNumb");
                    parameters.Add(new SqlParameter("@snoNumb", updateData.SnoNumb));
                }
                if (!string.IsNullOrEmpty(updateData.PostCode))
                {
                    updateFields.Add("post_code = @postCode");
                    parameters.Add(new SqlParameter("@postCode", updateData.PostCode));
                }
                if (!string.IsNullOrEmpty(updateData.AddrInfo))
                {
                    updateFields.Add("addr_info = @addrInfo");
                    parameters.Add(new SqlParameter("@addrInfo", updateData.AddrInfo));
                }
                if (!string.IsNullOrEmpty(updateData.AddrDeta))
                {
                    updateFields.Add("addr_deta = @addrDeta");
                    parameters.Add(new SqlParameter("@addrDeta", updateData.AddrDeta));
                }
                if (!string.IsNullOrEmpty(updateData.TelNumb))
                {
                    updateFields.Add("tel__numb = @telNumb");
                    parameters.Add(new SqlParameter("@telNumb", updateData.TelNumb));
                }
                if (!string.IsNullOrEmpty(updateData.PhonNumb))
                {
                    updateFields.Add("phon_numb = @phonNumb");
                    parameters.Add(new SqlParameter("@phonNumb", updateData.PhonNumb));
                }

                if (updateFields.Count == 0)
                {
                    return false;
                }

                var updateQuery = $"UPDATE MEMB_INFO SET {string.Join(", ", updateFields)} WHERE memb___id = @accountId";
                using var updateCommand = new SqlCommand(updateQuery, connection);
                updateCommand.Parameters.AddRange(parameters.ToArray());

                await updateCommand.ExecuteNonQueryAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating account: {AccountId}", accountId);
                return false;
            }
        }

        public async Task<DashboardData?> GetDashboardDataAsync(string accountId)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var dashboardData = new DashboardData();

                // Get account info
                var account = await GetAccountAsync(accountId);
                if (account == null)
                {
                    _logger.LogWarning("Account not found in GetDashboardDataAsync: {AccountId}", accountId);
                    return null;
                }

                // Get character count
                var charCountQuery = "SELECT COUNT(*) FROM Character WHERE AccountID = @accountId";
                using var charCountCommand = new SqlCommand(charCountQuery, connection);
                charCountCommand.Parameters.AddWithValue("@accountId", accountId);
                var charCount = Convert.ToInt32(await charCountCommand.ExecuteScalarAsync());

                // Get main character
                var characterQuery = @"
                    SELECT TOP 1 
                        c.Name, c.cLevel, c.Experience, c.Class, c.Strength, c.Dexterity,
                        c.Vitality, c.Energy, c.Leadership, c.Money, c.Life, c.MaxLife,
                        c.Mana, c.MaxMana, c.MapNumber, c.MapPosX, c.MapPosY, c.PkCount,
                        c.PkLevel, c.ResetCount, c.MasterResetCount
                    FROM Character c
                    WHERE c.AccountID = @accountId
                    ORDER BY c.cLevel DESC, c.Experience DESC";

                using var characterCommand = new SqlCommand(characterQuery, connection);
                characterCommand.Parameters.AddWithValue("@accountId", accountId);
                CharacterInfo? characterInfo = null;

                using (var reader = await characterCommand.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        // Xử lý tất cả các field với Convert để tránh lỗi cast
                        var levelOrdinal = reader.GetOrdinal("cLevel");
                        var currentLevel = reader.IsDBNull(levelOrdinal) ? 0 : Convert.ToInt32(reader.GetValue(levelOrdinal));
                        
                        // Xử lý Experience (có thể là Int32 hoặc Int64)
                        var expOrdinal = reader.GetOrdinal("Experience");
                        var currentExp = reader.IsDBNull(expOrdinal) ? 0L : Convert.ToInt64(reader.GetValue(expOrdinal));
                        var nextLevelExp = (long)Math.Floor(Math.Pow(currentLevel, 2) * 100);
                        var expProgress = Math.Min((currentExp / (double)nextLevelExp) * 100, 100);

                        // Xử lý Money (có thể là Int32 hoặc Int64)
                        var moneyOrdinal = reader.GetOrdinal("Money");
                        var money = reader.IsDBNull(moneyOrdinal) ? 0L : Convert.ToInt64(reader.GetValue(moneyOrdinal));

                        // Helper function để đọc Int32 an toàn
                        int GetInt32Safe(string columnName)
                        {
                            var ordinal = reader.GetOrdinal(columnName);
                            return reader.IsDBNull(ordinal) ? 0 : Convert.ToInt32(reader.GetValue(ordinal));
                        }

                        characterInfo = new CharacterInfo
                        {
                            Name = reader.GetString("Name"),
                            Level = currentLevel,
                            Experience = currentExp,
                            NextLevelExp = nextLevelExp,
                            ExpProgress = expProgress,
                            Class = GetInt32Safe("Class"),
                            Strength = GetInt32Safe("Strength"),
                            Dexterity = GetInt32Safe("Dexterity"),
                            Vitality = GetInt32Safe("Vitality"),
                            Energy = GetInt32Safe("Energy"),
                            Leadership = GetInt32Safe("Leadership"),
                            Money = money,
                            Life = GetInt32Safe("Life"),
                            MaxLife = GetInt32Safe("MaxLife"),
                            Mana = GetInt32Safe("Mana"),
                            MaxMana = GetInt32Safe("MaxMana"),
                            MapNumber = GetInt32Safe("MapNumber"),
                            MapPosX = GetInt32Safe("MapPosX"),
                            MapPosY = GetInt32Safe("MapPosY"),
                            PkCount = GetInt32Safe("PkCount"),
                            PkLevel = GetInt32Safe("PkLevel"),
                            ResetCount = GetInt32Safe("ResetCount"),
                            MasterResetCount = GetInt32Safe("MasterResetCount")
                        };
                    }
                }

                // Get MEMB_STAT
                var membStatQuery = @"
                    SELECT ConnectStat, ServerName, IP, ConnectTM, DisConnectTM, OnlineHours
                    FROM MEMB_STAT
                    WHERE memb___id = @accountId";

                using var membStatCommand = new SqlCommand(membStatQuery, connection);
                membStatCommand.Parameters.AddWithValue("@accountId", accountId);
                bool isOnline = false;
                DateTime? connectTime = null;
                DateTime? disconnectTime = null;
                int totalPlayTime = 0;

                using (var reader = await membStatCommand.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        var connectStatOrdinal = reader.GetOrdinal("ConnectStat");
                        isOnline = reader.IsDBNull(connectStatOrdinal) ? false : Convert.ToInt32(reader.GetValue(connectStatOrdinal)) == 1;
                        connectTime = reader.IsDBNull("ConnectTM") ? null : reader.GetDateTime("ConnectTM");
                        disconnectTime = reader.IsDBNull("DisConnectTM") ? null : reader.GetDateTime("DisConnectTM");
                        var onlineHoursOrdinal = reader.GetOrdinal("OnlineHours");
                        totalPlayTime = reader.IsDBNull(onlineHoursOrdinal) ? 0 : Convert.ToInt32(reader.GetValue(onlineHoursOrdinal));
                    }
                }

                if (characterInfo != null)
                {
                    characterInfo.IsOnline = isOnline;
                    characterInfo.ConnectTime = connectTime;
                    characterInfo.DisconnectTime = disconnectTime;
                    characterInfo.TotalPlayTime = totalPlayTime;
                    characterInfo.PlayTimeHours = totalPlayTime;
                    characterInfo.PlayTimeMinutes = 0;
                }

                // Get ResetData
                var resetDataQuery = @"
                    SELECT 
                        ResetDay, ResetWek, ResetMon,
                        ResetDateDay, ResetDateWek, ResetDateMon,
                        MasterResetDay, MasterResetWek, MasterResetMon,
                        MasterResetDateDay, MasterResetDateWek, MasterResetDateMon
                    FROM ResetData
                    WHERE Account = @accountId AND Name = @characterName";

                ResetInfo? resetInfo = null;
                if (characterInfo != null)
                {
                    using var resetDataCommand = new SqlCommand(resetDataQuery, connection);
                    resetDataCommand.Parameters.AddWithValue("@accountId", accountId);
                    resetDataCommand.Parameters.AddWithValue("@characterName", characterInfo.Name);

                    using (var reader = await resetDataCommand.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            // Helper function để đọc Int32 an toàn
                            int GetInt32Safe(string columnName)
                            {
                                var ordinal = reader.GetOrdinal(columnName);
                                return reader.IsDBNull(ordinal) ? 0 : Convert.ToInt32(reader.GetValue(ordinal));
                            }

                            resetInfo = new ResetInfo
                            {
                                DailyReset = GetInt32Safe("ResetDay"),
                                WeeklyReset = GetInt32Safe("ResetWek"),
                                MonthlyReset = GetInt32Safe("ResetMon"),
                                LastDailyReset = reader.IsDBNull("ResetDateDay") ? null : reader.GetDateTime("ResetDateDay"),
                                LastWeeklyReset = reader.IsDBNull("ResetDateWek") ? null : reader.GetDateTime("ResetDateWek"),
                                LastMonthlyReset = reader.IsDBNull("ResetDateMon") ? null : reader.GetDateTime("ResetDateMon"),
                                MasterDailyReset = GetInt32Safe("MasterResetDay"),
                                MasterWeeklyReset = GetInt32Safe("MasterResetWek"),
                                MasterMonthlyReset = GetInt32Safe("MasterResetMon"),
                                LastMasterDailyReset = reader.IsDBNull("MasterResetDateDay") ? null : reader.GetDateTime("MasterResetDateDay"),
                                LastMasterWeeklyReset = reader.IsDBNull("MasterResetDateWek") ? null : reader.GetDateTime("MasterResetDateWek"),
                                LastMasterMonthlyReset = reader.IsDBNull("MasterResetDateMon") ? null : reader.GetDateTime("MasterResetDateMon"),
                                TotalResetCount = characterInfo.ResetCount,
                                TotalMasterResetCount = characterInfo.MasterResetCount
                            };
                        }
                    }
                }

                // Get Warehouse
                var warehouseQuery = "SELECT Money as WarehouseMoney FROM warehouse WHERE AccountID = @accountId";
                using var warehouseCommand = new SqlCommand(warehouseQuery, connection);
                warehouseCommand.Parameters.AddWithValue("@accountId", accountId);
                WarehouseInfo? warehouseInfo = null;

                using (var reader = await warehouseCommand.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        // Xử lý WarehouseMoney (có thể là Int32 hoặc Int64)
                        var warehouseMoneyOrdinal = reader.GetOrdinal("WarehouseMoney");
                        var warehouseMoney = reader.IsDBNull(warehouseMoneyOrdinal) ? 0L : Convert.ToInt64(reader.GetValue(warehouseMoneyOrdinal));
                        
                        warehouseInfo = new WarehouseInfo
                        {
                            Money = warehouseMoney
                        };
                    }
                }

                // Get Guild
                GuildInfo? guildInfo = null;
                if (characterInfo != null)
                {
                    var guildQuery = @"
                        SELECT g.G_Name, g.G_Master, g.G_Score, g.G_Count
                        FROM Guild g
                        INNER JOIN GuildMember gm ON g.G_Name = gm.G_Name
                        WHERE gm.Name = @characterName";

                    using var guildCommand = new SqlCommand(guildQuery, connection);
                    guildCommand.Parameters.AddWithValue("@characterName", characterInfo.Name);

                    using (var reader = await guildCommand.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            var gScoreOrdinal = reader.GetOrdinal("G_Score");
                            var gCountOrdinal = reader.GetOrdinal("G_Count");
                            
                            guildInfo = new GuildInfo
                            {
                                Name = reader.GetString("G_Name"),
                                Master = reader.GetString("G_Master"),
                                Score = reader.IsDBNull(gScoreOrdinal) ? 0 : Convert.ToInt32(reader.GetValue(gScoreOrdinal)),
                                MemberCount = reader.IsDBNull(gCountOrdinal) ? 0 : Convert.ToInt32(reader.GetValue(gCountOrdinal))
                            };
                        }
                    }
                }

                // Build dashboard data
                dashboardData.Account = new AccountInfo
                {
                    Id = accountId,
                    CharacterCount = charCount,
                    Level = account.AccountLevel,
                    LevelName = GetAccountLevelName(account.AccountLevel),
                    LevelColor = GetAccountLevelColor(account.AccountLevel),
                    ExpireDate = account.AccountExpireDate,
                    IsExpired = account.AccountExpireDate.HasValue && account.AccountExpireDate.Value < DateTime.Now
                };
                dashboardData.Character = characterInfo;
                dashboardData.Reset = resetInfo;
                dashboardData.Warehouse = warehouseInfo;
                dashboardData.Guild = guildInfo;

                return dashboardData;
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL Error getting dashboard data for account: {AccountId}, ErrorNumber: {ErrorNumber}, Message: {Message}", accountId, sqlEx.Number, sqlEx.Message);
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting dashboard data for account: {AccountId}, Message: {Message}, StackTrace: {StackTrace}", accountId, ex.Message, ex.StackTrace);
                return null;
            }
        }

        private string GetClassName(int classId)
        {
            return classId switch
            {
                0 => "Dark Wizard",
                1 => "Soul Master",
                2 => "Grand Master",
                3 => "Dark Knight",
                4 => "Blade Knight",
                5 => "Blade Master",
                6 => "Fairy Elf",
                7 => "Muse Elf",
                8 => "High Elf",
                16 => "Magic Gladiator",
                17 => "Dark Lord",
                32 => "Summoner",
                33 => "Bloody Summoner",
                34 => "Dimension Master",
                48 => "Rage Fighter",
                50 => "Fist Master",
                64 => "Grow Lancer",
                65 => "Mirage Lancer",
                66 => "Shining Lancer",
                _ => $"Unknown ({classId})"
            };
        }

        private string GetAccountLevelName(int level)
        {
            return level switch
            {
                1 => "Đồng",
                2 => "Bạc",
                3 => "Vàng",
                _ => "Thường"
            };
        }

        private string GetAccountLevelColor(int level)
        {
            return level switch
            {
                1 => "#CD7F32", // Bronze/Đồng
                2 => "#C0C0C0", // Silver/Bạc
                3 => "#FFD700", // Gold/Vàng
                _ => "#808080"  // Gray/Thường
            };
        }
    }
}

