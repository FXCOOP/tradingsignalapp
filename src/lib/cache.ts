import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const CACHE_DIR = path.join(process.cwd(), '.cache')
const DAILY_CONTENT_FILE = path.join(CACHE_DIR, 'daily-content.json')

interface DailyContent {
  signals: any[]
  news: any[]
  analysis: any
  generatedAt: string
  expiresAt: string
}

/**
 * Save daily content to cache
 */
export async function saveDailyContent(content: Omit<DailyContent, 'expiresAt'>): Promise<void> {
  try {
    // Ensure cache directory exists
    if (!existsSync(CACHE_DIR)) {
      await mkdir(CACHE_DIR, { recursive: true })
    }

    // Set expiration to next day at 8AM Dubai time (GMT+4)
    const now = new Date()
    const expiresAt = new Date(now)
    expiresAt.setHours(8, 0, 0, 0) // Set to 8AM

    // If current time is after 8AM, set to next day
    if (now.getHours() >= 8) {
      expiresAt.setDate(expiresAt.getDate() + 1)
    }

    const dataToSave: DailyContent = {
      ...content,
      expiresAt: expiresAt.toISOString()
    }

    await writeFile(DAILY_CONTENT_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8')
    console.log('✅ Daily content cached successfully')
    console.log(`⏰ Cache expires at: ${expiresAt.toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}`)
  } catch (error) {
    console.error('❌ Failed to save cache:', error)
    throw error
  }
}

/**
 * Get daily content from cache
 * Returns null if cache is expired or doesn't exist
 */
export async function getDailyContent(): Promise<DailyContent | null> {
  try {
    if (!existsSync(DAILY_CONTENT_FILE)) {
      console.log('📭 No cached content found')
      return null
    }

    const fileContent = await readFile(DAILY_CONTENT_FILE, 'utf-8')
    const data: DailyContent = JSON.parse(fileContent)

    // Check if cache is expired
    const now = new Date()
    const expiresAt = new Date(data.expiresAt)

    if (now > expiresAt) {
      console.log('⏰ Cache expired')
      return null
    }

    const timeLeft = Math.floor((expiresAt.getTime() - now.getTime()) / 1000 / 60 / 60)
    console.log(`✅ Cache valid - ${timeLeft}h until expiry`)

    return data
  } catch (error) {
    console.error('❌ Failed to read cache:', error)
    return null
  }
}

/**
 * Check if cache is still valid
 */
export async function isCacheValid(): Promise<boolean> {
  const content = await getDailyContent()
  return content !== null
}

/**
 * Get time until next refresh (in milliseconds)
 */
export function getTimeUntilNextRefresh(): number {
  const now = new Date()
  const next8AM = new Date(now)
  next8AM.setHours(8, 0, 0, 0)

  // If past 8AM today, move to tomorrow
  if (now.getHours() >= 8) {
    next8AM.setDate(next8AM.getDate() + 1)
  }

  return next8AM.getTime() - now.getTime()
}
