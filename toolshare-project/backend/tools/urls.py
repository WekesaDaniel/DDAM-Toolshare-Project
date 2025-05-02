from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'tools', ToolViewSet)
router.register(r'members', MemberViewSet)
router.register(r'shared-tools', BorrowedToolsViewSet)
router.register(r'maintenance', MaintenanceRecordViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]