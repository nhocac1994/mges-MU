import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * API endpoint để đăng ký push subscription
 * POST /api/push/subscribe
 * Body: { subscription: PushSubscription }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subscription } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { success: false, error: 'Invalid subscription' },
        { status: 400 }
      );
    }

    // Gửi subscription đến server C# để lưu
    try {
      console.log('📤 Đang gửi subscription đến server C#:', API_URL);
      
      const response = await fetch(`${API_URL}/api/push/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.keys?.p256dh,
            auth: subscription.keys?.auth,
          },
        }),
        signal: AbortSignal.timeout(10000), // Timeout 10 giây
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Push subscription registered with backend C#:', result);
        
        return NextResponse.json({
          success: true,
          message: 'Push subscription registered successfully',
          subscriptionId: result.data?.subscriptionId || result.subscriptionId || subscription.endpoint,
        });
      } else {
        const errorText = await response.text();
        console.warn('⚠️ Backend C# returned error:', response.status, errorText);
        // Vẫn trả về success nếu backend lỗi (fallback)
      }
    } catch (error: any) {
      console.error('❌ Error sending subscription to backend C#:', error.message);
      console.log('ℹ️ Lưu subscription local (backend C# không khả dụng)');
      // Vẫn trả về success để frontend có thể lưu local
    }

    // Lưu subscription vào localStorage (fallback nếu backend không khả dụng)
    return NextResponse.json({
      success: true,
      message: 'Push subscription registered (local)',
      subscriptionId: subscription.endpoint,
    });
  } catch (error: any) {
    console.error('Error registering push subscription:', error);
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * API endpoint để hủy đăng ký push subscription
 * POST /api/push/unsubscribe
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { subscriptionId, endpoint } = body;

    const idToDelete = subscriptionId || endpoint;

    if (!idToDelete) {
      return NextResponse.json(
        { success: false, error: 'Subscription ID required' },
        { status: 400 }
      );
    }

    // Gửi request hủy đăng ký đến server C#
    try {
      const response = await fetch(`${API_URL}/api/push/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: idToDelete }),
      });

      if (response.ok) {
        console.log('✅ Push subscription unregistered from backend');
      }
    } catch (error) {
      console.error('Error unregistering from backend:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Push subscription unregistered',
    });
  } catch (error: any) {
    console.error('Error unregistering push subscription:', error);
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

