import { urlBase64ToUint8Array } from "@utils/utils";
import { sendNotification } from "@actions/actions";

export class NotificationService {
	
  static async askNotificationPermission() {
    const result = await Notification.requestPermission();
    return result === "granted";
  }

  static async subscribeToPush(): Promise<PushSubscription> {
    const registration = await navigator.serviceWorker.ready;
    const subscription =  await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    return subscription;
  }

  static async getCurrentSubscription(): Promise<PushSubscription | null> {
    const registration = await navigator.serviceWorker.ready;
    return registration.pushManager.getSubscription();
  }

  static async unsubscribeFromPush(subscription: PushSubscription | null): Promise<void> {
    if (subscription) {
      await subscription.unsubscribe();
    }
  }
 
  static async sendTestNotification(subscription: PushSubscription, message: string) {
    if (subscription) {
      await sendNotification(message);
    }
  }
};