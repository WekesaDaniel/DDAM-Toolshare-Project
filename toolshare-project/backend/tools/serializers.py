from rest_framework import serializers
from .models import Tool, Member, BorrowingTransaction, MaintenanceRecord

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class BorrowingTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowingTransaction
        fields = '__all__'

class MaintenanceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceRecord
        fields = '__all__'

