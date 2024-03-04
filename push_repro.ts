import { Expo, ExpoPushMessage } from 'expo-server-sdk'
export const expoServer = new Expo()

async function sendPush(number: number) {
  console.log('Sending', number, 'notifications.')

  const testNotification: ExpoPushMessage = {
    title: 'Test notification title',
    body: 'Test notification body',
    // PUT VALID EXPO PUSH TOKEN HERE
    to: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
  }

  const testNotifications: ExpoPushMessage[] = []

  for (let i = 0; i < number; i++) testNotifications.push(testNotification)

  const chunks = expoServer.chunkPushNotifications(testNotifications)

  const sendChunkFunctions = chunks.map((chunk) => async () => {
    /** Attempt to request a push chunk. */
    const ticketChunk = await expoServer
      .sendPushNotificationsAsync(chunk)
      .catch((e) => {
        console.log(
          'Failure sending',
          number,
          'notifications. Error:',
          // Invalid response body while trying to fetch https://exp.host/--/api/v2/push/send: read ECONNRESET
          e.message
        )
      })

    if (ticketChunk) console.log('Success sending', number, 'notifications.')
  })

  for (const sendChunkFunction of sendChunkFunctions) await sendChunkFunction()
}

// Succeeds and user receives 16 notifications. Receipts generated. Able to get receipts
sendPush(16)

// Fails but user still receives 17 notification. No tickets produced. No way to get receipts.
sendPush(17)