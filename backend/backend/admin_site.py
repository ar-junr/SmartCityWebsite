"""
Custom Admin Site Configuration
Provides better UI and organization for the Django admin
"""
from django.contrib import admin
from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy as _


class SmartCityAdminSite(AdminSite):
    site_header = "Smart City Administration"
    site_title = "Smart City Admin Portal"
    index_title = "Welcome to Smart City Administration"
    site_url = "/"


# Create custom admin site instance
admin_site = SmartCityAdminSite(name='smartcity_admin')

