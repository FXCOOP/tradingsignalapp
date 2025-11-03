/**
 * Client-side automatic signal generation
 * Generates signals once per day at 8:00 AM Dubai time (UTC+4)
 */

const LAST_GENERATED_DATE_KEY = 'gcc_last_signal_date';
const TARGET_HOUR_DUBAI = 8; // 8 AM Dubai time
const DUBAI_UTC_OFFSET = 4; // Dubai is UTC+4

/**
 * Get current time in Dubai timezone
 */
function getDubaiTime(): Date {
  const now = new Date();
  // Convert to Dubai time (UTC+4)
  const dubaiTime = new Date(now.getTime() + (DUBAI_UTC_OFFSET * 60 * 60 * 1000));
  return dubaiTime;
}

/**
 * Check if it's time to generate signals (after 8 AM Dubai time)
 */
function shouldGenerateToday(): boolean {
  const dubaiNow = getDubaiTime();
  const currentHour = dubaiNow.getUTCHours();

  // Only generate if it's 8 AM or later in Dubai
  return currentHour >= TARGET_HOUR_DUBAI;
}

/**
 * Get today's date in Dubai timezone (YYYY-MM-DD format)
 */
function getTodayDateDubai(): string {
  const dubaiNow = getDubaiTime();
  return dubaiNow.toISOString().split('T')[0];
}

export async function checkAndGenerateSignals(): Promise<void> {
  try {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    const todayDubai = getTodayDateDubai();
    const lastGeneratedDate = localStorage.getItem(LAST_GENERATED_DATE_KEY);

    // Check if signals were already generated today
    if (lastGeneratedDate === todayDubai) {
      console.log(`✅ Signals already generated today (${todayDubai}), skipping...`);
      return;
    }

    // Check if it's past 8 AM Dubai time
    if (!shouldGenerateToday()) {
      const dubaiNow = getDubaiTime();
      const currentHour = dubaiNow.getUTCHours();
      console.log(`⏰ Not yet 8 AM Dubai time (current: ${currentHour}:00), skipping...`);
      return;
    }

    console.log(`🔍 Generating signals for ${todayDubai} (8 AM Dubai time has passed)`);

    // Trigger generation
    const response = await fetch('/api/daily-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        console.log('✅ Signals generated successfully:', {
          date: todayDubai,
          signals: data.content?.signals?.count || 0,
          news: data.content?.news?.count || 0
        });

        // Mark today as generated
        localStorage.setItem(LAST_GENERATED_DATE_KEY, todayDubai);
      } else {
        console.warn('⚠️ Signal generation returned false success:', data);
      }
    } else {
      console.error('❌ Signal generation failed:', response.status);
    }

  } catch (error) {
    console.error('❌ Error in auto-generate:', error);
  }
}

/**
 * Force clear the generation lock (for testing or manual override)
 */
export function clearGenerationLock(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LAST_GENERATED_DATE_KEY);
    console.log('🔓 Generation lock cleared - signals will regenerate on next page load');
  }
}
