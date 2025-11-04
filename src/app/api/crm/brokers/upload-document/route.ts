import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

// POST /api/crm/brokers/upload-document - Upload PDF/document for broker API
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const brokerId = formData.get('brokerId') as string;
    const documentType = formData.get('documentType') as string || 'api_documentation';

    if (!file || !brokerId) {
      return NextResponse.json(
        { error: 'File and broker ID are required' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/json', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PDF, JSON, TXT, DOC, DOCX' },
        { status: 400 }
      );
    }

    // Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size: 10MB' },
        { status: 400 }
      );
    }

    // Read file as base64 for storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');

    // Store document reference in database
    const { data: document, error } = await supabase
      .from('broker_api_configs')
      .insert({
        broker_id: brokerId,
        config_name: `${documentType}_${Date.now()}`,
        config_data: {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          uploadedAt: new Date().toISOString(),
          documentType: documentType,
          // Note: For production, upload to Supabase Storage instead
          fileData: base64.substring(0, 1000) + '...' // Store truncated for demo
        },
        file_name: file.name,
        file_size: file.size,
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    // For JSON files, try to parse and apply config
    if (file.type === 'application/json') {
      try {
        const fileContent = buffer.toString('utf-8');
        const apiConfig = JSON.parse(fileContent);

        // Update broker with API configuration if valid
        if (apiConfig.endpoint) {
          await supabase
            .from('brokers')
            .update({
              api_endpoint: apiConfig.endpoint,
              api_key: apiConfig.apiKey || apiConfig.api_key || null,
              api_method: apiConfig.method || 'POST',
              api_headers: apiConfig.headers || null,
              updated_at: new Date().toISOString()
            })
            .eq('id', brokerId);
        }
      } catch (e) {
        // If parsing fails, just store as document
        console.log('Could not parse JSON, storing as document');
      }
    }

    return NextResponse.json({
      success: true,
      message: `${file.type === 'application/pdf' ? 'PDF' : 'Document'} uploaded successfully`,
      document: {
        id: document.id,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      }
    });

  } catch (error: any) {
    console.error('Error uploading document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload document' },
      { status: 500 }
    );
  }
}

// GET /api/crm/brokers/upload-document?brokerId=xxx - Get documents for broker
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brokerId = searchParams.get('brokerId');

    if (!brokerId) {
      return NextResponse.json(
        { error: 'Broker ID is required' },
        { status: 400 }
      );
    }

    const { data: documents, error } = await supabase
      .from('broker_api_configs')
      .select('*')
      .eq('broker_id', brokerId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      documents: documents.map(doc => ({
        id: doc.id,
        fileName: doc.file_name,
        fileSize: doc.file_size,
        configName: doc.config_name,
        uploadedAt: doc.created_at,
        isActive: doc.is_active
      }))
    });

  } catch (error: any) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
