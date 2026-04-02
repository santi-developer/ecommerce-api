from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile


# Inline para que Profile aparezca dentro de User
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False


# Admin personalizado del User
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    inlines = [ProfileInline]

    list_display = ('email', 'username', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {
            'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Extra', {'fields': ('role',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'is_staff', 'is_active'),
        }),
    )

    search_fields = ('email',)
    ordering = ('email',)


# 🔹 (Opcional) registrar Profile aparte
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'created_at')