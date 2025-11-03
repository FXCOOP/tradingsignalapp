import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

// POST /api/crm/brokers/upload-api - Upload API configuration file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const brokerId = formData.get('brokerId') as string;

    if (!file || !brokerId) {
      return NextResponse.json(
        { error: 'File and broker ID are required' },
        { status: 400 }
      );
    }

    // Read file content
    const fileContent = await file.text();
    let apiConfig;

    try {
      // Try to parse as JSON
      apiConfig = JSON.parse(fileContent);
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON file format' },
        { status: 400 }
      );
    }

    // Validate required fields in API config
    if (!apiConfig.endpoint) {
      return NextResponse.json(
        { error: 'API config must contain "endpoint" field' },
        { status: 400 }
      );
    }

    // Update broker with API configuration
    const { data, error } = await supabase
      .from('brokers')
      .update({
        api_endpoint: apiConfig.endpoint,
        api_key: apiConfig.apiKey || apiConfig.api_key || null,
        api_method: apiConfig.method || 'POST',
        api_headers: apiConfig.headers || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', brokerId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'API configuration uploaded successfully',
      broker: data
    });

  } catch (error: any) {
    console.error('Error uploading API config:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload API configuration' },
      { status: 500 }
    );
  }
}
