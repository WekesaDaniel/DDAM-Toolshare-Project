from rest_framework import serializers
from .models import *

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ['id', 'name', 'brand', 'model', 'image']

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class BorrowingTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowingTransaction
        fields = '__all__'

class MaintenanceRecordSerializer(serializers.ModelSerializer):
    tool = ToolSerializer()

    class Meta:
        model = MaintenanceRecord
        fields = '__all__'



class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
