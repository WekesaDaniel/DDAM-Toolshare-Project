from django.db import models

# Create your models here.

from django.db import models

class Tool(models.Model):
    barcode = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=366)
    category_id = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    brand = models.CharField(max_length=26, blank=True, null=True)
    model = models.CharField(max_length=50, blank=True, null=True)
    serial_number = models.CharField(max_length=56, unique=True, blank=True, null=True)
    purchase_date = models.DateField(blank=True, null=True)
    purchase_cost = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    replacement_value = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    current_condition = models.CharField(max_length=29)
    status = models.CharField(max_length=29)


    image = models.ImageField(upload_to='tool_images/', blank=True, null=True)

    def __str__(self):
        return self.name


class Member(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    email = models.EmailField(max_length=106, unique=True)
    phone = models.CharField(max_length=20)
    registration_date = models.DateField()
    is_active = models.BooleanField(default=True)

class BorrowingTransaction(models.Model):
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    checkout_date = models.DateTimeField()
    due_date = models.DateTimeField()
    return_date = models.DateTimeField(blank=True, null=True)
    condition_before = models.CharField(max_length=26)
    condition_after = models.CharField(max_length=29, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

class MaintenanceRecord(models.Model):
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)
    schedule_id = models.IntegerField()
    maintenance_date = models.DateField()
    maintenance_type = models.CharField(max_length=26)
    description = models.TextField(blank=True, null=True)
    performed_by = models.CharField(max_length=366)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    parts_replaced = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=28)
