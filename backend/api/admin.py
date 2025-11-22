from django.contrib import admin
from django.utils.html import format_html
from django.utils.timezone import localtime
from .models import (
    Career, CareerResource, Tender, News, ContactMessage, ConclaveSpeaker, 
    ConclaveRecording, AnniversaryImage, InaugurationImage, 
    GovernmentOrder, Complaint,PollFeedback,MonthlyProgressReport,Internship,
    PhotoAlbum, Photo, Video, MediaItem, EventItem, ContactInfo, BoardMember, CEO, Staff, Document, Official,OngoingProject, ProjectCategory, ProjectImage, CompletedProject, CompletedProjectImage,NavigationItem, PageContent
)
from simple_history.admin import SimpleHistoryAdmin
# Photo Album and Photos - custom inline admin
class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 1  # show 1 extra empty photo field

@admin.register(PhotoAlbum)
class PhotoAlbumAdmin(admin.ModelAdmin):
    list_display = ('title',)
    inlines = [PhotoInline]

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

@admin.register(OngoingProject)
class OngoingProjectAdmin(admin.ModelAdmin):
    list_display = ('project_id', 'project_name', 'scm', 'target_completion')
    search_fields = ('project_id', 'project_name')
    inlines = [ProjectImageInline]

admin.site.register(ProjectCategory)
# Custom admin for Complaint model
@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'project', 'submitted_at')
    readonly_fields = ('submitted_at',)
    search_fields = ('name', 'email', 'project')
    list_filter = ('submitted_at',)
    fieldsets = (
        (None, {
            'fields': ('name', 'email', 'project', 'complaint', 'attachment', 'submitted_at')
        }),
    )
@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'youtube_url')

class CompletedProjectImageInline(admin.TabularInline):
    model = CompletedProjectImage
    extra = 1
    can_delete = True
class CompletedProjectAdmin(admin.ModelAdmin):
    list_display = ['project_name', 'amount']
    inlines = [CompletedProjectImageInline]

# Registering other models
admin.site.register(GovernmentOrder)
admin.site.register(News)
admin.site.register(ConclaveSpeaker)
admin.site.register(ConclaveRecording)
admin.site.register(AnniversaryImage)
admin.site.register(InaugurationImage)
admin.site.register(ContactMessage, SimpleHistoryAdmin)
admin.site.register(PollFeedback)
admin.site.register(MonthlyProgressReport)
admin.site.register(Internship)
admin.site.register(MediaItem)
admin.site.register(EventItem)
admin.site.register(ContactInfo)
admin.site.register(Document)
admin.site.register(Official)
admin.site.register(CompletedProject, CompletedProjectAdmin)
admin.site.register(NavigationItem)
admin.site.register(PageContent)

class CareerResourceInline(admin.TabularInline):
    model = CareerResource
    extra = 1
@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ['no', 'title', 'status', 'posted_on', 'last_date_to_apply']
    fields = ['no', 'title', 'status', 'pdf', 'link', 'posted_on', 'last_date_to_apply']
    inlines = [CareerResourceInline]
@admin.register(BoardMember)
class BoardMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'field']

@admin.register(CEO)
class CEOAdmin(admin.ModelAdmin):
    list_display = ('name', 'joining_date', 'relieving_date')

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'email', 'category', 'image_preview')
    list_filter = ('category',)
    search_fields = ('name', 'position', 'email')
    readonly_fields = ('image_preview',)

    fieldsets = (
        (None, {
            'fields': ('name', 'position', 'category', 'email', 'phone', 'image', 'image_preview', 'qualifications', 'experience')
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" style="object-fit: cover;" />', obj.image.url)
        return "No image"
    image_preview.short_description = "Preview"

@admin.register(Tender)
class TenderAdmin(admin.ModelAdmin):
    list_display = ('no', 'title', 'status', 'pdf', 'formatted_deadline')

    def formatted_deadline(self, obj):
        return localtime(obj.last_date_to_submit).strftime('%b %d, %Y %I:%M %p')

    formatted_deadline.short_description = 'Submission Deadline'