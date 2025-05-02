from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'tools', ToolViewSet)
router.register(r'members', MemberViewSet)
router.register(r'borrowing', BorrowingTransactionViewSet)
router.register(r'maintenance', MaintenanceRecordViewSet)

urlpatterns = [
    path('', include(router.urls)),
]