from django.contrib import admin
from safedelete.admin import SafeDeleteAdmin, highlight_deleted
from .models import *


class UserAdmin(SafeDeleteAdmin):
    list_display = (highlight_deleted, "first_name", "last_name",
                    "email") + SafeDeleteAdmin.list_display
    list_filter = SafeDeleteAdmin.list_filter


class AdminAdmin(SafeDeleteAdmin):
    list_display = (highlight_deleted, "user") + SafeDeleteAdmin.list_display
    list_filter = SafeDeleteAdmin.list_filter


class EmployeeAdmin(SafeDeleteAdmin):
    list_display = (highlight_deleted, "id", "first_name",
                    "last_name") + SafeDeleteAdmin.list_display
    list_filter = SafeDeleteAdmin.list_filter


class LogEventAdmin(SafeDeleteAdmin):
    list_display = (highlight_deleted, "id", "employee", "date") + SafeDeleteAdmin.list_display
    list_filter = SafeDeleteAdmin.list_filter


admin.site.register(User, UserAdmin)
admin.site.register(Admin, AdminAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(LogEvent, LogEventAdmin)
