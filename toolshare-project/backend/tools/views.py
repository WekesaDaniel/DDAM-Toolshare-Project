from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response


# Create your views here.
from rest_framework import viewsets, status
from .models import *
from .serializers import *

class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class BorrowedToolsViewSet(viewsets.ModelViewSet):
    queryset = BorrowingTransaction.objects.filter(return_date__isnull=True)
    serializer_class = BorrowingTransactionSerializer

class MaintenanceRecordViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceRecord.objects.select_related('tool').all()
    serializer_class = MaintenanceRecordSerializer



class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all().order_by('-id')
    serializer_class = NotificationSerializer

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        Notification.objects.filter(read=False).update(read=True)
        return Response({'status': 'all notifications marked as read'}, status=status.HTTP_200_OK)
