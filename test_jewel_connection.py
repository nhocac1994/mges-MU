#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script kiểm tra kết nối SQL Server và bảng JewelBank
"""

import pyodbc
import os
import configparser

def load_config(config_file='config.ini'):
    """Đọc cấu hình từ file config.ini"""
    config = configparser.ConfigParser()
    
    default_config = {
        'server': 'localhost',
        'database': 'MuOnline',
        'username': 'sa',
        'password': '',
        'driver': '{ODBC Driver 17 for SQL Server}'
    }
    
    if not os.path.exists(config_file):
        print(f"⚠️  Không tìm thấy file {config_file}")
        return default_config
    
    try:
        config.read(config_file, encoding='utf-8')
        if 'DATABASE' not in config:
            return default_config
        
        return {
            'server': config.get('DATABASE', 'server', fallback=default_config['server']),
            'database': config.get('DATABASE', 'database', fallback=default_config['database']),
            'username': config.get('DATABASE', 'username', fallback=default_config['username']),
            'password': config.get('DATABASE', 'password', fallback=default_config['password']),
            'driver': config.get('DATABASE', 'driver', fallback=default_config['driver'])
        }
    except Exception as e:
        print(f"❌ Lỗi đọc config.ini: {e}")
        return default_config

DB_CONFIG = load_config()

def test_connection():
    """Kiểm tra kết nối và bảng JewelBank"""
    print("🔍 Đang kiểm tra kết nối SQL Server...\n")
    
    # Thử các driver
    drivers = [
        '{ODBC Driver 17 for SQL Server}',
        '{ODBC Driver 18 for SQL Server}',
        '{SQL Server}',
        '{SQL Server Native Client 11.0}'
    ]
    
    conn = None
    driver_used = None
    
    # Thử driver từ config trước
    if DB_CONFIG.get('driver'):
        drivers.insert(0, DB_CONFIG['driver'])
    
    for driver in drivers:
        try:
            print(f"  Đang thử driver: {driver}")
            connection_string = (
                f"DRIVER={driver};"
                f"SERVER={DB_CONFIG['server']};"
                f"DATABASE={DB_CONFIG['database']};"
                f"UID={DB_CONFIG['username']};"
                f"PWD={DB_CONFIG['password']};"
                "TrustServerCertificate=yes;"
            )
            conn = pyodbc.connect(connection_string, timeout=5)
            driver_used = driver
            print(f"  ✅ Kết nối thành công với driver: {driver}\n")
            break
        except Exception as e:
            print(f"  ❌ Lỗi: {str(e)[:50]}...\n")
            continue
    
    if not conn:
        print("❌ Không thể kết nối với bất kỳ driver nào!")
        print("\n💡 Hãy cài đặt ODBC Driver:")
        print("   Windows: https://aka.ms/downloadmsodbcsql")
        print("   Linux: sudo apt-get install unixodbc-dev")
        print("   macOS: brew install unixodbc")
        return False
    
    try:
        # Kiểm tra bảng JewelBank
        cursor = conn.cursor()
        cursor.execute("""
            SELECT COUNT(*) 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'JewelBank'
        """)
        table_exists = cursor.fetchone()[0] > 0
        
        if table_exists:
            print("✅ Bảng JewelBank tồn tại")
            
            # Đếm số bản ghi
            cursor.execute("SELECT COUNT(*) FROM JewelBank")
            count = cursor.fetchone()[0]
            print(f"✅ Số tài khoản có ngọc: {count:,}")
            
            # Đếm số tài khoản có ngọc > 0
            cursor.execute("""
                SELECT COUNT(*) 
                FROM JewelBank 
                WHERE (Chaos + Bless + Soul + Life + Creation + 
                       Guardian + Stone + Harmony + Lower + Higher) > 0
            """)
            count_with_jewels = cursor.fetchone()[0]
            print(f"✅ Số tài khoản có ngọc > 0: {count_with_jewels:,}")
            
            # Lấy mẫu 1 tài khoản
            cursor.execute("""
                SELECT TOP 1 account, Chaos, Bless, Soul 
                FROM JewelBank 
                WHERE (Chaos + Bless + Soul + Life + Creation + 
                       Guardian + Stone + Harmony + Lower + Higher) > 0
            """)
            sample = cursor.fetchone()
            if sample:
                print(f"\n📦 Mẫu dữ liệu:")
                print(f"   Tài khoản: {sample[0]}")
                print(f"   Chaos: {sample[1]:,}")
                print(f"   Bless: {sample[2]:,}")
                print(f"   Soul: {sample[3]:,}")
        else:
            print("❌ Bảng JewelBank không tồn tại!")
            print("   Hãy kiểm tra tên database và chạy lại script SQL")
        
        conn.close()
        print(f"\n✅ Kết nối thành công! Driver: {driver_used}")
        print("\n💡 Bạn có thể chạy: python jewel_scanner.py --help")
        return True
        
    except Exception as e:
        print(f"❌ Lỗi khi kiểm tra bảng: {e}")
        if conn:
            conn.close()
        return False

if __name__ == '__main__':
    print("="*60)
    print("  KIỂM TRA KẾT NỐI JEWEL SCANNER")
    print("="*60)
    print(f"\n📡 Server: {DB_CONFIG['server']}")
    print(f"💾 Database: {DB_CONFIG['database']}")
    print(f"👤 Username: {DB_CONFIG['username']}\n")
    
    test_connection()

