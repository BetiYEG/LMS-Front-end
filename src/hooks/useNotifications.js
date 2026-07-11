import { useDispatch, useSelector } from 'react-redux'
import {
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
  removeNotification,
} from '@/store/slices/uiSlice'
import { useGetMyNotificationsQuery } from '@/api/notificationsApi'
import { toast } from 'sonner'

export const useNotifications = () => {
  const dispatch = useDispatch()
  const { notifications } = useSelector((state) => state.ui)

  // RTK Query hook
  const { refetch: refetchNotifications } = useGetMyNotificationsQuery()

  const getNotifications = async () => {
    try {
      const result = await refetchNotifications()
      if (result.data) {
        result.data.forEach(notification => {
          dispatch(addNotification(notification))
        })
        return result.data
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      throw error
    }
  }

  const addNewNotification = (notification) => {
    dispatch(addNotification(notification))
    // Show toast for new notification
    if (notification.type !== 'silent') {
      toast.info(notification.title, {
        description: notification.message,
      })
    }
  }

  const markAsRead = (notificationId) => {
    dispatch(markNotificationRead(notificationId))
  }

  const markAllAsRead = () => {
    dispatch(markAllNotificationsRead())
    toast.success('All notifications marked as read')
  }

  const deleteNotification = (notificationId) => {
    dispatch(removeNotification(notificationId))
    toast.info('Notification deleted')
  }

  const clearAllNotifications = () => {
    dispatch(clearNotifications())
    toast.info('All notifications cleared')
  }

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length
  }

  const getNotificationsByType = (type) => {
    return notifications.filter(n => n.type === type)
  }

  return {
    notifications,
    getNotifications,
    addNewNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    getUnreadCount,
    getNotificationsByType,
    refetchNotifications,
  }
}

export default useNotifications