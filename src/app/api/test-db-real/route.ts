import { NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET() {
  try {
    const config = {
      server: process.env.DB_SERVER || 'localhost',
      database: process.env.DB_NAME || 'MuOnline',
      user: process.env.DB_USERNAME || 'sa',
      password: process.env.DB_PASSWORD || 'your_password',
      port: parseInt(process.env.DB_PORT || '1433'),
      options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        instanceName: process.env.DB_INSTANCE || '',
        connectionTimeout: 10000,
        requestTimeout: 10000
      }
    };

    console.log('Testing database connection with config:', {
      server: config.server,
      database: config.database,
      user: config.user,
      port: config.port,
      instanceName: config.options.instanceName
    });

    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT 1 as test');
    await pool.close();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!',
      data: result.recordset
    });
  } catch (error: unknown) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: (error as { code?: string })?.code || 'UNKNOWN_ERROR',
      details: {
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        port: process.env.DB_PORT,
        instanceName: process.env.DB_INSTANCE
      }
    }, { status: 500 });
  }
}
